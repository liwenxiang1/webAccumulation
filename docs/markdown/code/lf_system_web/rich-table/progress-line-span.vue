<template>
  <div class="hor-layout-center-all" style="width:100%">
    <div v-for="(item,index) in lineList" class="line-span" :style="getSpanStyle(index)"></div>
    <span class="line-span-value">{{ getValueStr }}</span>
  </div>
</template>

<script>
export default {
  name: "progress-line-span",
  props: {
    value: {type: Number}
  },
  computed: {
    lineList() {
      return Array.from({length: 10}, (x, i) => i)
    },
    getValueStr() {
      let valueStr = ["较慢", "适中", "较快"][this.value - 1]
      return valueStr
    }
  },
  methods: {
    getSpanStyle(index) {
      let value = [2, 5, 8][this.value - 1]
      if (index < value)
        return {background: "#195497"}
      return {background: "#DDE0E6"}
    }
  }
}
</script>

<style >
.line-span {
  margin: 0px 3px;
  width: 6px;
  height: 24px;
  background: #195497;
  border-radius: 3px;
}

.line-span-value {
  margin-left: 20px;
}

@media (max-width: 770px) {
  .line-span {
    margin: 0px calc(3px / 3);
    width: calc(6px / 3);
    height: calc(24px / 3);
    border-radius: calc(3px / 3);
  }

  .line-span-value {
    margin-left: calc(20px / 3);
  }
}
</style>
