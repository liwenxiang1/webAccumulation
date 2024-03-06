import comp from "D:/vuepress-starter/docs/.vuepress/.temp/pages/accumulation/index.html.vue"
const data = JSON.parse("{\"path\":\"/accumulation/\",\"title\":\"accumulation 前端积累\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[],\"git\":{\"updatedTime\":1709520868000,\"contributors\":[{\"name\":\"“liwx”\",\"email\":\"“1258598654qq.com”\",\"commits\":2}]},\"filePathRelative\":\"accumulation/README.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
