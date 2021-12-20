import { App } from 'vue'

/**
 * 配置elementPlus
 * @param app
 */
export function setupElementPlus(app: App<Element>) {
  app.config.globalProperties.$ELEMENT = { size: 'small', zIndex: 3000 }
}
