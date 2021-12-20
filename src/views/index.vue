<template>
  <el-button @click="toggleDark()">点击</el-button>

  <button class="btn btn-info btn-sm">info</button>
  <button class="btn btn-success btn-sm">success</button>
  <button class="btn btn-warning btn-sm">warning</button>
  <button class="btn btn-error btn-sm">error</button>

  <div class="py-4 artboard artboard-demo bg-base-200">
    <ul class="menu p-4 shadow-lg bg-base-100 rounded-box">
      <li class="menu-title">
        <span> Menu Title </span>
      </li>
      <li>
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-5 h-5 mr-2 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            ></path>
          </svg>
          Item with icon
        </a>
      </li>
      <li>
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-5 h-5 mr-2 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            ></path>
          </svg>
          Item with icon
        </a>
      </li>
      <li>
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-5 h-5 mr-2 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
            ></path>
          </svg>
          Item with icon
        </a>
      </li>
    </ul>
  </div>
  <BeakerIcon class="h-5 w-5 text-blue-500 dark:text-light-200" />
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { BeakerIcon } from '@heroicons/vue/solid'
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()

const toggleDark = useToggle(isDark)
</script>

<style lang="scss" scoped></style>
