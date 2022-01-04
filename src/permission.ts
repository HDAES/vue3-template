import { router } from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { RouteRecordRaw } from 'vue-router'
import { globalState } from '@/utils/storage'
import { useUserStore } from '@/store/modules/user'

NProgress.configure({ showSpinner: false })

const whiteList: string[] = ['/login']

const { token } = globalState()

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (token) {
    const userStore = useUserStore()
    if (userStore.roles.length == 0) {
      userStore.userInfo().then(res => {
        console.log('12312')
      })
    }
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
