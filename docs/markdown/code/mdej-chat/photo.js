import {isPlusClient} from './index'
import {uploadFile} from "./upload"
import permission from "./permission"

// 选择图片功能
export function chooseImageFile() {
  if (!isPlusClient()) {
    console.error("不是plus环境")
    return
  }
  return new Promise(async (resolve, reject) => {
    console.log("chooseImageFile-进入")
    plus.gallery.pick(
        async function (path) {
          let name = path.substring(path.lastIndexOf('/') + 1)
          let result = await compressPhoto(path, name, 'image/png') //图片压缩
          resolve(result)
        },
        function (e) {
          console.error("takePhotoFile", e)
        },
        {filter: 'image'}
    )
  })
}

// 拍照图片
export function takePhotoFile() {
  return new Promise(async (resolve, reject) => {
    console.log("takePhotoFile-进入")
    let status = permission.isIOS ? await permission.requestIOS('camera') :
        await permission.requestAndroid('android.permission.CAMERA');
    console.log("takePhotoFile===", status)
    if (status === -1 || status === 2 || status.code) {
      plus.nativeUI.toast(status.message ? status.message : '相机权限没有开启！')
      return
    }
    let cmr = plus.camera.getCamera()
    cmr.captureImage(
        function (p) {
          plus.io.resolveLocalFileSystemURL(
              p,
              async function (entry) {
                let result = await compressPhoto(entry.toLocalURL(), entry.name, 'image/png')
                resolve(result)
              },
              function (e) {
                plus.nativeUI.toast('读取拍照文件错误：' + e.message)
              }
          )
        },
        function (e) {
          console.error("takePhotoFile", e)
        },
        {
          filter: 'image'
        }
    )
  })
}

//  相册图片压缩
const compressPhoto = (url, filename, fileType) => {
  return new Promise((resolve, reject) => {
    let name = '_doc/upload/' + filename
    plus.zip.compressImage(
        {
          src: url, //src: (String 类型 )压缩转换原始图片的路径
          dst: name, //压缩转换目标图片的路径
          quality: 90, //quality: (Number 类型 )压缩图片的质量.取值范围为1-100
          overwrite: true, //overwrite: (Boolean 类型 )覆盖生成新文件
          width: '250',
          height: '320'
        },
        function (zip) {
          //页面显示图片
          plus.io.resolveLocalFileSystemURL(zip.target, function (entry) {
            entry.file(async function (file) {
              let result = await uploadFile(file, filename, fileType)
              resolve(result)
            })
          })
        },
        function (error) {
          plus.nativeUI.toast('压缩图片失败，请稍候再试')
          reject(error)
        }
    )
  })
}
