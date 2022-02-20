import type { App } from 'vue'

import { useGlobalState } from '@/utils/storage'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  TranslationOutlined,
  SearchOutlined,
  GithubFilled,
  WechatFilled,
  AlipayCircleFilled,
  GoogleCircleFilled,
  TwitterCircleFilled
} from '@ant-design/icons-vue'

export const antComps = [
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  TranslationOutlined,
  SearchOutlined,
  GithubFilled,
  WechatFilled,
  AlipayCircleFilled,
  GoogleCircleFilled,
  TwitterCircleFilled
]
import { ChatLineRound, Setting, Dessert, Coin } from '@element-plus/icons-vue'

export const elementComps = [ChatLineRound, Setting, Dessert, Coin]

export function registerGlobComp(app: App) {
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
