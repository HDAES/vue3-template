import { router } from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { RouteRecordRaw } from 'vue-router'
import { getToken } from '@/utils/storage'
import { useUserStore } from '@/store/modules/user'
import { usePermissionStore } from '@/store/modules/permission'

NProgress.configure({ showSpinner: false })

const whiteList: string[] = ['/login']

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login' || to.path === '/') {
      next({ path: '/dashboard/analysis' })
    } else {
      const userStore = useUserStore()
      if (userStore.roles.length == 0) {
        try {
          const permissionStore = usePermissionStore()
          userStore.info().then(res => {
            permissionStore.GenerateRoutes().then(accessRoutes => {
              accessRoutes.forEach((route: RouteRecordRaw) => {
                router.addRoute(route)
              })
              next({ ...to, replace: true })
              router.addRoute({
                path: '/:pathMatch(.*)*',
                name: 'NotFound',
                component: () => import('@/views/notFound.vue')
              })
            })
          })
        } catch (error) {
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
