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
        <div class="flex flex-1 justify-between">
          <el-input
            v-model="formData.code"
            :placeholder="$t('sys.login.placeholderCode')"
          />
          <CountdownBtn />
        </div>
      </el-form-item>
      <el-form-item class="enter-x">
        <el-button type="primary" class="w-full" @click="handleLogin">{{
          $t('sys.login.reset')
        }}</el-button>
      </el-form-item>
      <el-form-item class="enter-x">
        <el-button class="w-full" @click="handleBack">{{
          $t('sys.login.backSignIn')
        }}</el-button>
      </el-form-item>
    </el-form>
  </template>
</template>

<script lang="ts" setup>
import LoginTitle from './LoginTitle.vue'
import {
  LoginStateEnum,
  useFormRules,
  useFormValid,
  useLoginState
} from './useLogin'

const { getLoginState, handleBack } = useLoginState()

const getShow = computed(
  () => unref(getLoginState) === LoginStateEnum.RESET_PASSWORD
)

const { getFormRules } = useFormRules()

const formRef = ref()

const { validForm } = useFormValid(formRef)

const formData = reactive({
  account: null,
  mobile: null,
  code: null
})

async function handleLogin() {
  const data = await validForm()
  if (!data) return
}
</script>

<style lang="scss" scoped></style>
