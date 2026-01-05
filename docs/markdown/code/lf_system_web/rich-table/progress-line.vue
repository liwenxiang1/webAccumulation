<template>
  <div class="hor-layout-center-all" style="width:100%">
    <div class="out-line hor-layout-center">
      <div class="inner-line" :style="getInnerStyle"></div>
    </div>
    <span class="line-value">{{ getValueStr }}</span>
  </div>
</template>

<script>
export default {
  name: "progress-line",
  props: {
    value: {
      type: Number
    }
  },
  computed: {
    getValueStr() {
      let valueStr = ["较低", "中等", "较高"][this.value - 1]
      return valueStr
    },
    getInnerStyle() {
      let bdWidth = document.body.clientWidth
      let width = ["19px", "66px", "116px"][this.value - 1]
      if (bdWidth <= 770)
        width = [`${19 / 3}px`, `${66 / 3}px`, `${116 / 3}px`][this.value - 1]
      return {width}
    }
  }
}
</script>

<style >
.out-line {
  width: 118px;
  height: 12px;
  background: #EBEEF5;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

.inner-line {
  height: 10px;
  background: #195497;
  border-radius: 10px;
}

.line-value {
  margin-left: 19px;
}

@media (max-width: 770px) {
  .out-line {
    width: calc(118px / 3);
    height: calc(12px / 3);
    box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.3);
    border-radius: calc(10px / 3);
  }

  .inner-line {
    height: calc(10px / 3);
    border-radius: calc(10px / 3);
  }

  .line-value {
    margin-left: calc(19px / 3);
  }
}
</style>
