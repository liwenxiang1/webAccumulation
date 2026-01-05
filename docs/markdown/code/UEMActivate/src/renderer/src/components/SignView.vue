<script setup lang="ts">
import {onMounted, reactive} from 'vue'

const data = reactive({
  canvasWidth: 0,
  canvasHeight: 0
})

let mCanvas, canvasContext = null

const initCanvas = () => {
  // 线条宽度
  let strokeWidth = 2;
  // 线条颜色
  let strokeColor = 'red';

  mCanvas = document.getElementById('_canvas');
  // console.log("canvas", canvas)
  // console.log("canvas.clientWidth", canvas.clientWidth)
  //
  data.canvasHeight = mCanvas.clientHeight
  data.canvasWidth = mCanvas.clientWidth

  mCanvas.setAttribute("height", String(mCanvas.clientHeight));
  mCanvas.setAttribute("width", String(mCanvas.clientWidth));

  canvasContext = mCanvas.getContext('2d');
  // console.log("ctx====", canvasContext)
  // 线条末端添加圆形线帽，减少线条的生硬感
  canvasContext.lineCap = 'round';
  // 当两条线条交汇时，创建圆形边角
  canvasContext.lineJoin = 'round';
  canvasContext.lineWidth = strokeWidth;
  canvasContext.strokeStyle = strokeColor;
  // 利用阴影,消除锯齿
  canvasContext.shadowBlur = 1;
  canvasContext.shadowColor = strokeColor;
  canvasContext.fillText("123123", 10, 10)
}

const initCanvasListener = () => {
  let drawStatus = false;

  mCanvas.addEventListener('mousedown', function (e) {
    // console.log("mousedown", e)
    drawStatus = true;
    canvasContext.moveTo(e.offsetX, e.offsetY);
    // startX = e.offsetX;
    // startY = e.offsetY;
  });

  mCanvas.addEventListener('mousemove', function (e) {
    // console.log("mousemove==drawStatus", drawStatus)
    if (!drawStatus) {
      return;
    }
    canvasContext.lineTo(e.offsetX, e.offsetY);
    canvasContext.stroke();
  })

  mCanvas.addEventListener('mouseup', function (e) {
    drawStatus = false;
    console.log('out');
  })
}

const clearContent = () => {
  canvasContext.clearRect(0, 0, data.canvasWidth, data.canvasHeight);
  let w = mCanvas.width;
  mCanvas.width = 1;
  mCanvas.width = w;
  initCanvas()
}

onMounted(() => {
  initCanvas()
  initCanvasListener()
})

const props = defineProps({
  signing: {//正在签署中
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <van-button v-if="!props.signing" type="primary" size="small" class="clear-btn" @click="clearContent">清除内容
  </van-button>
  <canvas id="_canvas"></canvas>
</template>

<style lang="less">
.clear-btn {
  float: right;
  margin-bottom: 10px;
}

#_canvas {
  width: 100%;
  height: 300px;
  border: 1px solid #777777;
}
</style>
