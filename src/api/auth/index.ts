import request from '@/utils/http'
import type { AxiosResponse } from 'axios'

export function getUser(params) {
  return request({
    url: '/admin/sec/user/page',
    method: 'get',
    params
  })
}

export function getRole(params) {
  return request({
    url: '/admin/sec/role/page',
    method: 'get',
    params
  })
}

//禁用或启用管理员
export function putUserStatus(data) {
  return request({
    url: '/admin/sec/user/status',
    method: 'put',
    data
  })
}

//所有角色
export function getAllRoleList() {
  return request({
    url: '/admin/sec/role/all',
    method: 'get'
  })
}

//管理员添加
export function postUserAdd(data) {
  return request({
    url: '/admin/sec/user/add',
    method: 'post',
    data
  })
}

export function deleteUser(params) {
  return request({
    url: '/admin/sec/user',
    method: 'delete',
    params
  })
}

//管理员编辑
export function putUser(data) {
  return request({
    url: '/admin/sec/user/edit',
    method: 'put',
    data
  })
}

//获取权限树
export function getPermissionTree() {
  return request({
    url: '/admin/sec/permission/tree',
    method: 'get'
  })
}
