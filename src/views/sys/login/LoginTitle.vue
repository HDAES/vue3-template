<template>
  <div
    class="mb-3 text-2xl font-bold text-center xl:text-3xl enter-x xl:text-left dark:text-gray-100"
  >
    {{ getFormTitle }}
  </div>
</template>

<script lang="ts" setup>
import { LoginStateEnum, useLoginState } from './useLogin'
import { useI18n } from '@/hooks/web/useI18n'
const { getLoginState } = useLoginState()
const { t } = useI18n()

const getFormTitle = computed(() => {
  const titleList = {
    [LoginStateEnum.LOGIN]: t('sys.login.signInFormTitle'),
    [LoginStateEnum.MOBILE]: t('sys.login.mobileSignInFormTitle'),
    [LoginStateEnum.RESET_PASSWORD]: t('sys.login.forgetFormTitle'),
    [LoginStateEnum.REGISTER]: t('sys.login.signUpFormTitle'),
    [LoginStateEnum.QR_CODE]: t('sys.login.qrSignInFormTitle')
  }
  return titleList[unref(getLoginState)]
})
</script>
