<template>
  <div style="height: 24px">
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        <Icon name="TranslationOutlined" />
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
import { ElMessage } from 'element-plus'
import { useLocale } from '@/locales/useLocale'
import { useGlobalState } from '@/utils/storage'
import { useI18n } from '@/hooks/web/useI18n'
const { changeLocale } = useLocale()
const state = useGlobalState()
const { t } = useI18n()

const handleCommand = async e => {
  await changeLocale(e)
  state.language.value = e

  ElMessage({
    message: t('sys.switchLanguageSuccess'),
    type: 'success'
  })
}
</script>
