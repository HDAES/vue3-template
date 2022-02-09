<template>
  <div ref="BasicTable" class="basic-table bg-white dark:bg-dark-800">
    <TableHeader />

    <el-row :gutter="24">
      <el-col :span="haveSlot ? 18 : 24">
        <el-card :header="title" shadow="never">
          <el-table
            :key="title"
            :data="data"
            ref="tableRef"
            v-loading="loading"
            row-key="id"
            v-bind="tableConfig"
            @select="handleSelect"
            @cell-click="handleCellClick"
            @selection-change="handleSelectionChange"
            @row-click="handleRowClick"
          >
            <el-table-column
              v-if="tableConfig.selection"
              type="selection"
              width="55"
            />

            <el-table-column
              v-if="tableConfig.index && pagination.total > 0"
              type="index"
              width="100"
              align="center"
              :index="1"
              :label="tableConfig.indexName || '序号'"
            />
            <template v-for="(item, index) in columns" :key="index">
              <el-table-column
                :key="index"
                v-if="item.show != false"
                :label="item.label"
                :prop="item.dataIndex"
                :align="item.align || 'left'"
                :width="item.width"
                :formatter="item.formatter"
                :show-overflow-tooltip="item.showOverflowTooltip || false"
              >
                <template v-if="!item.formatter" #default="scope">
                  <template v-if="item.slotname">
                    <template v-if="item.slotname == 'operate'">
                      <el-button
                        v-if="!customOperate"
                        type="text"
                        @click="edit(scope.row)"
                        >编辑</el-button
                      >
                      <slot :name="item.slotname" :row="scope.row" />
                      <el-button
                        v-if="!customOperate"
                        type="text"
                        style="color: #f00"
                        @click.stop="handleDelete('single', scope.row)"
                        >删除</el-button
                      >
                    </template>
                    <slot v-else :name="item.slotname" :row="scope.row" />
                  </template>
                  <span v-else>{{ scope.row[item.dataIndex || 0] }}</span>
                </template>
              </el-table-column>
            </template>
          </el-table>
          <el-pagination
            v-if="pagination.total > 0"
            style="margin-top: 20px"
            :background="true"
            :total="pagination.total"
            layout="total,->, sizes, prev, pager, next, jumper"
            v-model:currentPage="pagination.currentPage"
            v-model:pageSize="pagination.pageSize"
          />
        </el-card>
      </el-col>
      <el-col :span="6" v-if="haveSlot">
        <slot name="card" />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useTableRef } from './hooks/useTable'
import TableHeader from './components/TableHeader.vue'
import { useSelect } from './hooks/useSelect'
const emit = defineEmits(['register'])
const BasicTable = ref()

const {
  data,
  loading,
  columns,
  title,
  tableConfig,
  pagination,
  customOperate,
  edit,
  handleDelete,
  handleCellClick,
  handleRowClick,
  haveSlot,
  tableRef
} = useTableRef()

const { handleSelectionChange, handleSelect } = useSelect()

const _init = () => {}

onMounted(() => {
  emit('register', BasicTable.value, _init)
})
</script>

<style lang="scss" scoped>
.basic-table {
  padding: 10px;
}
</style>
