import type { App } from 'vue'
import { HeroIcon, SvgIcon } from './Icon/index'
import {
  ArrowsExpandIcon,
  TranslateIcon,
  ChatIcon,
  SearchIcon
} from '@heroicons/vue/outline'

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'

export function registerGlobComp(app: App) {
  app.component('ArrowsExpandIcon', ArrowsExpandIcon)
  app.component('TranslateIcon', TranslateIcon)
  app.component('ChatIcon', ChatIcon)
  app.component('SearchIcon', SearchIcon)
  app.component('MenuFoldOutlined', MenuFoldOutlined)
  app.component('MenuUnfoldOutlined', MenuUnfoldOutlined)

  app.use(HeroIcon).use(SvgIcon)
}
