<template>
  <el-scrollbar>
    <Logo />
    <el-menu default-active="2" :collapse="globalState().collapse">
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <template #title>Navigator Two</template>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon><document /></el-icon>
        <template #title>Navigator Three</template>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <template #title>Navigator Four</template>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import Logo from './Logo.vue'
import { globalState } from '@/utils/storage'
</script>

<style lang="scss" scoped>
.sidebar {
  width: 200px;
}
</style>
