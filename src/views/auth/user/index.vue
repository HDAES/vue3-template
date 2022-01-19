<template>
  <BasicTable @register="registerTable" />
</template>

<script lang="ts" setup>
import { BasicTable, useTable } from '@/components/Table'

const [registerTable] = useTable({
  api: '1312'
})
</script>

<style lang="scss" scoped></style>
