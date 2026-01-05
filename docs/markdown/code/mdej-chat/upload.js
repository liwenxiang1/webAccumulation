import axios from '../plugins/axios'

export function uploadFile(file, fileName, fileType) {
  return new Promise((resolve, reject) => {
    let fileReader = new plus.io.FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onloadend = function (e) {
      let name = '_doc/upload/' + fileName
      let picUrl = e.target.result.toString()
      let files = dataURLtoFile(picUrl, fileName, fileType)
      let fileData = new FormData()
      fileData.append('filedata', files)
      fileData.append('xtbh', 'hlwyy')
      axios.post('/hlwyy/basis-file/fileOperate/uploadFile', fileData).then(data => {
        let Url = axios.defaults.baseURL + '/hlwyy/business-ggfw/fileFeign/downloadFile?fileFullPath=' + data.fileFullPath
        return resolve({...data, Url})
      }).catch(() => {
        plus.nativeUI.toast('上传文件错误：' + e.message)
        return resolve(e)
      })
    }
  })
}

//  将base码转为文件格式
const dataURLtoFile = (dataurl, fileName, fileType) => {
  let arr = dataurl.split(','), bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], fileName, {
    type: fileType
  })
}
