<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span>菜单分配</span>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </div>
    </template>

    <el-tree
      ref="treeRef"
      :data="optionsTree"
      show-checkbox
      node-key="id"
      check-strictly
      :props="defaultProps"
      empty-text="加载中,请稍等"
    ></el-tree>
  </el-card>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useTree } from './useTree'
const { treeRef, defaultProps, handleSave, optionsTree, getList } = useTree()

onMounted(getList)
</script>
