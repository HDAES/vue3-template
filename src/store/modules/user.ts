import { defineStore } from 'pinia'
import { UserState } from 'types/store'

import { useGlobalState } from '@/utils/storage'
import { LoginData, postLogin } from '@/api/mock/sys'

const state = useGlobalState()

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    token: state.token.value,
    realName: ''
  }),
  getters: {},
  actions: {
    setToken(token: string): void {
      this.token = token
      state.token.value = token
    },
    setRealName(realName: string): void {
      this.realName = realName
    },
    async login(loginData: LoginData) {
      try {
        const { token, realName } = await postLogin(loginData)
        this.setToken(token)
        this.setRealName(realName)
        return true
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
})
