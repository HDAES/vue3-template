import {
  createGlobalState,
  RemovableRef,
  useStorage,
  useSessionStorage,
  StorageSerializers
} from '@vueuse/core'
import config from '@/config/config'

import { LockInfo } from 'types/store'

export interface GlobalState {
  language: RemovableRef<string>
  token: RemovableRef<string>
  rememberMe: RemovableRef<boolean>
  collapse: RemovableRef<boolean>
  menuBackground: RemovableRef<string>
  isBreadcrumb: RemovableRef<boolean>
  lockInfo: RemovableRef<Nullable<LockInfo>>
}

export interface GlobalValueState {
  language: string
  token: string
  rememberMe: boolean
  collapse: boolean
}

export const useGlobalState = createGlobalState((): GlobalState => {
  // 语言
  const language: RemovableRef<string> = useStorage(
    'vueuse-local-language',
    config.language
  )

  // 令牌
  const token: RemovableRef<string> = useStorage('vueuse-local-token', '')
  // 记住密码
  const rememberMe: RemovableRef<boolean> = useStorage(
    'vueuse-local-rememberMe',
    false
  )

  //折叠面板
  const collapse: RemovableRef<boolean> = useStorage(
    'vueuse-local-collapse',
    config.collapse
  )

  //背景颜色
  const menuBackground: RemovableRef<string> = useStorage(
    'vueuse-local-menuBackground',
    config.menuBackground
  )

  //面包屑
  const isBreadcrumb: RemovableRef<boolean> = useStorage(
    'vueuse-local-isBreadcrumb',
    config.isBreadcrumb
  )

  const lockInfo: RemovableRef<Nullable<LockInfo>> = useStorage(
    'vueuse-local-lockInfo',
    null,
    undefined,
    { serializer: StorageSerializers.object }
  )

  return {
    language,
    token,
    rememberMe,
    collapse,
    menuBackground,
    isBreadcrumb,
    lockInfo
  }
})

export const globalState = (): GlobalValueState => {
  let obj = {
    language: config.language,
    token: '',
    rememberMe: true,
    collapse: config.collapse
  }
  const state = useGlobalState()
  for (let key in state) {
    obj[key] = state[key].value
  }
  return obj
}

export const sessionToken = useSessionStorage('vueuse-session-token', '')

// 获取Token
export const getToken = () => {
  if (globalState().rememberMe) {
    return globalState().token
  } else {
    return sessionToken.value
  }
}

// 设置Token
export const setToken = (token: string) => {
  const state = useGlobalState()
  if (state.rememberMe.value) {
    state.token.value = token
  } else {
    sessionToken.value = token
  }
}

export const clearToken = () => {
  const state = useGlobalState()
  state.token.value = ''
  sessionToken.value = ''
}

export function useLockInfoStorage() {
  const { lockInfo } = useGlobalState()

  const clearLockInfo = () => (lockInfo.value = null)
  const setLockInfo = (value: LockInfo): void => {
    lockInfo.value = value
  }
  return {
    getLockInfo: lockInfo.value,
    clearLockInfo,
    setLockInfo
  }
}
