<script setup lang="ts">
import {reactive, computed, onMounted, defineEmits, watch} from "vue";
import {adbPlugin} from "../../utils/plugin";

const state = reactive({
  showContent: false,//显示详情内容
  packageActionSheet: {show: false, name: ''},//显示选择包名相关操作的弹窗
  packageActionList: [//操作按钮数组
    {name: '获取所有的包名', command: 'shell pm list packages'},
    {name: '显示包和包相关联的文件(安装路径)', command: 'shell pm list packages -f'},
    {name: '显示禁用的包名', command: 'shell pm list packages -d'},
    {name: '显示当前启用的包名', command: 'shell pm list packages -e'},
    {name: '显示系统应用包名', command: 'shell pm list packages -s'},
    {name: '显示已安装第三方的包名', command: 'shell pm list packages -3'},
    {name: '加需要过滤的包名(taobao)', command: 'shell pm list packages taobao'},
  ],
  packageActionResultList: [],
  searchValue: '',
  showDialog: false,//显示弹窗
  selectPackageName: '',//选择的包名
})

const filterPackageResultList = computed(() => {
  return state.packageActionResultList.filter(item => item.indexOf(state.searchValue) != -1)
})

const onSelectPackageAction = async (item) => {
  state.packageActionSheet.name = item.name
  state.packageActionSheet.show = false
  let result = await adbPlugin.runAdbCommandRender(item.command)
  console.log("result", result)
  // console.log("result===", result.stdout.split("\n"))
  state.packageActionResultList = result.stdout.split("\n")
}

const showActionSheet = () => {//显示ActionSheet的操作面板
  state.showContent = !state.showContent
  if (!state.showContent) return
  state.packageActionSheet.show = true
  state.packageActionSheet.name = ''
}

const closeActionSheet = () => {//关闭ActionSheet的时候，如果没有选择操作则隐藏详情布局
  if (!state.packageActionSheet.name) state.showContent = false
}

const clearInputValue = () => {
  state.searchValue = ''
}

const selectBackAndCloseDialog = (item) => {//选择包名的事件，以及关闭弹窗的事件
  emit('update:modelValue', false)  //关闭弹窗的时候，修改父组件的属性值
  if (!state.selectPackageName) {//因为选择包名后还会触发关闭事件，所以这里会返回两次。这个操作就是防止返回两次的问题。
    state.selectPackageName = item
    emit("onPackageSelectBack", state.selectPackageName)
  }
}

watch(
  () => props.modelValue,
  async (newVal, oldVal) => {
    console.log("watch=====>", newVal)
    if (newVal) {
      state.selectPackageName = ''//显示弹窗的时候就重置selectPackageName这个字段
      await onSelectPackageAction(state.packageActionList.find(item => item.name == '显示已安装第三方的包名'))
    }
  }
)

//定义向父组件回传的方法
let emit = defineEmits(['update:modelValue', 'onPackageSelectBack'])
//定义对外的属性名称
const props = defineProps({
  modeType: { //组件模式
    type: String,
    default: ''
  },
  modelValue: {
    type: Boolean,
    default: false,
  }
})
</script>

<template>
  <div class="ver-layout" v-if="props.modeType!=='dialog'">
    <van-button class="fit-content top-10" type="warning" size="small" @click="showActionSheet">
      选择对package包操作命令
    </van-button>
    <van-action-sheet
      v-model:show="state.packageActionSheet.show"
      title="选择包操作命令" cancel-text="取消"
      :actions="state.packageActionList"
      @select="onSelectPackageAction"
      @closed="closeActionSheet"/>
    <van-list v-show="state.showContent" class="top-10">
      <div class="content-title">{{ state.packageActionSheet.name }}：</div>
      <van-field v-model="state.searchValue" class="input-view"
                 @click-right-icon="clearInputValue"></van-field>
      <div class="content-list">
        <van-cell v-for="(item,index) in filterPackageResultList" :key="index"
                  :title="item"></van-cell>
      </div>
    </van-list>
  </div>
  <!-- 选择弹窗 -->
  <van-popup v-model:show="props.modelValue" @close="selectBackAndCloseDialog('cancel')"
             closeable round :style="{ padding:'20px' }">
    <van-list class="top-10">
      <div class="content-title">选择包名</div>
      <van-field v-model="state.searchValue" class="input-view"
                 @click-right-icon="clearInputValue"></van-field>
      <div class="content-list">
        <van-cell v-for="(item,index) in filterPackageResultList" :key="index"
                  :title="item" @click="selectBackAndCloseDialog(item)"></van-cell>
      </div>
    </van-list>
  </van-popup>
</template>

<style lang="less">
.input-view {
  border: 1px solid #4aa3ff;
}
</style>
