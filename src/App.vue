<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <ElButton type="primary" @click="toggleDark()">13123</ElButton>

  <div class="text-red-400 dark:text-green-400">Preview</div>
</template>

<style>
html,
body,
#app {
  height: 100%;
}
</style>
