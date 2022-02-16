<template>
  <component
    :is="name"
    :style="[
      'font-size:' + size + 'px',
      'width:' + size + 'px',
      'height:' + size + 'px'
    ]"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    name: {
      type: String,
      default: 'icon'
    },
    size: {
      type: String || Number,
      default: '24'
    }
  }
})
</script>
