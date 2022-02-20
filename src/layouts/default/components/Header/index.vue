<template>
  <div class="h-full flex items-center justify-between">
    <el-space :size="20">
      <Collapse />
      <Breadcrumb />
    </el-space>
    <el-space :size="20">
      <Search />
      <Notion />
      <FullScreen />
      <LanguageSelect />
      <Me />
      <Setting />
    </el-space>
  </div>
</template>

<script lang="ts" setup>
import FullScreen from './FullScreen.vue'
import Notion from './Notion.vue'
import Search from './Search.vue'
import Breadcrumb from './Breadcrumb.vue'
import Collapse from './Collapse.vue'
import Setting from './Setting.vue'
import Me from './Me.vue'
</script>
