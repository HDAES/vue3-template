import type { App } from 'vue'
import { SvgIcon, Icon } from './Icon/index'
import { useGlobalState } from '@/utils/storage'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  TranslationOutlined,
  SearchOutlined
} from '@ant-design/icons-vue'

import { ChatLineRound, Setting, Dessert } from '@element-plus/icons-vue'

export const elementComps = [ChatLineRound, Setting, Dessert]

export const antComps = [
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  TranslationOutlined,
  SearchOutlined
]

export function registerGlobComp(app: App) {
  app.use(SvgIcon).use(Icon)

  let nameList: string[] = []

  antComps.map(item => {
    app.component(item.displayName, item)
    nameList.push(item.displayName)
  })

  elementComps.map(item => {
    app.component(item.name, item)
    nameList.push(item.name)
  })
  const { iconNames } = useGlobalState()
  iconNames.value = nameList
}
