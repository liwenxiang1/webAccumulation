<template>
  <div class="progress-container">
    <div class="progress-wrap"/>
    <div class="progress-content" :style="contentStyle"/>
    <div class="progress-circle" :style="circleStyle">
      <div class="progress-circle-inner"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "complete-progress",
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  computed: {
    percentStr() {
      return `${this.percent * 100}%`
    },
    contentStyle() {
      return {width: this.percentStr}
    },
    circleStyle() {
      if (this.percent <= 0) return {left: '0px'}
      return {left: `calc(${this.percentStr} - 16px)`}
    }
  }
}
</script>

<style scoped>
.progress-container {
  width: 100%;
  height: 16px;
  position: relative;
}

.progress-wrap {
  position: absolute;
  top: 5px;
  left: 0px;
  width: 100%;
  height: 6px;
  border-radius: 10px;
  background: rgba(25, 84, 151, 0.15);
}

.progress-content {
  position: absolute;
  top: 5px;
  left: 0px;
  height: 6px;
  background: #195497;
  border-radius: 10px;
  transition: width 0.6s ease;
}

.progress-circle {
  display: flex;
  position: absolute;
  top: 0px;
  width: 16px;
  height: 16px;
  background: #195497;
  border-radius: 50%;
  transition: left 0.6s ease;
}

.progress-circle-inner {
  width: 10px;
  height: 10px;
  margin: auto;
  line-height: 16px;
  border-radius: 50%;
  background: #F3F6FA;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5);
}
</style>
