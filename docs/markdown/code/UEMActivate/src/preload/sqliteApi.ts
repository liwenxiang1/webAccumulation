import {ipcRenderer} from 'electron';

type IUser = {
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

type IWhere = {
  user: IUser
  search: ISearch
}
// Custom APIs for renderer
export const sqliteApi = {

  async getSqliteDataPreload(where: IWhere) {
    return await ipcRenderer.invoke('getSqliteDataMain', where)
  },

  async addSqliteDataPreload(data: IUser) {
    return await ipcRenderer.invoke('addSqliteDataMain', data)
  },

  async updateSqliteDataPreload(data: IUser, where: IWhere) {
    return await ipcRenderer.invoke('updateSqliteDataMain', data, where)
  },

  async deleteSqliteDataPreload(where: IWhere) {
    return await ipcRenderer.invoke('deleteSqliteDataMain', where)
  },
}
