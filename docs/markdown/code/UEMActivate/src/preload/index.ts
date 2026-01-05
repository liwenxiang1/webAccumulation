import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { zipApi } from './zipApi'
import { adbApi } from './adbApi'
import { sqliteApi } from './sqliteApi'

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
console.log("process.contextIsolated", process.contextIsolated);
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('zipApi', zipApi)
    contextBridge.exposeInMainWorld('adbApi', adbApi)
    contextBridge.exposeInMainWorld('sqliteApi', sqliteApi)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.zipApi = zipApi
  // @ts-ignore (define in dts)
  window.sqliteApi = sqliteApi
  // @ts-ignore (define in dts)
  window.adbApi = adbApi
}
