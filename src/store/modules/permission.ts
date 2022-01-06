import { defineStore } from 'pinia'
import { getPermissionTree } from '@/api/sys/index'
import Layout from '@/layouts/default/index.vue'
import { SidebarItem } from 'types/store'
const modules = import.meta.glob('../../views/**/index.vue')

interface PermissionState {
  sidebarRouters: SidebarItem[]
}

export const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    sidebarRouters: []
  }),
  actions: {
    setSidebarRouters(sidebarRouters: SidebarItem[]) {
      // 顶部导航菜单默认添加统计报表栏指向首页
      this.sidebarRouters = sidebarRouters
    },
    GenerateRoutes() {
      return new Promise<any[]>(resolve => {
        getPermissionTree().then(res => {
          const sdata = JSON.parse(JSON.stringify(res))
          const rdata = JSON.parse(JSON.stringify(res))
          const myRoutes: any[] = filterAsyncRouter(sdata, false, true)
          const sidebarRoutes = filterAsyncRouter(rdata)
          this.setSidebarRouters(sidebarRoutes)
          resolve(myRoutes)
        })
      })
    }
  }
})

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(
  asyncRouterMap: Array<any>,
  lastRouter = false,
  type = false
) {
  return asyncRouterMap.filter(route => {
    // if (type && route.children ) {
    //   route.children = filterChildren(route.children)
    // }
    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else if (route.component === 'ParentView') {
      } else {
        route.component = loadView(route.component)
      }
    }

    if (
      route.children != null &&
      route.children &&
      route.children.length &&
      route.type == 0
    ) {
      route.children = filterAsyncRouter(route.children, route, type)
    } else {
      delete route['children']
      delete route['redirect']
    }

    return true
  })
}

export const loadView = (view: any) => {
  // 路由懒加载
  return modules[`../../views/${view}/index.vue`]
}
