import { createApp } from 'vue'

import 'virtual:windi.css'
import 'virtual:svg-icons-register'

import '@/styles/index.scss'
import 'echarts-liquidfill'

import { setupRouter } from '@/router'

import App from './App.vue'
import { setupI18n } from '@/locales/setupI18n'
import { useGlobalState } from '@/utils/storage'
import { setupStore } from '@/store'
import { registerGlobComp } from '@/components/registerGlobComp'
import { setupHasRole } from '@/utils/hasPermission'
import '@/permission'

async function bootstrap() {
  const app = createApp(App)

  registerGlobComp(app)

  setupRouter(app)

  setupI18n(app)

  useGlobalState()

  setupStore(app)

  setupHasRole(app)

  app.mount('#app')
}

bootstrap()
