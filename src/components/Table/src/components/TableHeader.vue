<template>
  <div class="table-header">
    <el-space wrap>
      <el-button :icon="Plus" @click="add">{{ $t('table.add') }}</el-button>
      <el-button :disabled="selectList.length != 1" :icon="EditPen">
        {{ $t('table.edit') }}
      </el-button>
      <el-button
        :disabled="selectList.length == 0"
        type="danger"
        plain
        :icon="Delete"
        @click="handleDelete('multiple', [])"
        >{{ $t('table.delete') }}</el-button
      >
      <el-button :icon="Download">{{ $t('table.export') }}</el-button>
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
import { useSelect } from '../hooks/useSelect'
const { loading, refresh, add, handleDelete } = useTableRef()

const { selectList } = useSelect()
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
