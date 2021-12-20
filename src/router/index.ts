import { createWebHistory, RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import Layout from '@/layouts/default/index.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(),
  //history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes
})

export function setupRouter(app: App<Element>) {
  app.use(router)
}
