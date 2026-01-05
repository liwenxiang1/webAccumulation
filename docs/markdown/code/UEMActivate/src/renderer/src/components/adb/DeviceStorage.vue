<script setup lang="ts">
import {computed, ComputedRef, onMounted, reactive, watch} from "vue";
import {showConfirmDialog, showNotify} from "vant";
import {isImageFile} from "../../utils/utils.js"
import {defineEmits} from "vue/dist/vue";
import {adbPlugin, zipPlugin} from "../../utils/plugin";

const state = reactive({
  showContent: false,
  pathCacheList: ['sdcard/'],//缓存的目录
  storageDirs: [],//设备存储目录
  localSavePath: '',//本地保存目录
  searchValue: "",//搜索内容
  previewInfo: {
    showDialog: false,//显示预览弹窗
    localFilePath: '',//本地文件路径
    localFileBase64: '',
  },
  newDirInfo: {
    showDialog: false,
    showLoading: false,
    dirName: '',
  },
  deleteDirInfo: {
    showLoading: false,
  },
  selectMode: {
    showDialog: false,
    selectDir: '',
  }
})
//过滤设备存储目录
const filterStorageDirs: ComputedRef<Array<any>> = computed(() => {
  return state.storageDirs.filter(item => item.name.toLowerCase().indexOf(state.searchValue) != -1)
})

//获取上级目录
const getDevicePreDirInfo = async (index) => {
  state.pathCacheList = state.pathCacheList.slice(0, index + 1)
  // console.log("getDevicePreDirInfo", state.pathCacheList)
  let storageDirs = await adbPlugin.getDeviceStorageInfoRender(state.pathCacheList.join(""))
  state.storageDirs = storageDirs.map(item => {
    return {name: item, checked: false}
  })
}

//添加文件夹
const addStorageDir = async (confirm = false) => {
  if (!confirm) state.newDirInfo.showDialog = true
  else {
    if (!state.newDirInfo.dirName) return false
    state.newDirInfo.showLoading = true
    let dirPath = state.pathCacheList.join("") + state.newDirInfo.dirName
    let newDirResult = await adbPlugin.runAdbCommandRender(`shell mkdir /mnt/${dirPath}`)
    console.log("newDirResult", newDirResult)
    await getDevicePreDirInfo(state.pathCacheList.length - 1)
    state.newDirInfo.dirName = ''
    state.newDirInfo.showLoading = false
  }
}

//选择item事件
//删除文件夹
const selectItemClick = (item) => {
  console.log("selectItemClick", item)
  state.storageDirs = state.storageDirs.map(dir => {
    dir.checked = dir.name == item.name
    return dir
  })
  // console.log("selectItemClick==>", JSON.parse(JSON.stringify(state.storageDirs)))
}
const deleteStorageFile = async (item) => {
  try {
    state.deleteDirInfo.showLoading = true
    //rm -r xxx //删除名字为xxx的文件夹及其里面的所有文件
    let adbShell, filePath = state.pathCacheList.join("") + item.name
    if (item.name.endsWith('/')) adbShell = `shell rmdir '/mnt/${filePath}'`
    else adbShell = `shell rm '/mnt/${filePath}'`
    console.log("deleteStorageFile=>", adbShell)
    let deleteResult = await adbPlugin.runAdbCommandRender(adbShell)
    await getDevicePreDirInfo(state.pathCacheList.length - 1)
    console.log("deleteResult==>", deleteResult)
    state.deleteDirInfo.showLoading = false
  } catch (e) {
    state.deleteDirInfo.showLoading = false
    console.error("deleteStorageFile", e)
    if (e.message.indexOf("rectory not empty") == -1) showNotify({message: e.message})
    else showConfirmDialog({title: '错误提示', message: "文件夹不为空，确认全部删除吗？"}).then(async function () {
      let filePath = state.pathCacheList.join("") + item.name
      let adbShell = `shell rm -r '/mnt/${filePath}'`
      let deleteResult = await adbPlugin.runAdbCommandRender(adbShell)
      await getDevicePreDirInfo(state.pathCacheList.length - 1)
    })
  }
}

//获取设备目录列表
const getDeviceStorageInfo = async (item) => {
  state.searchValue = ''
  if (item) state.pathCacheList.push(item)
  else state.pathCacheList.length = 1
  let storageDirs = await adbPlugin.getDeviceStorageInfoRender(state.pathCacheList.join(""))
  state.storageDirs = storageDirs.map(item => {
    return {name: item, checked: false}
  })
}

//重置查询
const resetQuery = () => {
  state.showContent = !state.showContent
  if (!state.showContent) return
  getDeviceStorageInfo(null)
}

