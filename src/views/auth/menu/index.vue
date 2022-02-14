<template>
  <div>
    <BasicTable />
  </div>
</template>

<script lang="ts" setup name="auth-user">
import { BasicTable, registerTable } from '@/components/Table'
import { getUser, deleteUser } from '@/api/auth/index'

registerTable({
  title: '管理员管理',
  apiList: getUser,
  apiDelele: {
    api: deleteUser,
    name: 'username'
  },
  tableConfig: {
    selection: true
  },
  columns: [
    {
      label: '角色名',
      dataIndex: 'username'
    },
    {
      label: '昵称',
      dataIndex: 'nickname'
    },
    {
      label: '头像',
      dataIndex: 'avatar'
    },
    {
      label: '手机',
      dataIndex: 'phone'
    },
    {
      label: '性别',
      dataIndex: 'sex',
      formatter: ({ sex }) => (sex == 1 ? '男' : sex == 2 ? '女' : '未知')
    },
    {
      label: '状态',
      dataIndex: 'status',
      slotname: 'status'
    },
    {
      label: '操作',
      width: 150,
      dataIndex: 'operate',
      align: 'center',
      slotname: 'operate'
    }
  ]
})
</script>
