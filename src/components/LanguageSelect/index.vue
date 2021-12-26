<template>
  <div>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        <TranslateIcon class="h-5 w-5 text-dark-400 dark:text-light-50" />
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
import { TranslateIcon } from '@heroicons/vue/solid'
import { useLocale } from '@/locales/useLocale'

const { changeLocale } = useLocale()

const handleCommand = async e => {
  await changeLocale(e)
}
</script>

<style lang="scss" scoped></style>
