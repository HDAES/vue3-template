<template>
  <BasicTable @register="registerTable" />
</template>

<script lang="ts" setup>
import { BasicTable, useTable } from '@/components/Table'
import { onMounted } from 'vue'
import { getRole } from '@/api/auth/index'
const [registerTable, { load }] = useTable({
  title_en: 'role-table',
  apiList: getRole,
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
    }
  ]
})

onMounted(() => {
  load()
})
</script>

<style lang="scss" scoped></style>
