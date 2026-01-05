<script setup lang="ts">
import {reactive} from "vue";
import PackageAction from "./PackageAction.vue"
import {adbPlugin, zipPlugin} from "../../utils/plugin";

const state = reactive({
  showContent: false,//显示详情布局
  contentLoading: false,//详情加载状态
  apkActionSheet: {show: false, name: ''},
  apkActionList: [
    {name: '选择并安装apk到手机', fn: 'chooseAndInstallApk'},
    {name: '选择并卸载手机apk文件', fn: 'chooseAndUninstallApk'},
  ],
  apkActionResultList: [],
  showPackageActionDialog: false,
})

//选择操作命令后执行对应的方法
const onSelectApkAction = (item) => {
  state.apkActionSheet.name = item.name
  state.apkActionSheet.show = false
  if (item.fn) methodMap[item.fn]()
}

const showActionSheet = () => {
  state.showContent = !state.showContent
  if (!state.showContent) return
  state.apkActionSheet.show = true
  state.apkActionSheet.name = ''
  state.apkActionResultList.length = 0
}

const closeActionSheet = () => {
  if (!state.apkActionSheet.name) state.showContent = false
}

const methodMap = {
  async chooseAndInstallApk() {
    try {
      //一.选择apk文件
      let apkPath = await zipPlugin.selectFilePathRender('apk', '')
      if (!apkPath) {
        state.apkActionResultList.push("没有选择apk文件!")
        return
      }
      state.contentLoading = true
      //二.安装apk文件
      let installResult = await adbPlugin.installApkRender(apkPath)
      console.log("installResult=>", installResult)
      state.apkActionResultList = installResult.stdout.split("\n")
      state.contentLoading = false
    } catch (e) {
      state.apkActionResultList.push(e.message)
      state.contentLoading = false
    }
  },
  async chooseAndUninstallApk(packageName) {//这里选择package包名和package回调的方法是同一个
    console.log("chooseAndUninstallApk===", packageName)
    if (!packageName) {//如果没有包名packageName参数的话，就去选择包名
      state.showPackageActionDialog = true
    } else {//将回调的包名信息展示出来
      state.apkActionResultList.push(packageName)
      if (packageName !== 'cancel') {//如果选择了包名的话
        //卸载Apk操作
        packageName = packageName.replace(/(package:)/g, "")
        let uninstallResult = await adbPlugin.runAdbCommandRender(`uninstall ${packageName}`)
        console.log("uninstallResult", uninstallResult)
        state.apkActionResultList = state.apkActionResultList.concat(uninstallResult.stdout.split("\n"))
      }
    }
  }
}

</script>
<template>
  <div class="ver-layout">
    <van-button class="fit-content top-10" type="warning" size="small" @click="showActionSheet">选择apk操作命令
    </van-button>
    <van-action-sheet
      title="选择apk操作命令" cancel-text="取消"
      v-model:show="state.apkActionSheet.show"
      :actions="state.apkActionList"
      @select="onSelectApkAction"
      @close="closeActionSheet"/>
    <van-list v-show="state.showContent" class="top-10">
      <div class="content-title hor-layout-center">
        <van-loading v-if="state.contentLoading" type="spinner" size="24px" color="lightseagreen"/>
        <span class="left-10">{{ state.apkActionSheet.name }}：</span>
      </div>
      <van-cell v-for="(item,index) in state.apkActionResultList" :key="index" :title="item"></van-cell>
    </van-list>
    <package-action mode-type="dialog" v-model="state.showPackageActionDialog"
                    @onPackageSelectBack="methodMap.chooseAndUninstallApk"></package-action>
  </div>
</template>
