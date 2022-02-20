<template>
  <div class="dark:bg-black bg-dark-700 dark-model" @click="toggleDark()">
    <div class="slider" :style="cls" />
    <SvgIcon size="14" name="sun" />
    <SvgIcon size="14" name="moon" />
  </div>
</template>

<script lang="ts" setup>
import { useSetting } from '@/hooks/setting/index'
import { watchEffect, ref } from 'vue'

const cls = ref()

const { isDark, toggleDark } = useSetting()

watchEffect(() => {
  cls.value = {
    left: (isDark.value ? 25 : 3) + 'px'
  }
})
</script>

<style lang="scss" scoped>
.dark-model {
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 50px;
  height: 26px;
  border-radius: 30px;
  cursor: pointer;
  border: 1px solid var(--el-text-color-regular);
  .slider {
    position: absolute;
    left: 5px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #f3f4f6;
    transition: all 0.5s;
  }
}
</style>
