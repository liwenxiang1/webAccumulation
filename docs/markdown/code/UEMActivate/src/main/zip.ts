import OpenDialogOptions = Electron.OpenDialogOptions;
import {app, dialog, ipcMain} from 'electron'
import path from 'path';

const unzip = require("node-unzip-2");
const fstream = require('fstream');
const fs = require('fs');

class ZipPlugin {
  constructor() {
    //注册事件
    ipcMain.handle('getInstallStepImgMain', (event, stepName, resourceName) => this.getInstallStepImgMain(stepName, resourceName))
    ipcMain.handle('exitAppMain', this.exitAppMain)
    ipcMain.handle('chooseUnZipFileMain', (event, savePath, removeDir) => this.chooseUnZipFileMain(event, savePath, removeDir))
    ipcMain.handle('getZipFilesMain', this.getZipFilesMain)
    ipcMain.handle('selectDirPathMain', this.selectDirPathMain)
    ipcMain.handle('selectFilePathMain', (event, type, title) => this.selectFilePathMain(type, title))
    ipcMain.handle('getDefaultPathMain', this.getDefaultPathMain)
    ipcMain.handle('createDirMain', (event, path) => this.createDirMain(path))
    ipcMain.handle('removeFileMain', (event, path) => this.removeFileMain(path))
    ipcMain.handle('readFileBase64Main', (event, path) => this.readFileBase64Main(path))
  }

  //获取安装步骤里面的图片
  getInstallStepImgMain(stepName, resourceName) {
    const isBuild = app.isPackaged;
    let image_dir_path_dev = path.resolve(process.cwd(), 'doc', 'installStepsImg', stepName, resourceName)
    let image_dir_path_prod = path.resolve(process.cwd(), 'resources', 'installStepsImg', stepName, resourceName)
    let image_dir_path = isBuild ? image_dir_path_prod : image_dir_path_dev
    console.log("image_dir_path", process.env.NODE_ENV)
    console.log("image_dir_path", isBuild)
    console.log("image_dir_path", image_dir_path)
    let fileList = this._getAllFiles(image_dir_path)
    fileList = fileList.map(item => "data:image/png;base64," + this.readFileBase64Main(item.filePath))
    return fileList
  }

  exitAppMain() {
    app.quit()
  }

  // 选择zip文件并解压==================
  async chooseUnZipFileMain(event, savePath, removeDir = false) {
    let installPath = app.getAppPath();
    // D:\Program Files\uemactivate\resources\app.asar
    console.log("chooseZipFileMain", installPath)
    //判断文件夹不存在则创建文件夹
    this.createDirMain(savePath)
    //如果要删除文件夹
    if (removeDir) this._clearDirs(savePath, "adb_win32")
    return await dialog.showOpenDialog({
      title: "选择文件",
      properties: ["openFile"],
      filters: [{name: "zip", extensions: ["zip"]}],
    } as OpenDialogOptions).then(result => {
      console.log(result.filePaths[0])
      if (result.filePaths.length) return this._unzipFile(result.filePaths[0], savePath);
      else return {}
    })
  }

  // 解压zip文件==================
  getZipFilesMain(event, file) {
    console.log("main--getZipFilesMain", event)
    console.log("main--getZipFilesMain", file)
    return new Promise(resolve => {
    })
  }

  // 选择文件夹路径
  async selectDirPathMain(event) {
    // console.log("main--selectSavePathMain", event)
    let {filePaths} = await dialog.showOpenDialog({
      title: '选择文件夹',
      defaultPath: path.join(__dirname, ''),
      properties: ['openDirectory']
    })
    console.log("selectDirPathMain", filePaths);
    return filePaths
  }

  // 选择文件路径
  async selectFilePathMain(type = '', title = '') {
    let typeFilters = type ? [{name: type, extensions: [type]}] : []
    console.log("selectFilePathMain", typeFilters)
    let {filePaths} = await dialog.showOpenDialog({
      title: title ? title : `选择${type}文件`,
      // defaultPath: path.join(__dirname, ''),
      properties: ['openFile'],
      filters: typeFilters,
    })
    console.log("selectFilePathMain", filePaths);
    return filePaths.length && filePaths[0]
  }

  getDefaultPathMain() {
    console.log("getDefaultPathMain===")
    return path.resolve()
  }

  // 解压zip文件并保存
  _unzipFile(targetPath, saveFilePath) {
    console.log("unzipFile===", targetPath, saveFilePath);
    // console.log("unzipFile===",fstream);
    return new Promise(async (resolve, reject) => {
      let reader = fs.createReadStream(targetPath).pipe(unzip.Parse())
        .pipe(fstream.Writer(saveFilePath))

      reader.on("error", (err) => {
        console.error("_unzipFile", err)
        resolve({})
      })
      reader.on('close', (res) => {
        console.log("_unzipFile", res);
        let zipFileName = targetPath.substring(targetPath.lastIndexOf('\\') + 1)
        let zipFileValue = zipFileName.substring(0, zipFileName.lastIndexOf('.'))
        let fileList = this._getAllFiles(`${saveFilePath}\\${zipFileValue}`)
        console.log("fileList==", fileList);
        resolve({zipFileName, fileList});
      })
    });
  }

  _getAllFiles(dirPath) {
    type fileObj = {
      name: string;
      filePath: string;
    };
    let fileList: Array<fileObj> = []
    const files = fs.readdirSync(dirPath)
    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      fileList.push({name: filePath.substring(filePath.lastIndexOf('\\') + 1), filePath: filePath})
    })
    return fileList
  }

  //删除文件夹及下面的所有内容
  _clearAllFile(dirPath) {
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
      const filePath = `${dirPath}/${file}`;
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        this._clearAllFile(filePath)
      } else {
        // 删除文件
        fs.unlinkSync(filePath);
        console.log(`remove ${file} success`)
      }
    });
    //删除文件夹
    fs.rmdirSync(dirPath)
    console.log(`remove ${dirPath} success`);
  }

  //删除对应路径下的所有文件夹(排除特定文件夹)
  _clearDirs(dirPath, exclude) {
    fs.readdir(dirPath, (err, files) => {
      files.forEach(file => {
        const filePath = path.join(dirPath, file);
        if (fs.statSync(filePath).isDirectory()) {
          if (!exclude || (exclude && filePath.indexOf(exclude) === -1)) {
            console.log("chooseZipFileMain===isDirectory", filePath);
            // fs.rmdirSync(filePath)
            this._clearAllFile(filePath)
          }
        }
      })
    })
  }

  //如果文件夹不存在则创建文件夹
  createDirMain(projectPath) {
    if (!fs.existsSync(projectPath)) fs.mkdirSync(projectPath);
  }

  //删除文件
  removeFileMain(filePath) {
    if (fs.existsSync(filePath)) return fs.unlinkSync(filePath);
    else return "文件不存在！"
  }

  //读取文件
  readFileBase64Main(filePath) {
    const result = fs.readFileSync(filePath);
    console.log("readFileBase64==>", result)
    return result.toString('base64')
  }
}

const zipPlugin = new ZipPlugin()
