import request from '@/utils/http'
import type { AxiosResponse } from 'axios'

export interface LoginData {
  username: string
  password: string
}

export function postLogin(data: LoginData) {
  return request<AxiosResponse>({
    url: '/login',
    method: 'post',
    isMock: true,
    data
  })
}
