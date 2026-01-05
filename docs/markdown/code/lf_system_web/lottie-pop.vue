<template>
  <div v-if="showLottie" class="dialog-container" @click="showLottie=false">
    <div class="dialog-content ver-layout-center">
      <lottie :options="defaultOptions" :height="200" :width="200" v-on:animCreated="handleAnimation"/>
      <div v-if="type === 'analysisJson'" class="analysis-text">智能计算中...</div>
    </div>
  </div>
</template>

<script>
import waitJson from "@/assets/lottie/44177-quiz.json";
import analysisJson from "@/assets/lottie/19993-system-analytics-check-animation-loop.json";

export default {
  name: "lottie-pop",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
    }
  },
  data() {
    return {
      animationSpeed: 1,
      anim: {}
    }
  },
  computed: {
    showLottie: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
    defaultOptions() {
      if (this.type === 'waitJson')
        return {animationData: waitJson}
      else if (this.type === 'analysisJson')
        return {animationData: analysisJson}
    }
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim;
      // console.log(anim); //这里可以看到 lottie 对象的全部属性
    },
  }
}
</script>

<style scoped>
.dialog-container {
  top: 0px;
  left: 0px;
  right: 0;
  bottom: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 2001;
  background: rgba(0, 0, 0, 0.5);
}

.dialog-content {
  position: fixed;
  margin: auto;
  z-index: 3000;
  top: calc(50% - 100px);
  left: calc(50% - 100px);
}

.analysis-text {
  color: white;
  font-size: large;
  margin-top: -30px;
  padding-left: 16px;
}
</style>
