import type { App } from 'vue'
// 引入监听是否进入视口
import { useIntersectionObserver } from '@vueuse/core'
export function setupDirectives(app: App<Element>) {
  app.directive('lazyImg', {
    mounted(el, binding) {
      const { stop } = useIntersectionObserver(
        el,
        ([{ isIntersecting }], observerElement) => {
          if (isIntersecting) {
            // ◆图片加载失败显示默认图片
            el.onerror = function () {
              el.src = ''
            }
            // ◆这里显示传过来的图片数据
            el.src = binding.value
            stop() // 中止监听
          }
        }
      )
    }
  })
}
