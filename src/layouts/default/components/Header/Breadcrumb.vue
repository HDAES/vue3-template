<template>
  <div v-if="isBreadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>promotion list</el-breadcrumb-item>
      <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script lang="ts" setup>
import { useSetting } from '@/hooks/setting/index'

const { isBreadcrumb } = useSetting()
</script>
