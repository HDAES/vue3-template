<template>
  <template v-if="getShow">
    <LoginTitle />
    <el-form class="enter-x xl:w-90 mt-2">
      <el-form-item>
        <el-input :placeholder="$t('sys.login.placeholderMobile')" />
      </el-form-item>
      <el-form-item class="enter-x">
        <div class="flex">
          <el-input :placeholder="$t('sys.login.placeholderCode')" />
          <el-button
            style="margin-left: 15px"
            :disabled="status"
            @click="handleClick"
            >{{
              status
                ? $t('sys.login.sendText', [second])
                : $t('sys.login.smsCode')
            }}</el-button
          >
        </div>
      </el-form-item>
      <el-form-item class="enter-x">
        <el-button type="primary" size="medium" class="w-full">{{
          $t('sys.login.signInFormTitle')
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
import { computed, unref, ref, onUnmounted } from 'vue'
import { LoginStateEnum, useLoginState } from './useLogin'

const { getLoginState, handleBack } = useLoginState()

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.MOBILE)

const second = ref(59)
const status = ref(false)
const timer = ref()

const handleClick = () => {
  status.value = true
  timer.value = setInterval(() => {
    if (second.value > 0) {
      second.value--
    } else {
      status.value = false
      clearInterval(timer.value)
    }
  }, 1000)
}
onUnmounted(() => clearInterval(timer.value))
</script>
