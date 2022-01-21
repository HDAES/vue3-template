<template>
  <BasicTable @register="registerTable">
    <template #status="scope">
      <div>12312</div>
    </template>
  </BasicTable>
</template>

<script lang="ts" setup>
import { BasicTable, useTable } from '@/components/Table'
import { onMounted } from 'vue'
import { getUser } from '@/api/auth/index'

const [registerTable, { load }] = useTable({
  title: '管理员管理',
  api: getUser,
  size: 10,
  handleEdit: e => {
    console.log(e)
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

onMounted(() => {
  load()
})
</script>

<style lang="scss" scoped></style>
