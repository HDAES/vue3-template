<template>
  <HeroIcon name="MenuUnfoldOutlined" @click="handle" />
</template>

<script lang="ts" setup>
import { useGlobalState } from '@/utils/storage'

const state = useGlobalState()

const handle = () => {
  state.collapse.value = !state.collapse.value
}
</script>

<style lang="scss" scoped></style>
