import { defineStore } from 'pinia'
import { useGlobalState } from '@/utils/storage'

const state = useGlobalState()

export const useSettingStore = defineStore({
  id: 'Setting',
  state: () => ({
    collapse: state.collapse.value
  }),
  actions: {
    changeCollapse() {
      this.collapse = !this.collapse
      state.collapse.value = this.collapse
    }
  }
})
