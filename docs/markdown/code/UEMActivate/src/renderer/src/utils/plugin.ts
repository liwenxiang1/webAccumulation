//sqlite功能
export type INewUser = {
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
  user: INewUser
  search: ISearch
}

export const sqlitePlugin = new class {

  async getSqliteDataRender() {
    // @ts-ignore (define in dts)
    return await window.sqliteApi.getSqliteDataPreload()
  }

  async addSqliteDataRender(data: INewUser) {
    // @ts-ignore (define in dts)
    return await window.sqliteApi.addSqliteDataPreload(data)
  }

  async deleteSqliteDataRender(where: IWhere) {
    // @ts-ignore (define in dts)
    return await window.sqliteApi.deleteSqliteDataPreload(where)
  }

  async updateSqliteDataRender(data: INewUser, where: IWhere) {
    // @ts-ignore (define in dts)
    return await window.sqliteApi.updateSqliteDataPreload(data, where)
  }
}

//adb功能
export const adbPlugin = new class {
  async checkAdbValidRender() {
    // @ts-ignore (define in dts)
    return await window.adbApi.checkAdbValidPreload()
  }

  async listDevicesRender() {
    // @ts-ignore (define in dts)
    return await window.adbApi.listDevicesPreload()
  }

  async installApkRender(apkPath) {
    // @ts-ignore (define in dts)
    return await window.adbApi.installApkPreload(apkPath)
  }

  async getDeviceStorageInfoRender(para) {
    // @ts-ignore (define in dts)
    return await window.adbApi.getDeviceStorageInfoPreload(para)
  }

  async runAdbCommandListRender(para) {
    // @ts-ignore (define in dts)
    return await window.adbApi.runAdbCommandListPreload(para)
  }

  async runAdbCommandRender(para) {
    // @ts-ignore (define in dts)
    return await window.adbApi.runAdbCommandPreload(para)
  }
}

//zip功能
export const zipPlugin = new class {
  async testRender() {
    // @ts-ignore (define in dts)
    return await window.zipApi.test()
  }

  async openDevToolRender() {
    // @ts-ignore (define in dts)
    return await window.zipApi.openDevTool()
  }

  async chooseUnZipFileRender(savePath, removeDir) {
    // @ts-ignore (define in dts)
    return await window.zipApi.chooseUnZipFilePreload(savePath, removeDir)
  }

  async getZipFilesRender(file) {
    // @ts-ignore (define in dts)
    return await window.zipApi.getZipFilesPreload(file)
  }

  async selectDirPathRender() {
    // @ts-ignore (define in dts)
    return await window.zipApi.selectDirPathPreload()
  }

  async selectFilePathRender(type, title) {
    // @ts-ignore (define in dts)
    return await window.zipApi.selectFilePathPreload(type, title)
  }

  async getDefaultPathRender() {
    // @ts-ignore (define in dts)
    return await window.zipApi.getDefaultPathPreload()
  }

  async createDirRender(path) {
    // @ts-ignore (define in dts)
    return await window.zipApi.createDirPreload(path)
  }

  async removeFileRender(path) {
    // @ts-ignore (define in dts)
    return await window.zipApi.removeFilePreload(path)
  }

  async readFileBase64Render(path) {
    // @ts-ignore (define in dts)
    return await window.zipApi.readFileBase64Preload(path)
  }
}
