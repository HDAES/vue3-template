<template>
  <div>
    <BasicTable @register="registerTable">
      <template v-slot:card>
        <Tree />
      </template>
    </BasicTable>
  </div>
</template>

<script lang="ts" setup>
import { BasicTable, useTable } from '@/components/Table'
import Tree from './Tree.vue'
import { useTree } from './useTree'
import { getRole } from '@/api/auth'
const { handleCellClick } = useTree()
const [registerTable] = useTable({
  title: '角色管理',
  title_en: 'role-table',
  apiList: getRole,
  cellClick: handleCellClick,
  columns: [
    {
      label: '角色名',
      dataIndex: 'name'
    },
    {
      label: '描述',
      dataIndex: 'description'
    },
    {
      label: '创建时间',
      dataIndex: 'createTime',
      showOverflowTooltip: true
    },
    {
      label: '更新时间',
      dataIndex: 'updateTime',
      showOverflowTooltip: true
    },
    {
      label: '操作',
      width: 150,
      align: 'center',
      slotname: 'operate'
    }
  ],
  tableConfig: {
    haveSlot: true
  }
})
</script>
