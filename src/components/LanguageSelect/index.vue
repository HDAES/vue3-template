<template>
  <div style="height: 24px">
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        <HeroIcon name="TranslateIcon" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="zh-CN">简体中文</el-dropdown-item>
          <el-dropdown-item command="en">English</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { useLocale } from '@/locales/useLocale'
import { useGlobalState } from '@/utils/storage'
const { changeLocale } = useLocale()
const state = useGlobalState()

const handleCommand = async e => {
  await changeLocale(e)
  state.language.value = e
}
</script>
