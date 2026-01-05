<template>
  <div>
    <div class="hor-layout-center-all radar-container">
      <div class="legend-circle"></div>
      <div class="legend-text">我 的</div>
      <div class="legend-circle legend2"></div>
      <div class="legend-text">平 均</div>
    </div>
    <canvas id="radar_canvas" :width="canvasSize.width" :height="canvasSize.height" :radar="canvasSize.radar">
      浏览器不支持
    </canvas>
  </div>
</template>

<script>
import Radar from "./engine"

export default {
  name: "radar-view",
  props: {
    radar: {
      type: Object
    },
    pageWidth: {
      type: Number
    }
  },
  data() {
    return {
      radarView: null
    }
  },
  watch: {
    radar: {
      handler: function (newVal, oldVal) {
        if (this.radarView) this.radarView.updateValue(newVal)
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    canvasSize() {
      this.updateCanvas()
      if (this.pageWidth <= 770)
        return {width: `${465 / 2}px`, height: `${304 / 2}px`, radar: `${233 / 2}`}
      return {width: "465px", height: "304px", radar: "233"}
    }
  },
  mounted() {
    this.radarView = new Radar(this.radar).painting()
  },
  methods: {
    updateCanvas() {
      setTimeout(() => {
        if (this.radarView) this.radarView.initCanvasView()
      }, 200)
    }
  }
}
</script>

<style>
.radar-container {
  width: 100%;
  margin-bottom: 34px
}

.legend-circle {
  width: 14px;
  height: 14px;
  background: #FF8E5E;
  border-radius: 8px;
  margin-right: 21px;
}

.legend-circle.legend2 {
  margin-left: 45px;
  background: #195497;
}

.legend-text {
  font-size: 16px;
  font-weight: 400;
  color: #3B4859;
  font-family: PingFangSC-Regular, PingFang SC;
}

@media (max-width: 770px) {
  .radar-container {
    width: 100%;
    margin-bottom: calc(34px / 3);
  }

  .legend-circle {
    width: calc(14px / 3);
    height: calc(14px / 3);
    border-radius: calc(8px / 3);
    margin-right: calc(21px / 3);
  }

  .legend-circle.legend2 {
    margin-left: calc(45px / 3);
  }

  .legend-text {
    font-size: calc(16px / 3);
  }
}
</style>
