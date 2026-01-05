<script setup lang="ts">
import {computed, reactive} from 'vue'

const simpleBtnStyle = computed(() => {
  let sizeMap = {'normal': '174px', 'small': '144px'}
  let sizeWidth = sizeMap[props.size]
  let width = props.width || sizeWidth
  let height = props.height
  return {width: width, height: height, lineHeight: height}
})

const props = defineProps({
  width: {
    type: String
  },
  height: {
    type: String
  },
  size: {
    type: String,
    default: "normal" || "small"
  }
})
</script>

<template>
  <div class="simple-btn" :style="simpleBtnStyle">
    <slot></slot>
  </div>
</template>

<style lang="less">
.simple-btn {
  width: 174px;
  height: 48px;
  line-height: 48px;
  text-align: center;
  border-radius: 11px;
  border: 1px solid #294DC9;
  background: white;
  //  字体
  font-size: 17px;
  font-family: PuHuiTi;
  font-weight: normal;
  color: #294DC9;
}

.simple-btn:hover {
  color: white;
  background: #294DC9;
}

.simple-btn:active {
  color: white;
  background: #1d368c;
}
</style>
