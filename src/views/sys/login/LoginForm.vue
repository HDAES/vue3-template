<template>
  <template class="login-form" v-if="getShow">
    <LoginTitle />
    <el-form
      class="enter-x xl:w-90 mt-2"
      :model="formData"
      :rules="getFormRules"
      ref="formRef"
    >
      <el-form-item class="enter-x" prop="username">
        <el-input
          v-model="formData.username"
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
      <el-form-item class="enter-x" prop="code">
        <InputCode
          ref="inputCode"
          v-model:code="formData.code"
          v-model:verify="formData.verify"
        />
      </el-form-item>
      <el-form-item class="enter-x">
        <div class="flex justify-between">
          <el-checkbox v-model="formData.rememberMe">{{
            $t('sys.login.rememberPassword')
          }}</el-checkbox>
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
import { InputCode } from '@/components/InputCode'
import {
  LoginStateEnum,
  useFormRules,
  useFormValid,
  useLoginState
} from './useLogin'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { LoginData } from '@/api/sys/types'
const { getLoginState, setLoginState } = useLoginState()

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN)

const { getFormRules } = useFormRules()

const formRef = ref()
const inputCode = ref()

const { validForm } = useFormValid(formRef)

const formData = reactive<LoginData>({
  username: '',
  password: '',
  code: '',
  verify: '',
  rememberMe: false
})

const userStore = useUserStore()

const router = useRouter()

async function handleLogin() {
  const data = await validForm()
  if (!data) return

  userStore
    .login(formData)
    .then(res => {
      router.push('/dashboard/analysis')
    })
    .catch(e => {
      inputCode.value.handleRefresh()
    })
}
</script>
