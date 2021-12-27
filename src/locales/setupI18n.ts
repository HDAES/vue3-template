import type { App } from 'vue'
import type { I18n, I18nOptions } from 'vue-i18n'
import { useGlobalState } from '@/utils/storage/store'

import { createI18n } from 'vue-i18n'

export let i18n: ReturnType<typeof createI18n>

const state = useGlobalState()
const locale = state.language.value

async function createI18nOptions(): Promise<I18nOptions> {
  const defaultLocal = await import(`./lang/${locale}.ts`)

  const message = defaultLocal.default?.message ?? {}

  return {
    locale,
    fallbackLocale: 'zh-CN',
    formatFallbackMessages: true,
    messages: {
      [locale]: message
    }
  }
}

export async function setupI18n(app: App) {
  const options = await createI18nOptions()
  i18n = createI18n(options) as I18n
  app.use(i18n)
}
