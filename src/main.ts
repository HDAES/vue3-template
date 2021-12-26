import { createApp } from 'vue'
import '@/styles/index.scss'
import 'virtual:windi.css'
import 'virtual:svg-icons-register'

import { setupElementPlus } from '@/config/elemntPlus'
import { setupRouter } from '@/router'
import { SvgIcon } from '@/components/Icon/index'

import App from './App.vue'
import { setupI18n } from '@/locales/setupI18n'

async function bootstrap() {
  const app = createApp(App)

  setupElementPlus(app)

  setupRouter(app)

  setupI18n(app)
  app.component('SvgIcon', SvgIcon).mount('#app')
}

bootstrap()
