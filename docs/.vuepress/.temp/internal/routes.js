export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/get-started.html", { loader: () => import(/* webpackChunkName: "get-started.html" */"D:/vuepress-starter/docs/.vuepress/.temp/pages/get-started.html.js"), meta: {"title":"Get Started"} }],
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/vuepress-starter/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"Home"} }],
  ["/accumulation/apply.html", { loader: () => import(/* webpackChunkName: "apply.html" */"D:/vuepress-starter/docs/.vuepress/.temp/pages/accumulation/apply.html.js"), meta: {"title":"JS 基础系列-重新认识 call apply bind"} }],
  ["/accumulation/array.html", { loader: () => import(/* webpackChunkName: "array.html" */"D:/vuepress-starter/docs/.vuepress/.temp/pages/accumulation/array.html.js"), meta: {"title":"数组 API 解析合集"} }],
  ["/accumulation/arrowFun.html", { loader: () => import(/* webpackChunkName: "arrowFun.html" */"D:/vuepress-starter/docs/.vuepress/.temp/pages/accumulation/arrowFun.html.js"), meta: {"title":"箭头函数和普通函数"} }],
  ["/accumulation/deepclone.html", { loader: () => import(/* webpackChunkName: "deepclone.html" */"D:/vuepress-starter/docs/.vuepress/.temp/pages/accumulation/deepclone.html.js"), meta: {"title":"深拷贝和浅拷贝"} }],
  ["/accumulation/defineProperty.html", { loader: () => import(/* webpackChunkName: "defineProperty.html" */"D:/vuepress-starter/docs/.vuepress/.temp/pages/accumulation/defineProperty.html.js"), meta: {"title":"Object.defineProperty"} }],
  ["/accumulation/eventLoop.html", { loader: () => import(/* webpackChunkName: "eventLoop.html" */"D:/vuepress-starter/docs/.vuepress/.temp/pages/accumulation/eventLoop.html.js"), meta: {"title":"事件循环（Event Loop）以及实例"} }],
  ["/accumulation/prototype.html", { loader: () => import(/* webpackChunkName: "prototype.html" */"D:/vuepress-starter/docs/.vuepress/.temp/pages/accumulation/prototype.html.js"), meta: {"title":"原型和原型链"} }],
  ["/accumulation/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/vuepress-starter/docs/.vuepress/.temp/pages/accumulation/index.html.js"), meta: {"title":"accumulation 前端积累"} }],
  ["/accumulation/setAndmap.html", { loader: () => import(/* webpackChunkName: "setAndmap.html" */"D:/vuepress-starter/docs/.vuepress/.temp/pages/accumulation/setAndmap.html.js"), meta: {"title":"ES6 set 和 map 数据结构"} }],
  ["/accumulation/typeof.html", { loader: () => import(/* webpackChunkName: "typeof.html" */"D:/vuepress-starter/docs/.vuepress/.temp/pages/accumulation/typeof.html.js"), meta: {"title":"JS 中四种常见的数据类型判断方法"} }],
  ["/accumulation/val.html", { loader: () => import(/* webpackChunkName: "val.html" */"D:/vuepress-starter/docs/.vuepress/.temp/pages/accumulation/val.html.js"), meta: {"title":"val let 和 const"} }],
  ["/accumulation/websocket.html", { loader: () => import(/* webpackChunkName: "websocket.html" */"D:/vuepress-starter/docs/.vuepress/.temp/pages/accumulation/websocket.html.js"), meta: {"title":"websocket"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"D:/vuepress-starter/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
