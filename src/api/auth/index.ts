import request from '@/utils/http'
import type { AxiosResponse } from 'axios'

export function getUser(params) {
  return request({
    url: '/admin/sec/user/page',
    method: 'get',
    params
  })
}
