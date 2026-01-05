<template>
  <div style="position:relative;">
    <canvas :id="randomId" :width="canvasWidth" :height="canvasWidth">
      浏览器不支持
    </canvas>
    <div class="circle-text use-time-text" :style="textStyle">
      {{ circleText }}
    </div>
  </div>
</template>

<script>
import CircleWave from "./engine"
import { getRandomId } from "@/utils/utils"

export default {
  name: "circle-wave",
  props: {
    flag: {
      type: Number,
      default: 1
    },
    value: {
      type: String
    },
    pageWidth: {
      type: Number
    }
  },
  data() {
    return {
      circleWave: '',
    }
  },
  watch: {
    value: function value(_value) {
      if (this.circleWave) this.circleWave.textValue=_value
    }
  },
  computed: {
    randomId() {
      return `circle_canvas_${getRandomId()}`
    },
    circleText() {
      return this.flag === 1 ? "我的用时" : "平均用时"
    },
    textStyle() {
      return this.flag === 1 ? {color: '#195497'} : {color: '#FF8E5E'}
    },
    canvasWidth() {
      console.log("canvasWidth")
      this.updateCanvas()
      if (this.pageWidth <= 770)
        return "140px"
      return "260px"
    }
  },
  mounted() {
    this.circleWave = new CircleWave(this.randomId, this.flag, this.value).startWave1()
  },
  destroyed() {
    this.circleWave.removeTimer()
    this.circleWave.removeTimer1()
  },
  methods: {
    updateCanvas() {
      setTimeout(() => {
        if (this.circleWave) this.circleWave.initCanvasView()
      }, 200)
    }
  }
}
</script>

<style>
.circle-text {
  position: absolute;
  margin-top: 23px;
  width: 100%;
  text-align: center;
}

.use-time-text {
  font-size: 24px;
  font-weight: 500;
  color: #195497;
  font-family: PingFangSC-Medium, PingFang SC;
}

@media (max-width: 770px) {
  .circle-text {
    margin-top: calc(23px / 3);
  }

  .use-time-text {
    font-size: calc(24px / 3);
  }
}
</style>
