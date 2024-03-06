import comp from "D:/vuepress-starter/docs/.vuepress/.temp/pages/accumulation/prototype.html.vue"
const data = JSON.parse("{\"path\":\"/accumulation/prototype.html\",\"title\":\"原型和原型链\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"什么是原型和原型链\",\"slug\":\"什么是原型和原型链\",\"link\":\"#什么是原型和原型链\",\"children\":[]},{\"level\":2,\"title\":\"原型链继承（new）\",\"slug\":\"原型链继承-new\",\"link\":\"#原型链继承-new\",\"children\":[]},{\"level\":2,\"title\":\"借用构造函数继承\",\"slug\":\"借用构造函数继承\",\"link\":\"#借用构造函数继承\",\"children\":[]}],\"git\":{\"updatedTime\":1709467325000,\"contributors\":[{\"name\":\"“liwx”\",\"email\":\"“1258598654qq.com”\",\"commits\":1}]},\"filePathRelative\":\"accumulation/prototype.md\"}")
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
