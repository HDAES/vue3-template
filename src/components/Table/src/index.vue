<template>
  <div ref="table">12312</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
export default defineComponent({
  setup(props, { emit }) {
    const table = ref()
    onMounted(() => {
      emit('register', table)
    })

    return {
      table
    }
  }
})
</script>

<style lang="scss" scoped></style>
