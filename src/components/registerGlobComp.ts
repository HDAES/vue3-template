import type { App } from 'vue'
import { HeroIcon, SvgIcon } from './Icon/index'
import {
  ArrowsExpandIcon,
  TranslateIcon,
  ChatIcon,
  SearchIcon,
  CogIcon,
  ViewGridAddIcon
} from '@heroicons/vue/outline'

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'

export const comp = [
  ArrowsExpandIcon,
  TranslateIcon,
  ChatIcon,
  SearchIcon,
  CogIcon,
  MenuFoldOutlined,
  MenuUnfoldOutlined
]

export function registerGlobComp(app: App) {
  app.component('ArrowsExpandIcon', ArrowsExpandIcon)
  app.component('TranslateIcon', TranslateIcon)
  app.component('ChatIcon', ChatIcon)
  app.component('CogIcon', CogIcon)
  app.component('SearchIcon', SearchIcon)
  app.component('ViewGridAddIcon', ViewGridAddIcon)

  app.component('MenuFoldOutlined', MenuFoldOutlined)
  app.component('MenuUnfoldOutlined', MenuUnfoldOutlined)

  app.use(HeroIcon).use(SvgIcon)
}
