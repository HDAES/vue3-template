<template>
  <HeroIcon
    v-if="settingStore.collapse"
    name="MenuUnfoldOutlined"
    @click="settingStore.changeCollapse"
  />
  <HeroIcon
    v-else
    name="MenuFoldOutlined"
    @click="settingStore.changeCollapse"
  />
</template>

<script lang="ts" setup>
import { useSettingStore } from '@/store/modules/setting'
const settingStore = useSettingStore()
</script>

<style lang="scss" scoped></style>
