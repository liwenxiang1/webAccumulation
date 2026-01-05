import {isPlusClient} from './index'
import {uploadFile} from './upload'

// 选择视频功能
export function chooseVideoFile() {
  if (!isPlusClient()) {
    console.error("不是plus环境")
    return
  }
  return new Promise((resolve, reject) => {
    let cmr = plus.camera.getCamera()
    cmr.startVideoCapture(
        function (p) {
          plus.io.resolveLocalFileSystemURL(
              p,
              async function (entry) {
                let result = await compressVideo(entry.toLocalURL())
                resolve(result)
              },
              function (e) {
                plus.nativeUI.toast('读取摄像文件错误：' + e.message)
                reject(e)
              }
          )
        },
        function (e) {
        },
        {filter: 'image'}
    )
  })
}

// 压缩视频
function compressVideo(src) {
  return new Promise((resolve, reject) => {
    plus.nativeUI.showWaiting("上传视频中...");
    plus.zip.compressVideo(
        {
          src: src,
          quality: 'medium'
        },
        function (zip) {
          console.log("压缩视频成功：" + JSON.stringify(zip));
          plus.io.resolveLocalFileSystemURL(zip.tempFilePath, function (entry) {
            entry.file(async function (file) {
              try {
                let result = await uploadFile(file, entry.name, 'mp4')
                plus.nativeUI.closeWaiting();
                return resolve(result)
              } catch (e){
                return resolve(e)
              }
            })
          })
        },
        function (error) {
          plus.nativeUI.closeWaiting();
          console.error("压缩视频失败：" + JSON.stringify(error));
          reject(error)
        });
  })
}

