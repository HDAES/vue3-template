<template>
  <div class="FlipClock">
    <Flip ref="flipperHour1" />
    <Flip ref="flipperHour2" style="margin-left: 5px" />
    <em>:</em>
    <Flip ref="flipperMinute1" />
    <Flip ref="flipperMinute2" style="margin-left: 5px" />
    <em>:</em>
    <Flip ref="flipperSecond1" />
    <Flip ref="flipperSecond2" style="margin-left: 5px" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import Flip from './flip.vue'
import { formatDate } from './Flipper'
const flipObjs = ref<any[]>([])
const timer = ref()
const flipperHour1 = ref()
const flipperHour2 = ref()
const flipperMinute1 = ref()
const flipperMinute2 = ref()
const flipperSecond1 = ref()
const flipperSecond2 = ref()

const init = () => {
  let now = new Date()
  let nowTimeStr = formatDate(new Date(now.getTime()), 'hhiiss')
  for (let i = 0; i < flipObjs.value.length; i++) {
    flipObjs.value[i].setFront(nowTimeStr[i])
  }
}

const run = () => {
  timer.value = setInterval(() => {
    let now = new Date()
    let nowTimeStr = formatDate(new Date(now.getTime() - 1000), 'hhiiss')
    let nextTimeStr = formatDate(now, 'hhiiss')
    for (let i = 0; i < flipObjs.value.length; i++) {
      if (nowTimeStr[i] === nextTimeStr[i]) {
        continue
      }
      flipObjs.value[i].flipDown(nowTimeStr[i], nextTimeStr[i])
    }
  }, 1000)
}
onMounted(() => {
  flipObjs.value = [
    flipperHour1.value,
    flipperHour2.value,
    flipperMinute1.value,
    flipperMinute2.value,
    flipperSecond1.value,
    flipperSecond2.value
  ]

  flipObjs.value.forEach(item => {
    item._textStyle({
      width: '150px',
      height: '250px',
      lineHeight: '250px',
      fontSize: '120px'
    })
  })

  init()
  run()
})

onUnmounted(() => {
  clearInterval(timer.value)
})
</script>

<style lang="scss" scoped>
.FlipClock {
  text-align: center;
  em {
    display: inline-block;
    font-size: 120px;
    line-height: 250px;
    font-style: normal;
    vertical-align: top;
  }
}
</style>
