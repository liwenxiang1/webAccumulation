<script setup lang="ts">

//退出事件
import {showConfirmDialog} from "vant";

const exitClick = () => {
  showConfirmDialog({title: '提示', message: '确认退出应用吗？',}).then(() => {
    window.zipApi.exitAppPreload()
  })
}
</script>

<template>
  <div class="exit-btn" @click="exitClick">退出</div>
</template>

<style lang="less">
.exit-btn {
  position: absolute;
  right: 75px;
  top: 25px;
  text-decoration: underline;
  // 字体样式 font-size: 17 px;
  font-family: PuHuiTi;
  font-weight: normal;
  color: #294DC9;
}

.exit-btn:hover {
  opacity: 0.7;
}

.exit-btn:active {
  opacity: 0.5;
}
</style>
