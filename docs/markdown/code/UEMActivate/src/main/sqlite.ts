import path from 'path';
import {app, dialog, ipcMain} from 'electron'

const sqlite = require("sqlite3").verbose()

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

class Sqlite3Plugin {
  constructor() {
    this._initClient()
    ipcMain.handle('getSqliteDataMain', (event, where: IWhere) => this.getSqliteDataMain(where))
    ipcMain.handle('addSqliteDataMain', (event, data: IUser) => this.addSqliteDataMain(data))
    ipcMain.handle('updateSqliteDataMain', (event, data: IUser, where: IWhere) => this.updateSqliteDataMain(data, where))
    ipcMain.handle('deleteSqliteDataMain', (event, where: IWhere) => this.deleteSqliteDataMain(where))
  }

  _initClient() {
    const isBuild = app.isPackaged;
    let sqlite_path_dev = path.resolve(process.cwd(), 'doc', 'data.db')
    let sqlite_path_prod = path.resolve(process.cwd(), 'resources', 'data.db')
    let sqlite_path = isBuild ? sqlite_path_prod : sqlite_path_dev
    this.sqliteClient = new sqlite.Database(sqlite_path)
  }

  //转换where条件
  _convertWhereCondition(where: IWhere) {
    if (!where || (!where?.search?.sql && (!where.user || !Object.keys(where.user).length))) return ''
    if (where?.search?.sql) return where.search.sql
    let list = Object.keys(where?.user).map(key => {
      if (where?.user[key] instanceof Array) return `${key} in (${where?.user[key]})`
      return `${key} = '${where?.user[key]}'`
    })
    return "where " + list.join(` ${where?.search?.join ? where?.search?.join : 'and'} `)
  }

  _formatDateTime(time: Date) {
    let yy = time.getFullYear()
    let mm = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1
    let dd = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
    let hh = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
    let mf = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
    let ss = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()
    let timeStr = `${yy}-${mm}-${dd} ${hh}:${mf}:${ss}`
    return timeStr
  }

  getSqliteDataMain(where: IWhere) {
    return new Promise((resolve, reject) => {
      where = this._convertWhereCondition(where)
      let sql = `select *
                 from user ${where}`
      console.log("getData==sql", sql)
      this.sqliteClient.all(sql, (err, row) => {
        console.log('getData==result： ', row)
        if (err) throw err
        else resolve(row)
      })
    })
  }

  addSqliteDataMain(data: IUser) {
    console.log("addSqliteDataMain", data)
    if (!data || !data.username) return
    data.createdate = this._formatDateTime(new Date())
    let sql = `insert into user (username, password, email, createdate)
               values ('${data.username}', '${data.password}', '${data.email}', '${data.createdate}')`
    this.sqliteClient.prepare(sql).run()
  }


  updateSqliteDataMain(data: IUser, where: IWhere) {
    if (!data || !Object.keys(data).length) return
    where = this._convertWhereCondition(where)
    console.log("updateData==>", where)
    let setSql = Object.keys(data).map(key => `${key}='${data[key]}'`).join(" , ")
    console.log("updateData==>", setSql)
    let sql = `update user
               set ${setSql} ${where}`
    this.sqliteClient.prepare(sql).run();
  }

  deleteSqliteDataMain(where: IWhere) {
    console.log("deleteSqliteDataMain", where)
    where = this._convertWhereCondition(where)
    console.log("deleteSqliteDataMain", where)
    if (!where) return false
    let sql = `delete
               from user ${where}`
    this.sqliteClient.prepare(sql).run();
  }
}


const sqlite3Plugin = new Sqlite3Plugin()

// sqlite3Plugin.addData({username: 'asdfa', password: '5123', email: '5123#1232'})
// sqlite3Plugin.updateData({username: 'cccc',password:'dd'}, {user: {username: 'lala'}})
// sqlite3Plugin.deleteData({user: {username: 'cccc'}})
// sqlite3Plugin.getData()
