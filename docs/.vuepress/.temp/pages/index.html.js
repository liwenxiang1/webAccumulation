import comp from "D:/vuepress-starter/docs/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"Home\",\"lang\":\"zh-CN\",\"frontmatter\":{\"home\":true,\"title\":\"Home\",\"heroImage\":\"https://vuejs.press/images/hero.png\",\"actions\":[{\"text\":\"开始阅读\",\"link\":\"/getting-started.html\",\"type\":\"primary\"}],\"features\":null,\"footer\":\"MIT Licensed | Copyright © 2018-present Li-wx\"},\"headers\":[],\"git\":{\"updatedTime\":1709467325000,\"contributors\":[{\"name\":\"“liwx”\",\"email\":\"“1258598654qq.com”\",\"commits\":1}]},\"filePathRelative\":\"README.md\"}")
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
