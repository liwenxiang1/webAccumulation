import comp from "D:/vuepress-starter/docs/.vuepress/.temp/pages/accumulation/prototype/index.html.vue"
const data = JSON.parse("{\"path\":\"/accumulation/prototype/\",\"title\":\"原型和原型链\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[],\"git\":{},\"filePathRelative\":\"accumulation/prototype/README.md\"}")
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
