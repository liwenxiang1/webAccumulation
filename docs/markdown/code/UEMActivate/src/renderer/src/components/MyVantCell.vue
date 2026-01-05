<script setup lang="ts">
import {computed, useAttrs} from 'vue'

const attrs = useAttrs()

const valueList = computed(() => {
  return attrs?.value.split('\n')
})
console.log("valueList=>", valueList.value)
</script>

<template>
  <van-cell v-if="valueList.length>2" v-bind="$attrs">
    <template #value>
      <van-cell-group>
        <van-cell v-for="(item,index) in valueList">
          <template #title>
            <div class="single-line">{{item}}</div>
          </template>
        </van-cell>
      </van-cell-group>
    </template>
  </van-cell>
  <van-cell v-else v-bind="$attrs"></van-cell>
</template>
