<template>
  <template v-if="getShow">
    <LoginTitle />
    <div class="enter-x min-w-64 min-h-64">
      <QrCode value="132132413" :width="280" />
      <el-divider></el-divider>
      <div class="dark:text-light-50 mb-2 text-xs text-center">
        {{ $t('sys.login.scanSign') }}
      </div>
      <el-button size="medium" class="w-full" @click="handleBack">{{
        $t('sys.login.backSignIn')
      }}</el-button>
    </div>
  </template>
</template>

<script lang="ts" setup>
import LoginTitle from './LoginTitle.vue'
import { computed, unref } from 'vue'
import { LoginStateEnum, useLoginState } from './useLogin'
import { QrCode } from '@/components/Qrcode'
const { getLoginState, handleBack } = useLoginState()

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.QR_CODE)
</script>
