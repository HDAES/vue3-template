import { defineStore } from 'pinia'
import { UserState } from 'types/store'
import { setToken, getToken, clearToken } from '@/utils/storage'
import { encryptByMd5 } from '@/utils/crypto'
import { postLogin, getInfo, postLoginOut } from '@/api/sys'
import { LoginData } from '@/api/sys/types'

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    token: getToken(),
    realName: '',
    nickName: '',
    roles: []
  }),
  getters: {
    getNickName(): string {
      return this.nickName
    },
    getroles(): string[] {
      return this.roles
    }
  },
  actions: {
    setRealName(realName: string): void {
      this.realName = realName
    },
    setRoles(roles: string[]): void {
      this.roles = roles
    },
    setNickName(nickname: string): void {
      this.nickName = nickname
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
        const { roles, nickname } = await getInfo()
        this.setRoles(roles)
        this.setNickName(nickname)
        return true
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async loginOut() {
      return new Promise((resolve, reject) => {
        postLoginOut()
          .then(res => {
            clearToken()
            this.token = ''
            resolve(true)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
})
