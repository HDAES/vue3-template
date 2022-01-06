import { useSettingStore } from '@/store/modules/setting'
import { computed } from 'vue'

export const useSetting = () => {
  const settingStore = useSettingStore()

  const isDark = computed(() => settingStore.isDark)

  const toggleDark = () => settingStore.toggleDark()

  const collapse = computed(() => settingStore.getCollapse)

  const changeCollapse = () => settingStore.changeCollapse()

  const isBreadcrumb = computed(() => settingStore.isBreadcrumb)

  const changeIsBreadcrumb = () => settingStore.changeIsBreadcrumb()

  return {
    isDark,
    collapse,
    isBreadcrumb,
    toggleDark,
    changeCollapse,
    changeIsBreadcrumb
  }
}
