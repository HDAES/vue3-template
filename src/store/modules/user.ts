import { defineStore } from 'pinia'
import { rolesState, UserState } from 'types/store'

import { useGlobalState } from '@/utils/storage'
import { postLogin } from '@/api/sys'
import { LoginData } from '@/api/sys/types'

const state = useGlobalState()

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    token: state.token.value,
    realName: '',
    roles: []
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
    setRoles(roles: rolesState[]): void {
      this.roles = roles
    },
    async login(loginData: LoginData) {
      try {
        const { token, realName, roles } = await postLogin(loginData)
        this.setToken(token)
        this.setRealName(realName)
        this.setRoles(roles)
        return true
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
})
