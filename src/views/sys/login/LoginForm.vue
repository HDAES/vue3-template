<template>
  <template class="login-form" v-if="getShow">
    <LoginTitle />
    <el-form
      class="enter-x xl:w-90 mt-2"
      :model="formData"
      :rules="getFormRules"
      ref="formRef"
    >
      <el-form-item class="enter-x" prop="account">
        <el-input
          v-model="formData.account"
          :placeholder="$t('sys.login.placeholderAccount')"
        />
      </el-form-item>
      <el-form-item class="enter-x" prop="password">
        <el-input
          v-model="formData.password"
          :placeholder="$t('sys.login.placeholderPassword')"
          show-password
        />
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
        <el-button
          type="primary"
          size="medium"
          class="w-full"
          @click="handleLogin"
          >{{ $t('sys.login.signInFormTitle') }}</el-button
        >
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
import { computed, reactive, ref, unref } from 'vue'
import LoginTitle from './LoginTitle.vue'
import {
  LoginStateEnum,
  useFormRules,
  useFormValid,
  useLoginState
} from './useLogin'

const { getLoginState, setLoginState } = useLoginState()

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN)

const { getFormRules } = useFormRules()

const formRef = ref()

const { validForm } = useFormValid(formRef)

const formData = reactive({
  account: null,
  password: null
})

async function handleLogin() {
  const data = await validForm()
  if (!data) return
}
</script>
