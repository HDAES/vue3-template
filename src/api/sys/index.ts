import request from '@/utils/http'
import type { AxiosResponse } from 'axios'

/**
 * 登录接口
 * @param data
 * @returns
 */
export function postLogin(data) {
  return request({
    url: '/admin/sec/user/login',
    method: 'post',
    data
  })
}

/**
 * 获取验证码
 * @returns
 */
export function getVerifyCode() {
  return request({
    url: '/admin/sec/user/verifyCode',
    method: 'get'
  })
}
