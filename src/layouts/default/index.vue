<template>
  <el-container style="height: 100%">
    <Feature />
    <Sidebar />
    <el-container>
      <el-header
        style="height: 64px; border-bottom: 1px solid #eee"
        class="dark:shadow-2xl"
      >
        <Header />
      </el-header>
      <AppMain />
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import AppMain from './components/AppMain/index.vue'
import Header from './components/Header/index.vue'
import Sidebar from './components/Sidebar/index.vue'
import Feature from './feature/index.vue'
</script>
