<script setup lang="ts">
import {computed, reactive, onMounted} from "vue";
import {adbPlugin} from "../../utils/plugin";

const state = reactive({
  showContent: false,
  deviceList: [],
})

const listDevices = async () => {
  state.showContent = !state.showContent
  if (!state.showContent) return
  // @ts-ignore (define in dts)
  let deviceList = await adbPlugin.listDevicesRender()
  console.log("listDevices=>", deviceList)
  state.deviceList = deviceList
}

onMounted(() => {
  listDevices()
})
</script>
<template>
  <div class="ver-layout">
    <van-button class="fit-content" type="primary" size="small" @click="listDevices">获取设备列表</van-button>
    <!--  一、连接的设备    -->
    <van-list v-if="state.showContent" class="top-10">
      <van-cell v-if="state.deviceList.length" title="连接的Android设备列表：">
        <template #title>
          <van-tag plain type="success" size="large">连接的Android设备列表：</van-tag>
        </template>
      </van-cell>
      <van-cell v-for="item in state.deviceList" :key="item" :title="item"/>
    </van-list>
  </div>
</template>
