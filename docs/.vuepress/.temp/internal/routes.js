export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/get-started.html", { loader: () => import(/* webpackChunkName: "get-started.html" */"D:/vuepress-starter/docs/.vuepress/.temp/pages/get-started.html.js"), meta: {"title":"Get Started"} }],
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/vuepress-starter/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"Home"} }],
  ["/accumulation/prototype.html", { loader: () => import(/* webpackChunkName: "prototype.html" */"D:/vuepress-starter/docs/.vuepress/.temp/pages/accumulation/prototype.html.js"), meta: {"title":"原型和原型链"} }],
  ["/accumulation/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/vuepress-starter/docs/.vuepress/.temp/pages/accumulation/index.html.js"), meta: {"title":"accumulation 前端积累"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"D:/vuepress-starter/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);
