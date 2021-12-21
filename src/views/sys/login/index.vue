<template>
  <div class="login relative w-full h-full px-4">
    <DarkModeToggle class="absolute top-3 right-7 enter-x" />
  </div>
</template>

<script lang="ts" setup>
import DarkModeToggle from '@/components/DarkModeToggle/index.vue'
</script>

<style lang="scss" scoped>
.dark {
  .login {
    background-color: #293146;
    &::before {
      background-image: url(@/assets/svg/login-bg-dark.svg);
    }
  }
}
.login {
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin-left: -48%;
    background-image: url(@/assets/svg/login-bg.svg);
    background-position: 100%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    content: '';
    @media (max-width: $screen-xl) {
      background-image: url(@/assets/svg/login-bg-dark.svg);
    }
  }
}
</style>
