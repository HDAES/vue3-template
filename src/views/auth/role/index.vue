<template>
  <div>
    <BasicTable>
      <template v-slot:card>
        <TreeMenus />
      </template>
    </BasicTable>

    <EditDialog />
  </div>
</template>

<script lang="ts" setup>
import { BasicTable, registerTable } from '@/components/Table'
import EditDialog from './editDialog.vue'
import TreeMenus from './Tree.vue'
import { useTree } from './useTree'
import { deleteRole, getRole } from '@/api/auth'
const { handleCellClick } = useTree()

registerTable({
  title: '角色管理',
  apiList: getRole,
  cellClick: handleCellClick,
  apiDelele: {
    api: deleteRole
  },
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
