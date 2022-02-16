<template>
  <Icon
    :name="settingStore.collapse ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'"
    @click="settingStore.changeCollapse"
  />
</template>

<script lang="ts" setup>
import { useSettingStore } from '@/store/modules/setting'
const settingStore = useSettingStore()
</script>

<style lang="scss" scoped></style>
