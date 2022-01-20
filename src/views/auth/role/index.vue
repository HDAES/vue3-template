<template>
  <BasicTable @register="registerTable" />
</template>

<script lang="ts" setup>
import { BasicTable, useTable } from '@/components/Table'
import { onMounted } from 'vue'
import { getRole } from '@/api/auth/index'
const [registerTable, { load }] = useTable({
  api: getRole,

  columns: [
    {
      title: '角色名',
      dataIndex: 'name'
    },
    {
      title: '描述',
      dataIndex: 'description'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      showOverflowTooltip: true
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      showOverflowTooltip: true
    }
  ]
})

onMounted(() => {
  load()
})
</script>

<style lang="scss" scoped></style>
