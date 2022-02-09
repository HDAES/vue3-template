<template>
  <el-popover placement="bottom-start" :width="400" trigger="click">
    <template #reference>
      <el-button :icon="Setting" />
    </template>
    <div class="flex-col">
      <div class="flex items-center">
        <span class="label">{{ $t('table.config.size') }}：</span>
        <el-radio-group v-model="tableConfig.size">
          <el-radio label="large">{{ $t('table.config.medium') }}</el-radio>
          <el-radio label="default">{{ $t('table.config.default') }}</el-radio>
          <el-radio label="small">{{ $t('table.config.compact') }}</el-radio>
        </el-radio-group>
      </div>
      <div class="flex mt-4">
        <span class="w-20">{{ $t('table.config.stripe') }}：</span>
        <el-switch
          v-model="tableConfig.stripe"
          active-color="#13ce66"
          inactive-color="#ff4949"
        />
      </div>
      <div class="flex mt-4">
        <span class="w-20">{{ $t('table.config.border') }}：</span>
        <el-switch
          v-model="tableConfig.border"
          active-color="#13ce66"
          inactive-color="#ff4949"
        />
      </div>
      <div class="flex mt-4">
        <span class="w-20">{{ $t('table.config.header') }}：</span>
        <el-switch
          v-model="tableConfig.showHeader"
          active-color="#13ce66"
          inactive-color="#ff4949"
        />
      </div>
      <div class="flex mt-4">
        <span class="w-20">{{ $t('table.config.sequence') }}：</span>
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
