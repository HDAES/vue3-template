<template>
  <div class="clock" id="clock">
    <div class="flip down">
      <div class="digital front number0"></div>
      <div class="digital back number1"></div>
    </div>
    <div class="flip down">
      <div class="digital front number0"></div>
      <div class="digital back number1"></div>
    </div>
    <em>:</em>
    <div class="flip down">
      <div class="digital front number0"></div>
      <div class="digital back number1"></div>
    </div>
    <div class="flip down">
      <div class="digital front number0"></div>
      <div class="digital back number1"></div>
    </div>
    <em>:</em>
    <div class="flip down">
      <div class="digital front number0"></div>
      <div class="digital back number1"></div>
    </div>
    <div class="flip down">
      <div class="digital front number0"></div>
      <div class="digital back number1"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { Flipper, formatDate } from './Flipper'
export default defineComponent({
  setup() {
    onMounted(() => {
      let clock = document.getElementById('clock')
      // 定位6个翻板
      let flips = clock?.querySelectorAll('.flip')
      // 获取当前时间
      let now = new Date()
      // 格式化当前时间，例如现在是20:30:10，则输出"203010"字符串
      let nowTimeStr = formatDate(now, 'hhiiss')
      // 格式化下一秒的时间
      let nextTimeStr = formatDate(new Date(now.getTime() + 1000), 'hhiiss')
      // 定义牌板数组，用来存储6个Flipper翻板对象
      let flipObjs = []
      if (flips)
        for (let i = 0; i < flips.length; i++) {
          // 创建6个Flipper实例，初始化并存入flipObjs
          flipObjs.push(
            new Flipper({
              // 每个Flipper实例按数组顺序与翻板DOM的顺序一一对应
              node: flips[i],
              // 按数组顺序取时间字符串对应位置的数字
              frontText: 'number' + nowTimeStr[i],
              backText: 'number' + nextTimeStr[i]
            })
          )
        }

      setInterval(function () {
        // 获取当前时间
        let now = new Date()
        // 格式化当前时间
        let nowTimeStr = formatDate(new Date(now.getTime() - 1000), 'hhiiss')
        // 格式化下一秒时间
        let nextTimeStr = formatDate(now, 'hhiiss')
        // 将当前时间和下一秒时间逐位对比
        for (let i = 0; i < flipObjs.length; i++) {
          // 如果前后数字没有变化，则直接跳过，不翻牌
          if (nowTimeStr[i] === nextTimeStr[i]) {
            continue
          }
          // 传递前后牌的数字，进行向下翻牌动画
          flipObjs[i].flipDown(
            'number' + nowTimeStr[i],
            'number' + nextTimeStr[i]
          )
        }
      }, 1000)
    })
  }
})
</script>

<style lang="scss" scoped>
.clock {
  text-align: center;
  em {
    display: inline-block;
    line-height: 102px;
    font-size: 66px;
    font-style: normal;
    vertical-align: top;
  }
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
}
</style>
