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
  columns: [
    {
      title: '角色名',
      dataIndex: 'username'
    },
    {
      title: '昵称',
      dataIndex: 'nickname'
    },
    {
      title: '头像',
      dataIndex: 'avatar'
    },
    {
      title: '手机',
      dataIndex: 'phone'
    },
    {
      title: '状态',
      dataIndex: 'status',
      slotname: 'status'
    },
    {
      title: '操作',
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
