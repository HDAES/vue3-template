<template>
  <div ref="flipRef" class="flip down">
    <!-- 位于前面的纸牌 -->
    <div ref="frontRef" class="digital front" :class="'number' + count"></div>
    <!-- 位于后面的纸牌 -->
    <div
      ref="backRef"
      class="digital back"
      :class="'number' + [count < 9 ? count + 1 : '0']"
    ></div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, PropType, onMounted } from 'vue'
export default defineComponent({
  props: {
    defaultNumber: {
      type: Number as PropType<number>,
      default: 0
    }
  },
  setup(props) {
    const frontRef = ref()
    const backRef = ref()
    const flipRef = ref()
    // 当前数字

    const count = ref<number>(0)
    // 是否正在翻转（防止翻转未结束就进行下一次翻转）
    const isFlipping = ref(false)

    const flipDown = () => {
      if (isFlipping.value) {
        return false
      }

      frontRef.value.setAttribute('class', 'digital front number' + count.value)

      // 计算后牌文字（越界判断）
      let nextCount = count.value >= 9 ? 0 : count.value + 1
      backRef.value.setAttribute('class', 'digital back number' + nextCount)

      flipRef.value.setAttribute('class', 'flip down go')

      isFlipping.value = true
      setTimeout(function () {
        // 去掉go
        flipRef.value.setAttribute('class', 'flip down')
        // 将翻转态设置为false
        isFlipping.value = false
        // 设置前牌文字为+1后的数字
        frontRef.value.setAttribute('class', 'digital front number' + nextCount)
        // 更新当前文字
        count.value = nextCount
      }, 1000)
    }

    const flipUp = () => {
      if (isFlipping.value) {
        return false
      }

      frontRef.value.setAttribute('class', 'digital front number' + count.value)

      // 计算后牌文字（越界判断）
      let nextCount = count.value <= 0 ? 9 : count.value - 1
      backRef.value.setAttribute('class', 'digital back number' + nextCount)

      flipRef.value.setAttribute('class', 'flip up go')

      isFlipping.value = true
      setTimeout(function () {
        // 去掉go
        flipRef.value.setAttribute('class', 'flip up')
        // 将翻转态设置为false
        isFlipping.value = false
        // 设置前牌文字为+1后的数字
        frontRef.value.setAttribute('class', 'digital front number' + nextCount)
        // 更新当前文字
        count.value = nextCount
      }, 1000)
    }

    onMounted(() => {
      count.value = props.defaultNumber
    })
    return {
      frontRef,
      backRef,
      flipRef,
      count,
      isFlipping,
      flipDown,
      flipUp
    }
  }
})
</script>

<style lang="scss" scoped>
.flip {
  display: inline-block;
  position: relative;
  width: 60px;
  height: 100px;
  line-height: 100px;
  border: solid 1px #000;
  border-radius: 10px;
  background: #fff;
  font-size: 66px;
  color: #fff;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  text-align: center;
  font-family: 'Helvetica Neue';

  .digital:before,
  .digital:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    background: #000;
    overflow: hidden;
    box-sizing: border-box;
  }

  .digital:before {
    top: 0;
    bottom: 50%;
    border-radius: 10px 10px 0 0;
    border-bottom: solid 1px #666;
  }

  .digital:after {
    top: 50%;
    bottom: 0;
    border-radius: 0 0 10px 10px;
    line-height: 0;
  }

  .number0:before,
  .number0:after {
    content: '0';
  }
  .number1:before,
  .number1:after {
    content: '1';
  }
  .number2:before,
  .number2:after {
    content: '2';
  }
  .number3:before,
  .number3:after {
    content: '3';
  }

  .number4:before,
  .number4:after {
    content: '4';
  }
  .number5:before,
  .number5:after {
    content: '5';
  }

  .number6:before,
  .number6:after {
    content: '6';
  }
  .number7:before,
  .number7:after {
    content: '7';
  }
  .number8:before,
  .number8:after {
    content: '8';
  }
  .number9:before,
  .number9:after {
    content: '9';
  }
}

/*向下翻*/
.down .front:before {
  z-index: 3;
}

.down .back:after {
  z-index: 2;
  transform-origin: 50% 0%;
  transform: perspective(160px) rotateX(180deg);
}

.flip.down .front:after,
.flip.down .back:before {
  z-index: 1;
}

/*向上翻*/
.flip.up .front:after {
  z-index: 3;
}

.flip.up .back:before {
  z-index: 2;
  transform-origin: 50% 100%;
  transform: perspective(160px) rotateX(-180deg);
}

.flip.up .front:before,
.flip.up .back:after {
  z-index: 1;
}

.flip.down.go .front:before {
  transform-origin: 50% 100%;
  animation: frontFlipDown 0.6s ease-in-out both;
  box-shadow: 0 -2px 6px rgba(255, 255, 255, 0.3);
  backface-visibility: hidden;
}

.flip.down.go .back:after {
  animation: backFlipDown 0.6s ease-in-out both;
}

@keyframes frontFlipDown {
  0% {
    transform: perspective(160px) rotateX(0deg);
  }

  100% {
    transform: perspective(160px) rotateX(-180deg);
  }
}

@keyframes backFlipDown {
  0% {
    transform: perspective(160px) rotateX(180deg);
  }

  100% {
    transform: perspective(160px) rotateX(0deg);
  }
}

.flip.up.go .front:after {
  transform-origin: 50% 0;
  animation: frontFlipUp 0.6s ease-in-out both;
  box-shadow: 0 2px 6px rgba(255, 255, 255, 0.3);
  backface-visibility: hidden;
}

.flip.up.go .back:before {
  animation: backFlipUp 0.6s ease-in-out both;
}
@keyframes frontFlipUp {
  0% {
    transform: perspective(160px) rotateX(0deg);
  }

  100% {
    transform: perspective(160px) rotateX(180deg);
  }
}

@keyframes backFlipUp {
  0% {
    transform: perspective(160px) rotateX(-180deg);
  }

  100% {
    transform: perspective(160px) rotateX(0deg);
  }
}
</style>