//预览文件
const previewFile = async (item) => {
  let phoneFilePath = `/mnt/${state.pathCacheList.join("")}${item}`
  state.previewInfo.localFilePath = `${state.localSavePath}\\${item}`
  console.log("previewFile==>", phoneFilePath, state.localSavePath)
  if (isImageFile(item)) {
    let pullResult = await adbPlugin.runAdbCommandRender(`pull ${phoneFilePath} ${state.localSavePath}`)
    console.log("pullResult=>", pullResult)
    let result = await zipPlugin.readFileBase64Render(state.previewInfo.localFilePath)
    state.previewInfo.localFileBase64 = "data:image/jpg;base64," + result
    // console.log("previewFile==>result", result)
    state.previewInfo.showDialog = true
  }
}

//关闭预览
const closePreviewDialog = () => {
  let result = zipPlugin.removeFileRender(state.previewInfo.localFilePath)
  console.log("closePreviewDialog==>", result)
}

//初始化本地保存目录环境
const initLocalSaveDirEnv = async () => {
  //设置本地保存目录
  let basePath = await zipPlugin.getDefaultPathRender()
  state.localSavePath = `${basePath}\\doc`
  //创建本地保存目录
  await zipPlugin.createDirRender(state.localSavePath)
}

//文件夹选择事件
const dirCheckChange = (dirItem) => {
  if (!dirItem.checked) return
  state.storageDirs = state.storageDirs.map(item => {
    if (item.name != dirItem.name) item.checked = false
    return item
  })
}

//选择路径的事件，以及关闭弹窗的事件
const selectDirBackAndCloseDialog = (name) => {
  emit('update:modelValue', false)  //关闭弹窗的时候，修改父组件的属性值
  if (!state.selectMode.selectDir) {//因为选择包名后还会触发关闭事件，所以这里会返回两次。这个操作就是防止返回两次的问题。
    let selectDir = state.storageDirs.find(item => item.checked)?.name
    selectDir = selectDir ? selectDir : ''
    let selectDirPath = "/mnt/" + state.pathCacheList.join("") + selectDir
    state.selectMode.selectDir = name == 'cancel' ? name : selectDirPath
    emit("onDirSelectBack", state.selectMode.selectDir)
  }
}

watch(
  () => props.modelValue,
  async (newVal, oldVal) => {
    console.log("watch=====>", newVal)
    if (newVal) {
      state.selectMode.selectDir = ''//显示弹窗的时候就重置selectPackageName这个字段
      await getDeviceStorageInfo(null)
    }
  }
)

//定义向父组件回传的方法
let emit = defineEmits(['update:modelValue', 'onDirSelectBack'])
//定义对外的属性名
const props = defineProps({
  modeType: { //组件模式
    type: String,
    default: ''
  },
  modelValue: {//显示，隐藏弹窗
    type: Boolean,
    default: false,
  }
})

onMounted(async () => {
  await initLocalSaveDirEnv()
})
</script>

