import { router } from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { RouteRecordRaw } from 'vue-router'
import { useGlobalState } from '@/utils/storage'

NProgress.configure({ showSpinner: false })

const whiteList: string[] = ['/login']

const state = useGlobalState()

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (state.token.value) {
    next()
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
