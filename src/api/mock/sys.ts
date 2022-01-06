import request from '@/utils/http'
import type { AxiosResponse } from 'axios'

export interface LoginData {
  username: string
  password: string
  code: string
  rememberMe: boolean
  verify: string
}

export interface LoginResponse {
  token: string
  realName: string
  roles: []
}

export function postLogin(data: LoginData) {
  return request<LoginResponse>({
    url: '/login',
    method: 'post',
    isMock: true,
    data
  })
}

export function getUserInfo() {
  return request<LoginResponse>({
    url: '/getUserInfo',
    method: 'GET',
    isMock: true
  })
}
