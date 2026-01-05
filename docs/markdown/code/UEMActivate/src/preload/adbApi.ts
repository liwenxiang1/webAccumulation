import {ipcRenderer} from 'electron';

// Custom APIs for renderer
export const adbApi = {

  async checkAdbValidPreload() {
    return await ipcRenderer.invoke('checkAdbValidMain')
  },

  async listDevicesPreload() {
    return await ipcRenderer.invoke('listDevicesMain')
  },

  async installApkPreload(apkPath) {
    return await ipcRenderer.invoke("installApkMain", apkPath)
  },

  async getDeviceStorageInfoPreload(para) {
    return await ipcRenderer.invoke("getDeviceStorageInfoMain", para)
  },

  async runAdbCommandListPreload(para) {
    return await ipcRenderer.invoke("runAdbCommandListMain", para)
  },

  async runAdbCommandPreload(para) {
    return await ipcRenderer.invoke("runAdbCommandMain", para)
  }
}
