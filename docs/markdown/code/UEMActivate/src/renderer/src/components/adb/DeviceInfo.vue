<script setup lang="ts">
import {reactive} from "vue";
import MyVantCell from "../MyVantCell.vue"
import {adbPlugin} from "../../utils/plugin";

const state = reactive({
  showContent: false,//显示设备信息布局
  actionLoading: false,
  deviceInfoShellMap: {
    "设备型号": "shell getprop ro.product.model",
    "Android系统版本": "shell getprop ro.build.version.release",
    "设备的序列号": "get-serialno",
    "设备屏幕分辨率": "shell wm size",
    "手机内存信息": "shell cat /proc/meminfo",
    "手机存储信息": "shell df",
    "手机网络信息": "shell ifconfig",
  },
  deviceInfoList: [],
})

const getDeviceInfo = async () => {
  state.showContent = !state.showContent
  if (!state.showContent) return
  state.actionLoading = true
  let shellList = Object.keys(state.deviceInfoShellMap).map(key => state.deviceInfoShellMap[key])
  let deviceInfoList = await adbPlugin.runAdbCommandListRender(shellList)
  // console.log("deviceInfo", deviceInfoList)
  state.deviceInfoList = Object.keys(state.deviceInfoShellMap).map((key, index) => {
    return {title: key, value: deviceInfoList[index]}
  })
  state.actionLoading = false
}
</script>

<template>
  <div class="ver-layout">
    <van-button class="fit-content top-10" type="primary" size="small"
                :loading="state.actionLoading" loading-text="获取设备信息" @click="getDeviceInfo">
      获取设备信息
    </van-button>
    <van-list v-if="state.showContent" class="top-10">
      <div class="content-title">设备信息：</div>
      <my-vant-cell v-for="(item,index) in state.deviceInfoList" :key="index" :title="item.title"
                    :value="item.value.stdout"></my-vant-cell>
    </van-list>
  </div>
</template>

<style lang="less">
.content-title {
  color: lightseagreen;
  font-weight: bold;
  margin: 10px 0px;
}
</style>
