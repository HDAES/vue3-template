<template>
  <div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <TranslateIcon class="h-5 w-5 text-dark-400 dark:text-light-50" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>Action 1</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { TranslateIcon } from '@heroicons/vue/solid'
</script>

<style lang="scss" scoped></style>
