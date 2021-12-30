import { createGlobalState, RemovableRef, useStorage } from '@vueuse/core'
import config from '@/config/config'

export interface GlobalState {
  language: RemovableRef<string>
  token: RemovableRef<string>
}

export const useGlobalState = createGlobalState((): GlobalState => {
  const language: RemovableRef<string> = useStorage(
    'vueuse-local-language',
    config.language
  )

  const token: RemovableRef<string> = useStorage('vueuse-local-token', '')
  return {
    language,
    token
  }
})
