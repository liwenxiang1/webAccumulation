export interface ICountry {
  country_id: number
  name_cn: string
  name_en: string
  img: string
  remark?: string
  state?: number
  create_time?: Date
  update_time?: Date
}

export interface ICardType {
  card_type_id: number
  name_cn: string
  name_en: string
  img: string
  remark: string
  state: number
  create_time?: Date
  update_time?: Date
}

export interface ICardRate {
  id: number
  card_type_id: number
  card_type_name?: string
  card_type_img?: string
  country_id: number
  country_name?: string
  country_img?: string
  face_value: string
  rate: number | null
  currency: string
  state: number
  create_time?: Date
  update_time?: Date
}

export interface IMsg {
  worker_id: number
  source: string
  user_id: number
  user_no: string
  author: string
  type: string
  content: string
  create_time: Date
}

export interface IUser {
  user_id: number
  name: string
  mobile: string
  email: string
  avatar: string
  remark: string
  sex: number
  is_super: number   // 1 管理员
  token?: string
}

export interface ICustomer {
  customer_id: number
  customer_no: string
  name: string
  avatar: string
}

export interface IWorker {
  worker_id: number
  worker_name: string
  avatar: string
}

export interface IMenu {
  selected: boolean
  id: string
  name: string
  url: string
  openStyle: number
  icon: string
  children?: Array<IMenu>
}

export type IUser = {
  id: number,
  username: string,
  password: string,
  email: string,
  createdate: string
}
type ISearch = {
  join: string,//连接符：默认是and
  sql: '',//原始的where条件
}

export type IWhere = {
  user: IUser
  search: ISearch
}
