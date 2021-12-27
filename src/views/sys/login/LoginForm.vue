<template>
  <div
    class="mb-3 text-2xl font-bold text-center xl:text-3xl enter-x xl:text-left dark:text-gray-100"
  >
    {{ $t('sys.login.signInFormTitle') }}
  </div>
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
        <el-button type="text" size="medium">{{
          $t('sys.login.forgetFormTitle')
        }}</el-button>
      </div>
    </el-form-item>
    <el-form-item class="enter-x">
      <el-button type="primary" size="medium" style="width: 100%">{{
        $t('sys.login.signInFormTitle')
      }}</el-button>
    </el-form-item>
    <el-row :gutter="12">
      <el-col :md="8" :xs="24">
        <el-button style="width: 100%">{{
          $t('sys.login.mobileSignInFormTitle')
        }}</el-button></el-col
      >
      <el-col :md="8" :xs="24" class="!my-2 !md:my-0">
        <el-button style="width: 100%">{{
          $t('sys.login.qrSignInFormTitle')
        }}</el-button></el-col
      >
      <el-col :md="8" :xs="24">
        <el-button style="width: 100%">{{
          $t('sys.login.signUpFormTitle')
        }}</el-button></el-col
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

<script lang="ts" setup>
import { BeakerIcon } from '@heroicons/vue/solid'
import {
  GithubFilled,
  WechatFilled,
  AlipayCircleFilled,
  GoogleCircleFilled,
  TwitterCircleFilled
} from '@ant-design/icons-vue'
</script>

<style lang="scss" scoped></style>
