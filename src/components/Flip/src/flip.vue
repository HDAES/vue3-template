<template>
  <div class="flip" :class="[flipType, { go: isFlipping }]" :style="textStyle">
    <!-- 位于前面的纸牌 -->
    <div class="digital front" :class="textClass(frontTextFromData)"></div>
    <!-- 位于后面的纸牌 -->
    <div class="digital back" :class="textClass(backTextFromData)"></div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'flip',
  props: {
    // 前牌文字
    frontText: {
      type: Number,
      default: 0
    },
    // 后牌文字
    backText: {
      type: Number,
      default: 1
    },
    // 翻牌动画时间，与CSS中设置的animation-duration保持一致
    duration: {
      type: Number,
      default: 600
    }
  },
  setup(props) {
    const isFlipping = ref<boolean>(false)
    const frontTextFromData = ref<number>(props.frontText)
    const backTextFromData = ref<number>(props.backText)
    const flipType = ref<String>('down')
    const textStyle = ref({
      width: '60px',
      height: '100px',
      lineHeight: '100px',
      fontSize: '66px'
    })

    const _textStyle = style => {
      textStyle.value = {
        ...textStyle.value,
        ...style
      }
    }

    const textClass = number => {
      return 'number' + number
    }

    const _flip = (type, front, back) => {
      // 如果处于翻转中，则不执行
      if (isFlipping.value) {
        return false
      }

      frontTextFromData.value = front
      backTextFromData.value = back
      // 根据传递过来的type设置翻转方向
      flipType.value = type
      // 设置翻转状态为true
      isFlipping.value = true
      setTimeout(() => {
        // 设置翻转状态为false
        isFlipping.value = false
        frontTextFromData.value = back
      }, props.duration)
    }

    // 下翻牌
    const flipDown = (front, back) => {
      _flip('down', front, back)
    }
    // 上翻牌
    const flipUp = (front, back) => {
      _flip('up', front, back)
    }

    // 设置前牌文字
    const setFront = text => {
      frontTextFromData.value = text
    }
    // 设置后牌文字
    const setBack = text => {
      backTextFromData.value = text
    }

    return {
      textStyle,
      flipDown,
      flipUp,
      textClass,
      setFront,
      setBack,
      flipType,
      isFlipping,
      frontTextFromData,
      backTextFromData
    }
  }
})
</script>

<style lang="scss" scoped>
.flip {
  display: inline-block;
  position: relative;
  border: solid 1px #000;
  border-radius: 10px;
  color: #cccccc;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  text-align: center;
  font-family: 'Helvetica Neue';

  .digital:before,
  .digital:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    background: #333;
    overflow: hidden;
    box-sizing: border-box;
  }

  .digital:before {
    top: 0;
    bottom: 50%;
    border-radius: 10px 10px 0 0;
    border-bottom: solid 1px #111;
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
  transform: perspective(500px) rotateX(180deg);
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
  transform: perspective(500px) rotateX(-180deg);
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
    transform: perspective(500px) rotateX(0deg);
  }

  100% {
    transform: perspective(500px) rotateX(-180deg);
  }
}

@keyframes backFlipDown {
  0% {
    transform: perspective(500px) rotateX(180deg);
  }

  100% {
    transform: perspective(500px) rotateX(0deg);
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
    transform: perspective(500px) rotateX(0deg);
  }

  100% {
    transform: perspective(500px) rotateX(180deg);
  }
}

@keyframes backFlipUp {
  0% {
    transform: perspective(500px) rotateX(-180deg);
  }

  100% {
    transform: perspective(500px) rotateX(0deg);
  }
}
</style>
