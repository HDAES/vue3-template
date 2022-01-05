<template>
  <component
    :is="name"
    class="h-6 w-6 text-dark-200 dark:text-light-50 cursor-pointer"
    style="font-size: 24px"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  props: {
    name: {
      type: String,
      default: 'ArrowsExpandIcon'
    }
  },
  setup(props) {
    const name = ref(props.name)
    return {
      name
    }
  }
})
</script>
