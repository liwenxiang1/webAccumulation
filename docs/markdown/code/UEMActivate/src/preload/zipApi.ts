import {ipcRenderer} from 'electron';

// Custom APIs for renderer
export const zipApi = {

  test() {
    console.log("preload--test")
    return ipcRenderer.send('saveFile')
  },

  openDevTool() {
    ipcRenderer.send("open-dev-tool", {open: true});
  },

  exitAppPreload() {
    return ipcRenderer.invoke("exitAppMain");
  },

  async chooseUnZipFilePreload(savePath, removeDir) {
    return await ipcRenderer.invoke("chooseUnZipFileMain", savePath, removeDir)
  },

  async getZipFilesPreload(file) {
    console.log("preload--getZipFilesPreload", file)
    // return await ipcRenderer.invoke('getZipFilesMain', file) //这里传递file对象就不行
    return await ipcRenderer.invoke('getZipFilesMain', 123)
  },

  async selectDirPathPreload() {
    return await ipcRenderer.invoke('selectDirPathMain')
  },

  async selectFilePathPreload(type, title) {
    return await ipcRenderer.invoke('selectFilePathMain', type, title)
  },

  getDefaultPathPreload() {
    return ipcRenderer.invoke('getDefaultPathMain')
  },

  createDirPreload(path) {
    return ipcRenderer.invoke('createDirMain', path)
  },

  removeFilePreload(path) {
    return ipcRenderer.invoke('removeFileMain', path)
  },

  readFileBase64Preload(path) {
    return ipcRenderer.invoke('readFileBase64Main', path)
  },

  getInstallStepImgPreload(stepName, resourceName) {
    return ipcRenderer.invoke('getInstallStepImgMain', stepName, resourceName)
  }


}
