<template>
  <el-scrollbar>
    <Logo />

    <el-menu
      default-active="2"
      class="sidebar-el-menu"
      :collapse="settingStore.collapse"
    >
      <el-menu-item index="2">
        <template #title>Navigator Two</template>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <template #title>Navigator Three</template>
      </el-menu-item>
      <el-menu-item index="4">
        <template #title>Navigator Four</template>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import Logo from './Logo.vue'
import { useSettingStore } from '@/store/modules/setting'
const settingStore = useSettingStore()
</script>

<style lang="scss" scoped></style>
