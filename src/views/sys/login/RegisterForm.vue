<template>
  <template v-if="getShow">
    <LoginTitle />
    <el-form class="enter-x xl:w-90 mt-2">
      <el-form-item class="enter-x">
        <el-input :placeholder="$t('sys.login.placeholderAccount')" />
      </el-form-item>
      <el-form-item class="enter-x">
        <el-input :placeholder="$t('sys.login.placeholderMobile')" />
      </el-form-item>
      <el-form-item class="enter-x">
        <div class="flex">
          <el-input :placeholder="$t('sys.login.placeholderCode')" />
          <CountdownBtn />
        </div>
      </el-form-item>
      <el-form-item class="enter-x">
        <StrengthPassword />
      </el-form-item>
      <el-form-item class="enter-x">
        <el-input
          :placeholder="$t('sys.login.placeholderAgainPassword')"
          show-password
        />
      </el-form-item>
      <el-form-item class="enter-x">
        <el-button type="primary" size="medium" class="w-full">{{
          $t('sys.login.signUpFormTitle')
        }}</el-button>
      </el-form-item>
      <el-form-item class="enter-x">
        <el-button size="medium" class="w-full" @click="handleBack">{{
          $t('sys.login.backSignIn')
        }}</el-button>
      </el-form-item>
    </el-form>
  </template>
</template>

<script lang="ts" setup>
import LoginTitle from './LoginTitle.vue'
import { computed, unref } from 'vue'
import { LoginStateEnum, useLoginState } from './useLogin'
import { CountdownBtn } from '@/components/CountdownBtn'
import { StrengthPassword } from '@/components/StrengthPassword'
const { getLoginState, handleBack } = useLoginState()

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER)
</script>

<style lang="scss" scoped></style>
