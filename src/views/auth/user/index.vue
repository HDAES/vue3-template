<template>
  <BasicTable @register="registerTable" />
</template>

<script lang="ts" setup>
import { BasicTable, useTable } from '@/components/Table'
import { onMounted } from 'vue'
import { getUser } from '@/api/auth/index'
const [registerTable, { load }] = useTable({
  api: getUser,
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
    }
  ]
})

onMounted(() => {
  load()
})
</script>

<style lang="scss" scoped></style>
