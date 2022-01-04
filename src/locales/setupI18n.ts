import type { App } from 'vue'
import type { I18n, I18nOptions } from 'vue-i18n'
import { globalState } from '@/utils/storage'

import { createI18n } from 'vue-i18n'

export let i18n: ReturnType<typeof createI18n>

const { language } = globalState()
const locale = language

async function createI18nOptions(): Promise<I18nOptions> {
  const defaultLocal = await import(`./lang/${locale}.ts`)

  const message = defaultLocal.default?.message ?? {}

  return {
    locale,
    fallbackLocale: 'zh-CN',
    formatFallbackMessages: true,
    messages: {
      [language]: message
    }
  }
}

export async function setupI18n(app: App) {
  const options = await createI18nOptions()
  i18n = createI18n(options) as I18n
  app.use(i18n)
}
