<template>
  <div class="flex flex-1">
    <el-input
      v-model="code"
      maxlength="4"
      :placeholder="$t('sys.login.placeholderImageCode')"
      @input="handleInput"
    />
    <img
      class="ml-4"
      style="height: 30px; cursor: pointer; width: 100px"
      :src="imageBase64"
      alt="verify"
      @click="handleRefresh"
    />
  </div>
</template>

<script lang="ts">
import { getVerifyCode } from '@/api/sys'
import { onMounted, ref, defineComponent } from 'vue'
export default defineComponent({
  setup(props, { emit }) {
    const imageBase64 = ref('')
    const code = ref('')
    onMounted(() => {
      getVerifyCode().then(res => {
        emit('update:verify', res.verify)
        imageBase64.value = 'data:image/jpg;base64,' + res.imageBase64
      })
    })
    /**
     * 刷新验证码
     */
    const handleRefresh = () => {
      getVerifyCode().then(res => {
        emit('update:verify', res.verify)
        code.value = ''
        emit('update:code', '')
        imageBase64.value = 'data:image/jpg;base64,' + res.imageBase64
      })
    }

    const handleInput = val => {
      emit('update:code', val)
    }
    return {
      code,
      imageBase64,
      handleInput,
      handleRefresh
    }
  }
})
</script>

<style lang="scss" scoped></style>
