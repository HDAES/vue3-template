import { defineStore } from 'pinia'
import { UserState } from 'types/store'
import { setToken, getToken } from '@/utils/storage'
import { encryptByMd5 } from '@/utils/crypto'
import { postLogin, getInfo } from '@/api/sys'
import { LoginData } from '@/api/sys/types'

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    token: getToken(),
    realName: '',
    roles: []
  }),
  getters: {},
  actions: {
    setRealName(realName: string): void {
      this.realName = realName
    },
    setRoles(roles: string[]): void {
      this.roles = roles
    },
    async login(loginData: LoginData) {
      try {
        const { authorization, authorizationType } = await postLogin({
          ...loginData,
          password: encryptByMd5(loginData.password)
        })

        setToken(authorizationType + ' ' + authorization)
        return true
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async info() {
      try {
        const { roles } = await getInfo()
        this.setRoles(roles)
        return true
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
})
