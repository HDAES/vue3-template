<template>
  <el-input
    v-model="password"
    :placeholder="$t('sys.login.placeholderPassword')"
    show-password
  />
  <div class="strength-bar">
    <div class="strength-bar--fill" :data-score="getStrengthPassword"></div>
  </div>
</template>

<script lang="ts" setup>
import { onUnmounted } from 'vue'
import { useStrengthPassword } from './useStrengthPassword'

const { password, getStrengthPassword, initPassword } = useStrengthPassword()
onUnmounted(() => initPassword())
</script>

<style lang="scss" scoped>
.strength-bar {
  position: relative;
  height: 6px;
  margin: 20px auto 6px;
  background-color: var(--el-text-color-secondary);
  border-radius: 6px;
  &::before,
  &::after {
    position: absolute;
    z-index: 10;
    display: block;
    width: 20%;
    height: inherit;
    background-color: transparent;
    border-color: #fff;
    border-style: solid;
    border-width: 0 5px;
    content: '';
  }
  &::before {
    left: 20%;
  }
  &::after {
    right: 20%;
  }
  &--fill {
    position: absolute;
    width: 0;
    height: inherit;
    background-color: transparent;
    border-radius: inherit;
    transition: width 0.5s ease-in-out, background 0.25s;
    &[data-score='0'] {
      width: 20%;
      background-color: var(--el-color-danger);
      opacity: 0.5;
    }
    &[data-score='1'] {
      width: 40%;
      background-color: var(--el-color-danger);
    }
    &[data-score='2'] {
      width: 60%;
      background-color: var(--el-color-warning);
    }
    &[data-score='3'] {
      width: 80%;
      background-color: var(--el-color-primary);
    }
    &[data-score='4'] {
      width: 100%;
      background-color: var(--el-color-success);
    }
  }
}
</style>
