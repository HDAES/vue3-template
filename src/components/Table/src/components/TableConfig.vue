<template>
  <el-popover placement="bottom-start" :width="300" trigger="click">
    <template #reference>
      <el-button :icon="Setting" />
    </template>
    <div class="flex-col">
      <div class="flex items-center">
        <span class="label">尺寸：</span>
        <el-radio-group v-model="tableConfig.size">
          <el-radio label="medium">默认</el-radio>
          <el-radio label="small">中等</el-radio>
          <el-radio label="mini">紧凑</el-radio>
        </el-radio-group>
      </div>
      <div class="flex mt-4">
        <span class="w-20">斑马线：</span>
        <el-switch
          v-model="tableConfig.stripe"
          active-color="#13ce66"
          inactive-color="#ff4949"
        />
      </div>
      <div class="flex mt-4">
        <span class="w-20">边框：</span>
        <el-switch
          v-model="tableConfig.border"
          active-color="#13ce66"
          inactive-color="#ff4949"
        />
      </div>
      <div class="flex mt-4">
        <span class="w-20">头部：</span>
        <el-switch
          v-model="tableConfig.showHeader"
          active-color="#13ce66"
          inactive-color="#ff4949"
        />
      </div>
      <div class="flex mt-4">
        <span class="w-20">序号：</span>
        <el-switch
          v-model="tableConfig.index"
          active-color="#13ce66"
          inactive-color="#ff4949"
        />
      </div>
    </div>
  </el-popover>
</template>

<script lang="ts" setup>
import { Setting } from '@element-plus/icons-vue'
import { useTableRef } from '../hooks/useTable'
const { tableConfig } = useTableRef()
</script>

<style lang="scss" scoped>
.table-setting {
  display: flex;
  flex-direction: column;
}
</style>
