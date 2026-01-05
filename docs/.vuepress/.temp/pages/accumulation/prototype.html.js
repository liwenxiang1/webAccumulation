import comp from "D:/myBlog/webAccumulation/docs/.vuepress/.temp/pages/accumulation/prototype.html.vue"
const data = JSON.parse("{\"path\":\"/accumulation/prototype.html\",\"title\":\"原型和原型链\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"什么是原型和原型链\",\"slug\":\"什么是原型和原型链\",\"link\":\"#什么是原型和原型链\",\"children\":[]},{\"level\":2,\"title\":\"使用 new 创建对象后的内存表现\",\"slug\":\"使用-new-创建对象后的内存表现\",\"link\":\"#使用-new-创建对象后的内存表现\",\"children\":[]},{\"level\":2,\"title\":\"1、原型链继承（new）\",\"slug\":\"_1、原型链继承-new\",\"link\":\"#_1、原型链继承-new\",\"children\":[]},{\"level\":2,\"title\":\"2、借用构造函数继承\",\"slug\":\"_2、借用构造函数继承\",\"link\":\"#_2、借用构造函数继承\",\"children\":[]},{\"level\":2,\"title\":\"3、寄生组合式继承\",\"slug\":\"_3、寄生组合式继承\",\"link\":\"#_3、寄生组合式继承\",\"children\":[]},{\"level\":2,\"title\":\"4、class 继承\",\"slug\":\"_4、class-继承\",\"link\":\"#_4、class-继承\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"accumulation/prototype.md\"}")
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
