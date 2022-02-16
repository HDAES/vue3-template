<template>
  <Icon name="Setting" @click="drawer = true" />

  <el-drawer
    v-model="drawer"
    :title="$t('setting.configuration')"
    direction="rtl"
    size="20%"
  >
    <div class="flex flex-col items-center">
      <el-divider>{{ $t('setting.mode') }} </el-divider>
      <DarkModeToggle />

      <el-divider> {{ $t('setting.interfaceFunction') }}</el-divider>
      <div class="flex w-full justify-between">
        <div>{{ $t('setting.collapseMenu') }}</div>
        <el-switch
          v-model="collapse"
          :before-change="changeCollapse"
          inline-prompt
          :active-text="$t('setting.yes')"
          :inactive-text="$t('setting.no')"
        />
      </div>

      <el-divider> {{ $t('setting.interfaceDisplay') }}</el-divider>
      <div class="flex w-full justify-between">
        <div>{{ $t('setting.breadcrumb') }}</div>
        <el-switch
          v-model="isBreadcrumb"
          :before-change="changeIsBreadcrumb"
          inline-prompt
          :active-text="$t('setting.yes')"
          :inactive-text="$t('setting.no')"
        />
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { useSetting } from '@/hooks/setting/index'
import { ref } from 'vue'
import DarkModeToggle from '@/components/DarkModeToggle/index.vue'
const drawer = ref(false)
const { collapse, changeCollapse, isBreadcrumb, changeIsBreadcrumb } =
  useSetting()
</script>

<style lang="scss" scoped></style>
