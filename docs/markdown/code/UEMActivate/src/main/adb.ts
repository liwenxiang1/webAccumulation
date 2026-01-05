import path from 'path';
import {localConfig} from "./storage"
import {app, dialog, ipcMain} from 'electron'
import OpenDialogOptions = Electron.OpenDialogOptions;

const fs = require('fs');
const util = require("util");
const execPromise = util.promisify(require("child_process").exec);
const execFilePromise = util.promisify(require("child_process").execFile);
const {spawn, execFile} = require('child_process');

class AdbPlugin {
  adb_path: string | undefined;

  constructor() {
    //注册main进程的事件
    ipcMain.handle('checkAdbValidMain', () => this.checkAdbValidMain())
    ipcMain.handle('listDevicesMain', () => this.listDevicesMain())
    ipcMain.handle('installApkMain', (event, apkPath) => this.installApkMain(apkPath))
    ipcMain.handle('runAdbCommandMain', (event, para) => this.runAdbCommandMain(para))
    ipcMain.handle('runAdbCommandListMain', (event, shellList) => this.runAdbCommandListMain(shellList))
    ipcMain.handle('getDeviceStorageInfoMain', (event, para) => this.getDeviceStorageInfoMain(para))
  }

  //获取连接的设备列表
  async listDevicesMain() {
    console.log("\n\nlistDevicesMain");
    return new Promise(async (resolve, reject) => {
      const {error, stdout, stderr} = await this._runAdb("devices");
      if (error) throw error;
      let deviceList = stdout.replace(/(\r|\t|device)/g, "").split('\n')
        .filter(item => item && item.indexOf('attached') == -1)
      console.log("deviceList", deviceList)
      return resolve(deviceList)
    })
  }

  //选择并安装apk文件到手机
  installApkMain(apkPath) {
    console.log("\n\ninstallApkMain", apkPath)
    return this._runAdb(`install -r ${apkPath}`)
  }

  runAdbCommandListMain(shellList = []) {
    return new Promise(async (resolve, reject) => {
      let shellResult: any = []
      shellResult = await this._runAdbList(shellList)
      console.log("getDeviceInfo", shellResult)
      return resolve(shellResult)
    })
  }

  //获取手机的存储目录
  getDeviceStorageInfoMain(para) {
    console.log("\n\ngetDeviceStorageInfoMain", para)
    return new Promise(async (resolve, reject) => {
      const command = `
      adb shell <<EOF
      cd /mnt/${para}
      ls -F
      exit
      `
      const shRes = execFile('sh', ['-c', command]);
      let mFileList = []
      shRes.stdout.on('data', (data) => {
        let fileList = data.replace(/(\r)/g, "").split("\n")
        mFileList = mFileList.concat(fileList)
        console.log(`stdout:==================>`);
      });
      shRes.stderr.on('data', (data) => {
        console.error(`\n stderr:==================> ${data}`);
      });
      shRes.on('close', (code) => {
        console.log(`\n child close:==================> ${code}`);
        mFileList = mFileList.filter(item => item)
        mFileList.sort((a, b) => a.localeCompare(b));
        mFileList.sort((a, b) => {
          let aDir = a.endsWith("/"), bDir = b.endsWith("/")
          if (aDir && !bDir) return -1
          else return 0
        })
        return resolve(mFileList)
      });
    })
  }

  //检查adb环境是否正确
  async checkAdbValidMain() {
    console.log("\n\ncheckAdbValidMain==")
    let platform = process.platform;//win32
    console.log("platform", platform);
    const isBuild = app.isPackaged;
    let adb_path_dev = path.resolve(process.cwd(), 'doc', 'adb_win32', 'adb.exe')
    let adb_path_prod = path.resolve(process.cwd(), 'resources', 'adb_win32', 'adb.exe')
    console.log("isBuild", isBuild, adb_path_prod, adb_path_dev)
    this.adb_path = isBuild ? adb_path_prod : adb_path_dev
    // console.log("adb_path", this.adb_path)
    let adbValid = this._checkFilePathValid(this.adb_path)
    // console.log("adbExist", adbExist)
    let adb_version = null
    if (adbValid) {
      localConfig.setItem("adbPath", this.adb_path)
      const result = await this._runAdb('version')
      console.log("version=>result", result)
      adb_version = result.stdout
    } else console.error("_checkAdbValid", "adb not exist!")
    return {platform, adbValid, adb_path: this.adb_path, adb_version};
  }

  //检查文件是否存在
  _checkFilePathValid(filePath: string) {
    if (!fs.existsSync(filePath)) {
      console.error(`${filePath}该路径不存在`)
      return false
    }
    return true;
  }

  //执行adb命令列表
  async _runAdbList(list) {
    return new Promise(async (resolve, reject) => {
      let resultList = []
      for (const item of list) {
        let itemRes = await this._runAdb(item)
        resultList.push(itemRes)
      }
      resolve(resultList)
    })
  }

  async runAdbCommandMain(para) {
    return await this._runAdb(para)
  }

  //执行adb命令
  _runAdb(args) {
    let adbPath = localConfig.getItem('adbPath')
    if (adbPath) {
      args = `${adbPath} ${args}`;
      console.log("project adb env success!")
    } else {
      args = `adb ${args}`;
      console.warn("project adb env error!, use system adb!")
    }
    console.warn(`run: ${args}`);
    return execPromise(args);
  }
}

const adbPlugin = new AdbPlugin()

