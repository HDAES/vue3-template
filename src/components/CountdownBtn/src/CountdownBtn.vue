<template>
  <el-button style="margin-left: 15px" :disabled="status" @click="getCode">{{
    status ? $t('sys.login.sendText', [second]) : $t('sys.login.smsCode')
  }}</el-button>
</template>

<script lang="ts" setup>
import { useCountdown } from './useCountdown'
const { status, second, getCode, clearCode } = useCountdown()

onUnmounted(() => clearCode())
</script>
