<template>
  <HeroIcon name="ArrowsExpandIcon" @click="toggle" />
</template>

<script lang="ts" setup>
import { useFullscreen } from '@vueuse/core'

const { toggle } = useFullscreen()
</script>
