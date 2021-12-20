import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:windi.css'
import { setupElementPlus } from '@/config/elemntPlus'
import { setupRouter } from '@/router'

async function bootstrap() {
  const app = createApp(App)

  setupElementPlus(app)

  setupRouter(app)
  app.mount('#app')
}

bootstrap()
