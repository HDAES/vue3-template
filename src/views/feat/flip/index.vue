<template>
  <div>
    <el-card header="翻转卡片">
      <Flip ref="flipRef" />
      <el-button-group>
        <el-button type="primary" @click="flipDown">向下翻+1</el-button>
        <el-button type="primary" @click="flipUp">向上翻-1</el-button>
      </el-button-group>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { Flip } from '@/components/Flip'
import { onMounted, ref } from 'vue'
const flipRef = ref()
const conut = ref(0)

const flipDown = () => {
  if (conut.value < 9) {
    flipRef.value.flipDown(conut.value, conut.value + 1)
    conut.value = conut.value + 1
  } else {
    flipRef.value.flipDown(conut.value, 0)
    conut.value = 0
  }
}
const flipUp = () => {
  if (conut.value > 0) {
    flipRef.value.flipUp(conut.value, conut.value - 1)
    conut.value = conut.value - 1
  } else {
    flipRef.value.flipUp(conut.value, 9)
    conut.value = 9
  }
}

onMounted(() => {
  flipRef.value.setFront(conut.value)
  flipRef.value.setBack(conut.value + 1)
})
</script>
