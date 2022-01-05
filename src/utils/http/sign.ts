/*
 * @Descripttion: 请求的加密
 * @Author: Hades
 * @Date: 2021-09-14 22:53:18
 */

import { AxiosRequestConfig } from 'axios'
//import { getToken } from '../auth'
import { encryptByMd5 } from '../crypto'
import { getToken } from '@/utils/storage'

export function setRequestConfig(
  config: AxiosRequestConfig
): AxiosRequestConfig {
  //获取当前时间
  const timestamp: Number = new Date().getTime()

  //当前api 版本
  const version: string = config.version
    ? config.version
    : import.meta.env.VITE_API_VERSION

  config.headers['version'] = version
  config.headers['timestamp'] = timestamp
  config.headers['sign'] = setSign(config, timestamp)

  const token = getToken()

  // 是否需要设置 token
  const isToken = (config || {}).isToken == false
  if (!isToken && token) {
    config.headers['Authorization'] = token
  }

  // 设置请求头部
  config.baseURL = config.isMock
    ? import.meta.env.VITE_GLOB_API_MOCK
    : import.meta.env.VITE_GLOB_API_URL

  //是否form表单
  if (config.isForm) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }

  return config
}

export function setSign(config: AxiosRequestConfig, timestamp: Number): string {
  let str = ''
  if ((config.method == 'get' || config.method == 'delete') && config.params) {
    let keys = Object.keys(config.params).sort()
    for (let i = 0; i < keys.length; i++) {
      str += config.params[keys[i]]
    }
  }
  return encryptByMd5(
    str + encryptByMd5(timestamp.toString().substring(0, 8)) + timestamp
  )
}

export function setUploadSign() {
  //获取当前时间
  const timestamp: Number = new Date().getTime()
  const version: string = '1.0.0'

  return {
    timestamp,
    version,
    sign: encryptByMd5(
      '' + encryptByMd5(timestamp.toString().substring(0, 8)) + timestamp
    )
  }
}
