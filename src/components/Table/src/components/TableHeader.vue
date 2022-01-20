<template>
  <div class="table-header">
    <el-space wrap>
      <el-button :icon="Plus">新增</el-button>
      <el-button :icon="EditPen">修改</el-button>
      <el-button :icon="Delete">删除</el-button>
      <el-button :icon="Download">导出</el-button>
    </el-space>
    <el-button-group>
      <el-button :icon="Search"></el-button>
      <el-tooltip content="刷新列表" placement="top-start">
        <el-button :icon="RefreshRight" :loading="loading" @click="refresh" />
      </el-tooltip>
      <ColumnSetting />
      <TableConfig />
    </el-button-group>
  </div>
</template>

<script lang="ts" setup>
import {
  RefreshRight,
  Search,
  Plus,
  EditPen,
  Delete,
  Download
} from '@element-plus/icons-vue'
import { useTableRef } from '../hooks/useTable'
import TableConfig from './TableConfig.vue'
import ColumnSetting from './ColumnSetting.vue'
const { loading, refresh } = useTableRef()
</script>

<style lang="scss" scoped>
.table-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
