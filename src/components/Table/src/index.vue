<template>
  <div ref="basieTable">
    <el-table :data="data" style="width: 100%" ref="table" v-loading="loading">
      <el-table-column
        type="selection"
        width="55"
        align="center"
      ></el-table-column>

      <el-table-column
        v-for="(item, index) in columns"
        :key="index"
        :label="item.title"
        :prop="item.dataIndex"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup name="basieTable">
import { computed, onMounted, ref } from 'vue'
import { useTableRef } from './hooks/useTable'
import { ColumnProps } from './types/column'
const emit = defineEmits(['register'])
const basieTable = ref()
const table = ref()

const { data, loading, columns } = useTableRef()

const _init = () => {
  //console.log('12312')
}

onMounted(() => {
  emit('register', basieTable.value, _init)
})
</script>

<style lang="scss" scoped></style>
