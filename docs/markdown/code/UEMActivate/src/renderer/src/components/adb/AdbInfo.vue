<script setup lang="ts">
import {computed, reactive, onMounted} from "vue";
import {adbPlugin} from "../../utils/plugin";

const state = reactive({
  adbInfo: {
    show: false, platform: '', adbValid: false, adb_path: '', adb_version: ''
  },
})

const adbEnvInfo = computed(() => {
  return state.adbInfo.adbValid ? "项目adb环境正常！" : "项目adb环境错误！"
})

onMounted(async () => {
  // @ts-ignore (define in dts)
  let adbInfo = await adbPlugin.checkAdbValidRender()
  state.adbInfo = {...state.adbInfo, ...adbInfo}
})
</script>

<template>
  <van-tag class="margin-auto" size="large" :type="state.adbInfo.adbValid ? 'success' : 'danger'"
           @click="state.adbInfo.show=!state.adbInfo.show">
    {{ adbEnvInfo }}
  </van-tag>
  <van-cell-group v-if="state.adbInfo.show" class="top-10">
    <my-vant-cell title="当前系统" :value="state.adbInfo.platform"></my-vant-cell>
    <my-vant-cell title="adb路径" :value="state.adbInfo.adb_path"></my-vant-cell>
    <my-vant-cell title="adb版本" :value="state.adbInfo.adb_version"></my-vant-cell>
  </van-cell-group>
</template>
