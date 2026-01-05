<template>
  <canvas id="progress_canvas" :width="canvasWidth" :height="canvasWidth">
    浏览器不支持
  </canvas>
</template>

<script>
import Progress from './engine'

export default {
  name: "circle-progress",
  props: {
    value: {
      type: String,
      default: "0%"
    },
    pageWidth: {
      type: Number
    },
    type: {
      type: String,
      default: 'result'
    }
  },
  data() {
    return {
      progress: ''
    }
  },
  watch: {
    value: function value(_value) {
      if (this.progress) this.progress.value = this.valueStr
    }
  },
  computed: {
    canvasWidth() {
      this.updateCanvas()
      if (this.pageWidth <= 770)
        return "100px"
      return "300px"
    },
    valueStr() {
      let idx = this.value.indexOf(".")
      let value = idx === -1 ? this.value : `${this.value.substring(0, idx)}%`
      return value
    }
  },
  mounted() {
    this.progress = new Progress(this.valueStr, this.type).painting().addTimer()
  },
  destroyed() {
    this.progress.removeTimer()
  },
  methods: {
    updateCanvas() {
      setTimeout(() => {
        if (this.progress) this.progress.initCanvasView()
      }, 200)
    }
  }
}
</script>

<style scoped>

</style>
