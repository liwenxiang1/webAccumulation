/* 登录接口参数类型 */
export interface ILoginData {
  lxdh: string,
  qdly: string,
}

/* 登录接口返回值类型 */
export interface ILoginRes {
  dlkl: string;
  lxdh: string;
  token: string;
  uuid: string;
  xb: string;
}

/* 用户信息接口返回值类型 */
export interface IUserInfoRes {
  id: string,
  username: string,
  avatar: string,
  description: string,
}
