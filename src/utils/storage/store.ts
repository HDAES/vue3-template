import { createGlobalState, RemovableRef, useStorage } from '@vueuse/core'
import config from '@/config/config'

export interface GlobalState {
  language: RemovableRef<string>
}

export const useGlobalState = createGlobalState((): GlobalState => {
  const language = useStorage('vueuse-local-language', '')
  if (language.value == 'undefined') {
    language.value = config.language
  }

  return {
    language
  }
})
