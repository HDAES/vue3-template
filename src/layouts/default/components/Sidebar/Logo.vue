<template>
  <div class="flex items-center text-light-50 px-4 logo">
    <img src="/assets/logo.png" alt="" style="width: 30px" />
    <div class="ml-4 title" :class="collapse ? 'none-title' : 'active-title'">
      admin
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSetting } from '@/hooks/setting/index'
const { collapse } = useSetting()
</script>

<style lang="scss" scoped>
.logo {
  height: 64px;
  overflow: hidden;
  .title {
    width: 100px;
    overflow: hidden;
    transition: all 0.5s;
  }

  .none-title {
    animation: myfirst 0.5s;
    width: 0;
  }

  @keyframes myfirst {
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
}
</style>
