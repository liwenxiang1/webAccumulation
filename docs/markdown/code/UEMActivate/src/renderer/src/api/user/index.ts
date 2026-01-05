import {http} from '../../utils/request'

import type {ILoginData, ILoginRes, IUserInfoRes} from './type'

/**
 * 登录
 */
export function login(data: ILoginData) {
  return http.post<ILoginRes>('/hlwyy/business-zhfw/account/check', data);
}

/**
 * 获取登录用户信息
 */
export function getUserInfo() {
  return http.get<IUserInfoRes>('/user/info')
}
