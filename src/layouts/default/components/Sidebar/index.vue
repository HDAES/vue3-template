<template>
  <el-scrollbar :style="'background-color:' + settingStore.menuBackground">
    <Logo />

    <el-menu
      default-active="2"
      class="sidebar-el-menu"
      :background-color="settingStore.menuBackground"
      text-color="#ccc"
      active-text-color="#fff"
      :collapse="settingStore.collapse"
      :collapse-transition="true"
      router
    >
      <MenuItem
        v-for="(item, index) in sidebarRouters"
        :key="index"
        :path="item.path"
        :route="item"
        :havecChildren="item.children && item.children.length > 0"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import Logo from './Logo.vue'
import { useSettingStore } from '@/store/modules/setting'
import { usePermissionStore } from '@/store/modules/permission'
import MenuItem from './MenuItem.vue'
const settingStore = useSettingStore()

const { sidebarRouters } = usePermissionStore()
</script>

<style lang="scss" scoped></style>
