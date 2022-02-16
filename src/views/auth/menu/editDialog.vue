<template>
  <el-dialog
    v-model="dialogConfig.visible"
    :title="dialogConfig.type == 'edit' ? '编辑' : '新增'"
    width="600px"
  >
  </el-dialog>
</template>

<script lang="ts" setup>
import { useTable } from '@/components/Table'
const { dialogConfig, refresh } = useTable()
</script>

<style lang="scss" scoped></style>
