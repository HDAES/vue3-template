import { createApp } from 'vue'

import 'virtual:windi.css'
import 'virtual:svg-icons-register'

import { setupElementPlus } from '@/config/elemntPlus'
import { setupRouter } from '@/router'
import { SvgIcon } from '@/components/Icon/index'

import App from './App.vue'

async function bootstrap() {
  const app = createApp(App)

  setupElementPlus(app)

  setupRouter(app)
  app.component('SvgIcon', SvgIcon).mount('#app')
}

bootstrap()
