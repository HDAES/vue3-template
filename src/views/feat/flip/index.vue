<template>
  <div>
    <el-card header="翻转卡片">
      <Flip ref="flipRef" />

      <el-button-group>
        <el-button type="primary" @click="flipDown">向下翻+1</el-button>
        <el-button type="primary" @click="flipUp">向上翻-1</el-button>
      </el-button-group>
    </el-card>
    <el-card>
      <FlipClock />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { Flip, FlipClock } from '@/components/Flip'
import { ref } from 'vue'
const flipRef = ref()

const flipDown = () => flipRef.value.flipDown(0, 1)
const flipUp = () => flipRef.value.flipUp()
</script>
