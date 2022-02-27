<template>
  <el-scrollbar :style="'background-color:' + settingStore.menuBackground">
    <Logo />

    <el-menu
      :default-active="path"
      class="sidebar-el-menu"
      :background-color="settingStore.menuBackground"
      text-color="#ccc"
      active-text-color="#fff"
      :collapse="settingStore.collapse"
      :collapse-transition="true"
      unique-opened
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
import { useRoute } from 'vue-router'
import Logo from './Logo.vue'
import { useSettingStore } from '@/store/modules/setting'
import { usePermissionStore } from '@/store/modules/permission'
import MenuItem from './MenuItem.vue'

const settingStore = useSettingStore()

const { sidebarRouters } = usePermissionStore()

const { path } = useRoute()
</script>

<style lang="scss" scoped></style>
