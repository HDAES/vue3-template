<template>
  <el-button @click="toggleDark()">点击</el-button>

  <BeakerIcon class="h-5 w-5 text-blue-500 dark:text-light-200" />
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { BeakerIcon } from '@heroicons/vue/solid'
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()

const toggleDark = useToggle(isDark)
</script>

<style lang="scss" scoped></style>
