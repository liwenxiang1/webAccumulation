/* 服务器返回数据的的类型，根据接口文档确定 */
export interface Result<T = any> {
  code: number,
  message: string,
  data: T
}
