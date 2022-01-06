import { defineStore } from 'pinia'
import { useDark, useToggle } from '@vueuse/core'
import { useGlobalState } from '@/utils/storage'

const state = useGlobalState()
const isDark = useDark()

export const useSettingStore = defineStore({
  id: 'Setting',
  state: () => ({
    isDark: isDark,
    collapse: state.collapse.value,
    menuBackground: isDark.value ? '#1F1F1F' : state.menuBackground.value,
    isBreadcrumb: state.isBreadcrumb.value
  }),
  getters: {
    getCollapse(): Boolean {
      return this.collapse
    }
  },
  actions: {
    /**
     * 切换菜单栏
     */
    changeCollapse() {
      this.collapse = !this.collapse
      state.collapse.value = this.collapse
      return true
    },

    /**
     * 是否显示面包屑
     */
    changeIsBreadcrumb() {
      this.isBreadcrumb = !this.isBreadcrumb
      state.isBreadcrumb.value = this.isBreadcrumb
      return true
    },
    /**
     * 改变菜单栏背景颜色
     */
    changeMenuBackground(color: string) {
      this.menuBackground = color
    },
    /**
     * 切换暗黑模式
     */
    toggleDark() {
      this.changeMenuBackground(this.isDark ? '#001529' : '#1F1F1F')
      this.isDark = !this.isDark
      useToggle(useDark())()
    }
  }
})
