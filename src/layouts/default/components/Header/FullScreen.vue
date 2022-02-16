<template>
  <Icon
    :name="isFullscreen ? 'FullscreenExitOutlined' : 'FullscreenOutlined'"
    @click="toggle"
  />
</template>

<script lang="ts" setup>
import { useFullscreen } from '@vueuse/core'
const { toggle, isFullscreen } = useFullscreen()
</script>
