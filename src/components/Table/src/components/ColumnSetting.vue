<template>
  <el-popover placement="bottom-start" :width="200" trigger="click">
    <template #reference>
      <el-button :icon="Menu" />
    </template>
    <div class="column-setting">
      <div style="line-height: 40px">
        <el-checkbox v-model="tableConfig.index">序号列</el-checkbox>
        <el-checkbox v-model="tableConfig.selection">勾选项</el-checkbox>
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
    </div>
  </el-popover>
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable'
import { Menu, Rank } from '@element-plus/icons-vue'
import { useTableRef } from '../hooks/useTable'
const { tableConfig, columns } = useTableRef()

const handleDraggable = e => {
  console.log(e)
}
</script>