<template>
  <div v-if="props.modeType!=='dialog'" class="ver-layout">
    <van-button class="fit-content top-10" type="primary" size="small" @click="resetQuery">
      获取设备的存储目录
    </van-button>
    <van-list v-if="state.showContent" class="top-10">
      <div class="content-title">手机的存储目录列表：</div>
      <div class="path-tag-layout hor-layout-center">
        <div v-for="(item,index) in state.pathCacheList" :key="index" class="path-tag-item hor-layout-center">
          <div class="path-tag-view" :class="{'disabled':index==state.pathCacheList.length-1}"
               @click="getDevicePreDirInfo(index)">{{ item }}
          </div>
          <div class="path-tag-span">></div>
        </div>
      </div>
      <div class="content-action hor-layout-center">
        <van-button type="primary" size="mini" class="add-btn" loading-text="新增文件夹"
                    :loading="state.newDirInfo.showLoading"
                    @click="addStorageDir(false)">新增文件夹
        </van-button>
        <van-field v-model="state.searchValue" class="input-view" label="搜索文件" size="small"
                   clearable placeholder="请输入搜索内容"></van-field>
      </div>
      <div class="content-list">
        <van-empty v-if="!filterStorageDirs.length" image-size="100" description="文件夹为空"/>
        <van-cell v-for="item in filterStorageDirs" :key="item" :title="item.name"
                  :class="{'content-item-selected':item.checked}" v-reclick
                  @click.stop="selectItemClick(item)">
          <template #title>
            <div v-if="item.name.endsWith('/')" class="hor-layout-side-center">
              <van-tag plain size="medium" type="primary" v-reclick @click="getDeviceStorageInfo(item.name)">
                {{ item.name }}
              </van-tag>
              <van-button v-reclick type="danger" size="mini" loading-text="删除"
                          :loading="item.checked&&state.deleteDirInfo.showLoading"
                          @click="deleteStorageFile(item)">删除
              </van-button>
            </div>
            <div v-else class="hor-layout-side-center">
              <div v-reclick @click="previewFile(item.name)">{{ item.name }}</div>
              <van-button v-reclick type="danger" size="mini" loading-text="删除"
                          @click="deleteStorageFile(item)"
                          :loading="item.checked&&state.deleteDirInfo.showLoading">
                删除
              </van-button>
            </div>
          </template>
        </van-cell>
      </div>
    </van-list>
  </div>

  <!-- 文件预览弹窗 -->
  <van-popup v-model:show="state.previewInfo.showDialog" @close="closePreviewDialog"
             closeable round :style="{ padding:'20px' }">
    <img referrerpolicy="no-referrer" :src="state.previewInfo.localFileBase64" class="preview-img">
  </van-popup>

  <!-- 文件夹名称输入弹窗 -->
  <van-dialog v-model:show="state.newDirInfo.showDialog" title="请输入文件夹名称" show-cancel-button
              @confirm="addStorageDir(true)">
    <van-field v-model="state.newDirInfo.dirName" clearable class="input-view top-20"></van-field>
  </van-dialog>

  <!-- 选择文件目录弹窗 -->
  <van-popup v-model:show="props.modelValue" @close="selectDirBackAndCloseDialog('cancel')"
             closeable round :style="{ padding:'20px',width:'40%' }">
    <van-list class="top-10">
      <div class="content-title">二、选择手机的存储目录：</div>
      <div class="path-tag-layout hor-layout-center">
        <div v-for="(item,index) in state.pathCacheList" :key="index" class="path-tag-item hor-layout-center">
          <div class="path-tag-view" :class="{'disabled':index==state.pathCacheList.length-1}"
               @click="getDevicePreDirInfo(index)">{{ item }}
          </div>
          <div class="path-tag-span">></div>
        </div>
      </div>
      <van-field v-model="state.searchValue" class="input-view" label="搜索文件" size="small"
                 clearable placeholder="请输入搜索内容"></van-field>
      <div class="content-list">
        <van-empty v-if="!filterStorageDirs.length" image-size="100" description="文件夹为空"/>
        <van-cell v-for="item in filterStorageDirs" :key="item" :title="item.name" v-reclick
                  :class="{'content-item-selected':item.checked}" @click.stop="selectItemClick(item)">
          <template #title>
            <div v-if="item.name.endsWith('/')" class="hor-layout-side-center">
              <van-tag v-reclick plain size="medium" type="primary" @click="getDeviceStorageInfo(item.name)">
                {{ item.name }}
              </van-tag>
              <van-checkbox v-model="item.checked" @click="dirCheckChange(item)"></van-checkbox>
            </div>
            <div v-else>{{ item.name }}</div>
          </template>
        </van-cell>
      </div>
    </van-list>
    <div class="dialog-bottom-layout hor-layout-around">
      <van-button
        block size="small" type="primary" v-reclick style="width: 30%"
        @click="selectDirBackAndCloseDialog('confirm')">
        确定
      </van-button>
      <van-button
        block size="small" type="info" v-reclick style="width: 30%"
        @click="selectDirBackAndCloseDialog('cancel')">
        取消
      </van-button>
    </div>
  </van-popup>
</template>

<style lang="less">
.content-title {
  color: lightseagreen;
  font-weight: bold;
  margin: 10px 0px;
}

.content-action {
  background: white;
  border-bottom: 1px solid #999999;

  .add-btn {
    margin: 0px 10px;
    flex-shrink: 0;
  }
}

.content-item-selected {
  background: #ddecfc;
}

.input-view {
  height: 35px;
  line-height: 35px;
  padding: 0px 10px;
  margin: 5px 10px;
  border-radius: 5px;
  border: 1px solid #4aa3ff;
  width: calc(100% - 20px);
}

.path-tag-layout {
  background: white;
  overflow-x: scroll;
  padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding);
  border-bottom: 1px solid #999999;

  .path-tag-item {
    .path-tag-view {
      color: #12abde;
      text-decoration: underline;
    }

    .path-tag-view.disabled {
      color: #888888;
    }

    .path-tag-span {
      color: #41505b;
      margin-left: 2px;
      margin-right: 12px;
    }
  }
}

/* 水平滚动条样式 */
/* 高度 */
.path-tag-layout::-webkit-scrollbar {
  height: 7px;
}

/* 背景 */
.path-tag-layout::-webkit-scrollbar-track {
  border-radius: 7px;
  background-color: #e7e7e7;
  border: 1px solid #cacaca;
}

/* 滑块 */
.path-tag-layout::-webkit-scrollbar-thumb {
  border-radius: 7px;
  background-color: #467c6e;
}

.preview-img {
  width: 300px;
  height: 300px;
}

.dialog-bottom-layout {
  padding-top: 10px;
  border-top: 1px solid #999999;
}
</style>
