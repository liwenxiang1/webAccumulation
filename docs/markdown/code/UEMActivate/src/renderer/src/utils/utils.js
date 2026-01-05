export function isImageFile(fileName) {
  let fileArr = fileName.split(".")
  if (fileArr.length < 2) return false
  let suffix = fileArr[fileArr.length - 1]
  let imgList = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp']
  let result = imgList.some(item => item == suffix)
  return result;
}
