<template>
  <template v-if="getShow">
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
      <el-form-item class="enter-x" prop="mobile">
        <el-input
          v-model="formData.mobile"
          :placeholder="$t('sys.login.placeholderMobile')"
        />
      </el-form-item>
      <el-form-item class="enter-x" prop="code">
        <div class="flex">
          <el-input
            v-model="formData.code"
            :placeholder="$t('sys.login.placeholderCode')"
          />
          <CountdownBtn />
        </div>
      </el-form-item>
      <el-form-item class="enter-x" prop="password">
        <StrengthPassword v-model:passWordValue="formData.password" />
      </el-form-item>
      <el-form-item class="enter-x" prop="confirmPassword">
        <el-input
          v-model="formData.confirmPassword"
          :placeholder="$t('sys.login.placeholderAgainPassword')"
          show-password
        />
      </el-form-item>
      <el-form-item class="enter-x">
        <el-button
          type="primary"
          size="small"
          class="w-full"
          @click="handleLogin"
          >{{ $t('sys.login.signUpFormTitle') }}</el-button
        >
      </el-form-item>
      <el-form-item class="enter-x">
        <el-button size="small" class="w-full" @click="handleBack">{{
          $t('sys.login.backSignIn')
        }}</el-button>
      </el-form-item>
    </el-form>
  </template>
</template>

<script lang="ts" setup>
import LoginTitle from './LoginTitle.vue'
import { computed, reactive, ref, unref } from 'vue'
import {
  LoginStateEnum,
  useFormRules,
  useFormValid,
  useLoginState
} from './useLogin'
import { CountdownBtn } from '@/components/CountdownBtn'
import { StrengthPassword } from '@/components/StrengthPassword'
const { getLoginState, handleBack } = useLoginState()

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER)

const { getFormRules } = useFormRules()

const formRef = ref()

const { validForm } = useFormValid(formRef)

const formData = reactive({
  account: null,
  mobile: null,
  password: null,
  code: null,
  confirmPassword: null
})

async function handleLogin() {
  const data = await validForm()
  if (!data) return
}
</script>

<style lang="scss" scoped></style>
