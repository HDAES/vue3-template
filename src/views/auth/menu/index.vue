<template>
  <div>
    <BasicTable />

    <EditDialog />
  </div>
</template>

<script lang="ts" setup name="auth-user">
import { BasicTable, registerTable } from '@/components/Table'
import { getPermissionTree, deletePermission } from '@/api/auth/index'
import EditDialog from './editDialog.vue'

registerTable({
  title: '管理员管理',
  apiList: getPermissionTree,
  apiDelele: {
    api: deletePermission,
    name: 'name'
  },
  columns: [
    {
      label: '权限管理',
      dataIndex: 'name'
    },
    {
      label: '图标',
      dataIndex: 'icon'
    },
    {
      label: '排序',
      dataIndex: 'sort'
    },
    {
      label: '权限标识',
      dataIndex: 'permission'
    },
    {
      label: '组件路径',
      dataIndex: 'component'
    },
    {
      label: '请求方式',
      dataIndex: 'method'
    },
    {
      label: '地址',
      dataIndex: 'path'
    },
    {
      label: '类型',
      dataIndex: 'type',
      formatter: ({ type }) =>
        type == 0 ? '目录' : type == 1 ? '页面' : '按钮'
    },
    {
      label: '操作',
      width: 150,
      align: 'center',
      slotname: 'operate'
    }
  ]
})
</script>
