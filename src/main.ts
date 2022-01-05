import { createApp } from 'vue'
import '@/styles/index.scss'
import 'virtual:windi.css'
import 'virtual:svg-icons-register'

import { setupElementPlus } from '@/config/elemntPlus'
import { setupRouter } from '@/router'

import App from './App.vue'
import { setupI18n } from '@/locales/setupI18n'
import { useGlobalState } from '@/utils/storage'
import { setupStore } from '@/store'
import { registerGlobComp } from '@/components/registerGlobComp'

import '@/permission'

async function bootstrap() {
  const app = createApp(App)

  registerGlobComp(app)

  setupElementPlus(app)

  setupRouter(app)

  setupI18n(app)

  useGlobalState()

  setupStore(app)

  app.mount('#app')
}

bootstrap()
