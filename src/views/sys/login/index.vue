<template>
  <div class="login relative w-full h-full px-4">
    <DarkModeToggle class="absolute top-3 right-7 enter-x" />

    <div class="container relative h-full py-20 mx-auto sm:px-10">
      <div class="flex h-full">
        <div class="hidden min-h-full pl-4 mr-4 xl:flex xl:flex-col xl:w-6/12">
          <div class="logo -enter-x">
            <div class="text-light-50 text-4xl">admin</div>
          </div>
          <div class="mt-auto mb-auto">
            <img
              class="w-1/2 -enter-x"
              src="@/assets/svg/login-box-bg.svg"
              alt=""
            />

            <div class="mt-10 font-medium text-white -enter-x">
              <span class="inline-block mt-4 text-3xl">后台管理系统</span>
            </div>

            <div
              class="mt-5 font-normal text-white text-md dark:text-gray-500 -enter-x"
            >
              输入您的个人详细信息开始使用！
            </div>
          </div>
        </div>
        <div
          class="flex w-full h-full py-5 xl:h-auto xl:py-0 xl:my-0 xl:w-6/12"
        >
          <div
            class="relative login-form w-full px-5 py-8 mx-auto my-auto rounded-md shadow-md xl:ml-16 xl:bg-transparent sm:px-8 xl:p-4 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto enter-x"
          >
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DarkModeToggle from '@/components/DarkModeToggle/index.vue'
import LoginForm from './LoginForm.vue'
</script>

<style lang="scss" scoped>
.dark {
  .login {
    background-color: #293146;
    &::before {
      background-image: url(@/assets/svg/login-bg-dark.svg);
    }
    .login-form {
      background-color: #293146;
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
  .login-form {
    background-color: #fff;
  }
}
</style>
