<template>
  <el-popover placement="bottom-start" :width="250" trigger="click">
    <template #reference>
      <el-button :icon="Menu" />
    </template>
    <div class="column-setting">
      <div style="line-height: 40px">
        <el-checkbox v-model="tableConfig.index">{{
          $t('table.config.sequenceCol')
        }}</el-checkbox>
        <el-checkbox v-model="tableConfig.selection">{{
          $t('table.config.selectionCol')
        }}</el-checkbox>
      </div>
      <draggable v-model="columns" item-key="id" @change="handleDraggable">
        <template #item="{ element }">
          <div class="item" style="line-height: 25px">
            <el-icon :size="20" style="margin-right: 15px">
              <Rank />
            </el-icon>
            <el-checkbox v-model="element.show">{{
              element.label
            }}</el-checkbox>
          </div>
        </template>
      </draggable>

      <el-button :icon="RefreshRight" @click="resetColumns">{{
        $t('table.config.resetTable')
      }}</el-button>
    </div>
  </el-popover>
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable'
import { Menu, Rank, RefreshRight } from '@element-plus/icons-vue'
import { useTableRef } from '../hooks/useTable'
const { tableConfig, columns, resetColumns } = useTableRef()

const handleDraggable = e => {
  console.log(e)
}
</script>
