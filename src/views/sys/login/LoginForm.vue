<template>
  <template class="login-form" v-if="getShow">
    <LoginTitle />
    <el-form class="enter-x xl:w-90 mt-2">
      <el-form-item>
        <el-input :placeholder="$t('sys.login.placeholderAccount')" />
      </el-form-item>
      <el-form-item>
        <el-input :placeholder="$t('sys.login.placeholderPassword')" />
      </el-form-item>
      <el-form-item class="enter-x">
        <div class="flex justify-between">
          <el-checkbox>{{ $t('sys.login.rememberPassword') }}</el-checkbox>
          <el-button
            type="text"
            size="medium"
            @click="setLoginState(LoginStateEnum.RESET_PASSWORD)"
            >{{ $t('sys.login.forgetFormTitle') }}</el-button
          >
        </div>
      </el-form-item>
      <el-form-item class="enter-x">
        <el-button type="primary" size="medium" class="w-full">{{
          $t('sys.login.signInFormTitle')
        }}</el-button>
      </el-form-item>
      <el-row :gutter="12">
        <el-col :md="8" :xs="24">
          <el-button
            class="w-full"
            @click="setLoginState(LoginStateEnum.MOBILE)"
            >{{ $t('sys.login.mobileSignInFormTitle') }}</el-button
          ></el-col
        >
        <el-col :md="8" :xs="24" class="!my-2 !md:my-0">
          <el-button
            class="w-full"
            @click="setLoginState(LoginStateEnum.QR_CODE)"
            >{{ $t('sys.login.qrSignInFormTitle') }}</el-button
          ></el-col
        >
        <el-col :md="8" :xs="24">
          <el-button
            class="w-full"
            @click="setLoginState(LoginStateEnum.REGISTER)"
            >{{ $t('sys.login.signUpFormTitle') }}</el-button
          ></el-col
        >
      </el-row>

      <el-divider></el-divider>

      <div
        class="flex justify-evenly enter-x text-dark-100 dark:text-light-50 text-2xl"
      >
        <GithubFilled />
        <WechatFilled />
        <AlipayCircleFilled />
        <GoogleCircleFilled />
        <TwitterCircleFilled />
      </div>
    </el-form>
  </template>
</template>

<script lang="ts" setup>
import {
  GithubFilled,
  WechatFilled,
  AlipayCircleFilled,
  GoogleCircleFilled,
  TwitterCircleFilled
} from '@ant-design/icons-vue'
import { computed, unref } from 'vue'
import LoginTitle from './LoginTitle.vue'
import { LoginStateEnum, useLoginState } from './useLogin'

const { getLoginState, setLoginState } = useLoginState()

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN)
</script>
