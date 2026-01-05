<script setup lang="ts">
import {reactive} from "vue";
import DeviceStorage from "./DeviceStorage.vue"
import {adbPlugin, zipPlugin} from "../../utils/plugin";
import {charToUnicode} from "../../utils/utils";

const state = reactive({
  showContent: false,//显示详情布局
  fileActionSheet: {show: false, name: ''},//显示文件相关操作的弹窗
  fileActionList: [
    {name: '把本地(pc机)的文件或文件夹复制到设备(手机)', fn: "pushLocaLFileToPhone"},
    // {name: '把设备(手机)的文件或文件夹复制到本地', command: 'pull  '},
  ],
  fileActionResultList: [],
  showDeviceStorageDialog: false,//显示设备目录弹窗
  pushFileToPhoneInfo: {
    localFilePath: '',
    phoneDirPath: ''
  }
})


const showActionSheet = () => {
  state.showContent = !state.showContent
  if (!state.showContent) return
  state.fileActionSheet.show = true
  state.fileActionSheet.name = ''
  state.fileActionResultList.length = 0
}

const closeActionSheet = () => {
  if (!state.fileActionSheet.name) state.showContent = false
}

//选择操作命令后执行对应的方法
const onSelectFileAction = async (item) => {
  state.fileActionSheet.name = item.name
  state.fileActionSheet.show = false
  if (item.fn) methodMap[item.fn]()
}

const methodMap = {
  async pushLocaLFileToPhone(phoneDirPath) {// 将本地文件复制到手机上
    if (!phoneDirPath) {
      //一、选择本地文件
      state.pushFileToPhoneInfo.localFilePath = await zipPlugin.selectFilePathRender('', "一、选择要复制的本地文件")
      console.log("pushLocaLFileToPhone==>", state.pushFileToPhoneInfo.localFilePath)
      state.fileActionResultList.push("本地文件路径：" + state.pushFileToPhoneInfo.localFilePath)
      //二、选择手机路径
      if (state.pushFileToPhoneInfo.localFilePath) state.showDeviceStorageDialog = true
    } else {
      state.pushFileToPhoneInfo.phoneDirPath = phoneDirPath
      console.log("pushLocaLFileToPhone==>", phoneDirPath)
      state.fileActionResultList.push("保存到手机的路径：" + phoneDirPath)
      if (phoneDirPath != 'cancel') {
        //三、保存本地文件到手机目录下
        // let localFilePath=charToUnicode(state.pushFileToPhoneInfo.localFilePath)
        // let localFilePath=state.pushFileToPhoneInfo.localFilePath
        let localFilePath="d:\\users\\16504\\downloads\\\u73ed\u7ea7\u5b66\u751f.xls"
        let command = `push ${localFilePath} ${phoneDirPath}`
        let pushResult = await adbPlugin.runAdbCommandRender(command)
        console.log("pushLocaLFileToPhone==>", pushResult)
        state.fileActionResultList = state.fileActionResultList.concat(pushResult.stdout.split("\n"))
      }
    }
  }
}
</script>
<template>
  <div class="ver-layout">
    <van-button class="fit-content top-10" type="warning" size="small" @click="showActionSheet">
      选择文件操作命令
    </van-button>
    <van-action-sheet
      title="选择文件操作命令" cancel-text="取消"
      v-model:show="state.fileActionSheet.show"
      :actions="state.fileActionList"
      @select="onSelectFileAction"
      @closed="closeActionSheet"/>
    <van-list v-show="state.showContent" class="top-10">
      <div class="content-title">{{ state.fileActionSheet.name }}：</div>
      <van-cell v-for="(item,index) in state.fileActionResultList" :key="index" :title="item"></van-cell>
    </van-list>
  </div>
  <device-storage mode-type="dialog" v-model="state.showDeviceStorageDialog"
                  @onDirSelectBack="methodMap.pushLocaLFileToPhone"></device-storage>
</template>
