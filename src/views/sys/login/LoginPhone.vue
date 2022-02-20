<template>
  <template v-if="getShow">
    <LoginTitle />
    <el-form
      class="enter-x xl:w-90 mt-2"
      :model="formData"
      :rules="getFormRules"
      ref="formRef"
    >
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
          $t('sys.login.signInFormTitle')
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
  useLoginState,
  useFormRules,
  useFormValid
} from './useLogin'
const { getLoginState, handleBack } = useLoginState()
const getShow = computed(() => unref(getLoginState) === LoginStateEnum.MOBILE)

const formRef = ref()

const { getFormRules } = useFormRules()

const formData = reactive({
  mobile: '',
  code: ''
})

const { validForm } = useFormValid(formRef)

async function handleLogin() {
  const data = await validForm()
  if (!data) return
  console.log(data)
}
</script>
