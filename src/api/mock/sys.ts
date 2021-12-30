import request from '@/utils/http'
import type { AxiosResponse } from 'axios'

export interface LoginData {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  realName: string
}

export function postLogin(data: LoginData) {
  return request<LoginResponse>({
    url: '/login',
    method: 'post',
    isMock: true,
    data
  })
}
