# Vue 开发技巧

## 文章内容总结:

1. 组件 style 的 scoped
2. Vue 数组/对象更新 视图不更新
3. vue filters 过滤器的使用
4. 列表渲染相关
5. 深度 watch 与 watch 立即触发回调
6. 这些情况下不要使用箭头函数
7. 路由懒加载写法
8. 路由的项目启动页和 404 页面
9. Vue 调试神器:vue-devtools

## 组件 style 的 scoped:

> 问题：在组件中用 js 动态创建的 dom，添加样式不生效。

**场景:**

```html
<template>
  <div class="test"></div>
</template>
<script>
  let a = document.querySelector('.test');
  let newDom = document.createElement('div'); // 创建dom
  newDom.setAttribute('class', 'testAdd'); // 添加样式
  a.appendChild(newDom); // 插入dom
</script>
<style scoped>
  .test {
    background: blue;
    height: 100px;
    width: 100px;
  }

  .testAdd {
    background: red;
    height: 100px;
    width: 100px;
  }
</style>
```

**结果：**

> // test 生效 testAdd 不生效

```html
<div data-v-1b971ada class="test">
  <div class="testAdd"></div>
</div>
```

```css
.test[data-v-1b971ada] {
  // 注意data-v-1b971ada
  background: blue;
  height: 100px;
  width: 100px;
}
```

**原因:**

当 `<style>` 标签有 `scoped` 属性时，它的 CSS 只作用于当前组件中的元素。

它会为组件中所有的标签和 `class` 样式添加一个 `scoped` 标识，就像上面结果中的 data-v-1b971ada。

所以原因就很清楚了：因为动态添加的 dom 没有 scoped 添加的标识，没有跟 testAdd 的样式匹配起来，导致样式失效。

**解决方式:**

- 推荐：去掉该组件的 scoped
- 每个组件的 css 并不会很多，当设计到动态添加 dom，并为 dom 添加样式的时候，就可以去掉 scoped，会比下面的方法方便很多。

## Vue 数组/对象更新 视图不更新

很多时候，我们习惯于这样操作数组和对象:

```js
data() { // data数据
    return {
        arr: [1, 2, 3],
        obj: {
            a: 1,
            b: 2
        }
    };
}
// 数据更新 数组视图不更新
this.arr[0] = 'OBKoro1';
this.arr.length = 1;
console.log(arr); // ['OBKoro1'];
// 数据更新 对象视图不更新
this.obj.c = 'OBKoro1';
delete this.obj.a;
console.log(obj); // {b:2,c:'OBKoro1'}
```

由于 js 的限制，Vue 不能检测以上数组的变动，以及对象的添加/删除，很多人会因为像上面这样操作，出现视图没有更新的问题。

**解决方式:**

1. this.$set(你要改变的数组/对象，你要改变的位置/key，你要改成什么 value)

```js
this.$set(this.arr, 0, 'OBKoro1'); // 改变数组
this.$set(this.obj, 'c', 'OBKoro1'); // 改变对象
```

2. 数组原生方法触发视图更新:
   Vue 可以监测到数组变化的，数组原生方法:

`splice()` 、 `push()` 、 `pop()` 、 `shift()` 、 `unshift()` 、 `sort()` 、 `reverse()`

**意思是使用这些方法不用我们再进行额外的操作，视图自动进行更新。**

推荐使用 `splice` 方法会比较好自定义, 因为 `slice` 可以在数组的任何位置进行删除/添加操作，这部分可以看看:[【干货】js 数组详细操作方法及解析合集](https://juejin.cn/post/6844903614918459406?utm_source=gold_browser_extension#heading-7)

3. 替换数组/对象
   比方说: 你想遍历这个数组/对象，对每个元素进行处理，然后触发视图更新。

```js
// 文档中的栗子: filter 遍历数组，返回一个新数组，用新数组替换旧数组
example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/);
});
```

**举一反三：** 可以先把这个数组/对象保存在一个变量中，然后对这个变量进行遍历，等遍历结束后再用 **变量替换对象/数组**。

**并不会重新渲染整个列表:**

Vue 为了使得 DOM 元素得到最大范围的重用而实现了一些智能的、启发式的方法，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作。

如果你还是很困惑，可以看看 [Vue 文档](https://v2.cn.vuejs.org/v2/guide/list.html#%E6%95%B0%E7%BB%84%E6%9B%B4%E6%96%B0%E6%A3%80%E6%B5%8B)中关于这部分的解释。

## vue filters 过滤器的使用:

过滤器，通常用于后台管理系统，或者一些约定类型，过滤。Vue 过滤器用法是很简单，但是很多朋友可能都没有用过，这里稍微讲解一下。

在 html 模板中的两种用法：

```html
<!-- 在双花括号中 -->
{{ message | filterTest }}
<!-- 在 `v-bind` 中 -->
<div :id="message | filterTest"></div>
```

在组件 script 中的用法:

```js
export default {
  data() {
    return {
      message: 1,
    };
  },
  filters: {
    filterTest(value) {
      // value在这里是message的值
      if (value === 1) {
        return '最后输出这个值';
      }
    },
  },
};
```

用法就是上面讲的这样，可以自己在组件中试一试就知道了，很简单很好用的。

推荐看 [Vue 过滤器文档](https://v2.cn.vuejs.org/v2/guide/filters.html)，你会更了解它的。

## 列表渲染相关

`v-for` 循环绑定 `model` :

`input` 在 `v-for` 中可以像如下这么进行绑定，我敢打赌很多人不知道。

```js
// 数据
data() {
        return {
            obj: {
                ob: "OB",
                koro1: "Koro1"
            },
            model: {
                ob: "默认ob",
                koro1: "默认koro1"
            }
        }
    },

    // html模板
    <
    div v -
    for = "(value,key) in obj" >
    <
    input type = "text"
v - model = "model[key]" >
    <
    /div>

// input 就跟数据绑定在一起了，那两个默认数据也会在 input 中显示
```

**一段取值的 v-for**

如果我们有一段重复的 html 模板要渲染，又没有数据关联，我们可以:

```html
<div v-for="n in 5">
  <span>这里会被渲染5次，渲染模板{{n}}</span>
</div>
```

**v-if 尽量不要与 v-for 在同一节点使用:**

`v-for` 的优先级比 `v-if` 更高, 如果它们处于同一节点的话，那么每一个循环都会运行一遍 `v-if` 。

如果你想根据循环中的每一项的数据来判断是否渲染，那么你这样做是对的:

```html
<li v-for="todo in todos" v-if="todo.type===1">{{ todo }}</li>
```

如果你想要根据**某些条件跳过循环，而又跟将要渲染的每一项数据没有关系的话，你可以将 v-if 放在 v-for 的父节点：**

// 根据 elseData 是否为 true 来判断是否渲染，跟每个元素没有关系

```html
<ul v-if="elseData">
  <li v-for="todo in todos">{{ todo }}</li>
</ul>
// 数组是否有数据 跟每个元素没有关系
<ul v-if="todos.length">
  <li v-for="todo in todos">{{ todo }}</li>
</ul>
<p v-else>No todos left!</p>
```

如上，正确使用 `v-for` 与 `v-if` 优先级的关系，可以为你节省大量的性能

## 深度 watch 与 watch 立即触发回调

`watch` 很多人都在用，但是这` watch` 中的这两个选项`deep`、`immediate`，或许不是很多人都知道，我猜。

**选项：deep**

在选项参数中指定 deep: true，可以监听对象中属性的变化。

**选项：immediate**

在选项参数中指定 `immediate: true`, 将立即以表达式的当前值触发回调，也就是立即触发一次。

```js
watch: {
obj: {
handler(val, oldVal) {
console.log('属性发生变化触发这个回调',val, oldVal);
},
deep: true // 监听这个对象中的每一个属性变化
},
step: { // 属性
//watch
handler(val, oldVal) {
console.log("默认立即触发一次", val, oldVal);
},
immediate: true // 默认立即触发一次
},
},
```

## 这些情况下不要使用箭头函数:

- 不应该使用箭头函数来定义一个生命周期方法
- 不应该使用箭头函数来定义 method 函数
- 不应该使用箭头函数来定义计算属性函数
- 不应该对 data 属性使用箭头函数
- 不应该使用箭头函数来定义 watcher 函数

**示例：**

```js
// 上面 watch 的栗子：
handler:(val, oldVal)=> { // 可以执行
console.log("默认触发一次", val, oldVal);
},
// method：
methods: {
plus: () => { // 可以执行
// do something
}
}
// 生命周期:
created:()=>{ // 可以执行
console.log('lala',this.obj)
},
```

是的，没错，这些都能执行。

but:

箭头函数绑定了父级作用域的上下文，**this 将不会按照期望指向 Vue 实例**。

也就是说，**你不能使用 this 来访问你组件中的 data 数据以及 method 方法了**。

this 将会指向 undefined

## 路由懒加载写法:

```js
// 我所采用的方法，个人感觉比较简洁一些，少了一步引入赋值。
const router = new VueRouter({
    routes: [
    path: '/app',
    component: () => import('./app'),  // 引入组件
    ]
})
// Vue路由文档的写法:
const app = () => import('./app.vue') // 引入组件
const router = new VueRouter({
    routes: [
    { path: '/app', component: app }
    ]
})
```

文档的写法在于问题在于：如果我们的路由比较多的话，是不是要在路由上方引入赋值十几行组件？

第一种跟第二种方法相比就是把引入赋值的一步，直接写在 `component` 上面，本质上是一样的。两种方式都可以的，大家自由选择哈。

## 路由的项目启动页和 404 页面

实际上这也就是一个设置而已:

```js
export default new Router({
  routes: [
    {
      path: '/', // 项目启动页
      redirect: '/login', // 重定向到下方声明的路由
    },
    {
      path: '*', // 404 页面
      component: () => import('./notFind'), // 或者使用component也可以的
    },
  ],
});
```

比如你的域名为:`www.baidu.com`

项目启动页指的是: 当你进入`www.baidu.com`，会自动跳转到 `login` 登录页。

404 页面指的是: 当进入一个没有 声明/没有匹配 的路由页面时就会跳转到 404 页面。

比如进入`www.baidu.com/testRouter`,就会自动跳转到`notFind`页面。

当你没有声明一个 404 页面，进入`www.baidu.com/testRouter`，显示的页面是一片空白。

## Vue 调试神器:vue-devtools

每次调试的时候，写一堆`console`是否很烦？想要更快知道组件`Vuex` 内数据的变化？

那么这款尤大开发的调试神器:**vue-devtools**，你真的要了解一下了。

这波稳赚不赔，真的能提高开发效率。

**安装方法：**

谷歌商店+科学上网,搜索 **vue-devtools** 即可安装。
**安装之后：**

在 `chrome` 开发者工具中会看一个 `vue` 的一栏，如下对我们网页应用内数据变化，组件层级等信息能够有更准确快速的了解。

## 路由变化页面数据不刷新问题

场景：比如文章详情数据，依赖路由的 `params` 参数获取的(`ajax` 写在 `created `生命周期里面)，因为路由懒加载的关系，退出页面再进入另一个文章页面并不会运行 `created` 组件生命周期，导致文章数据还是上一个文章的数据。

解决方法：watch 监听路由是否变化

```js
     watch: {
      '$route' (to, from) { // 监听路由是否变化
        if(this.$route.params.articleId){// 是否有文章id
          // 获取文章数据
        }
      }
    }
```

## setTimeout/setInterval 无法用 this 访问 VUe 实例

**场景：**

```js
      mounted(){
            // this指向改变
            setTimeout(function () { // setInterval同理
              console.log(this);// 此时this指向Window对象
            },1000);
        }
```

**解决方法：使用箭头函数**

```js
// 箭头函数访问 this 实例
// 因为箭头函数本身没有绑定 this 继承上一个不是箭头函数的函数的 this
setTimeout(() => {
  console.log(this);
}, 500);
// 使用变量保存 this 指向 通过变量访问 this 实例
let self = this;
setTimeout(function () {
  console.log(self); // 使用 self 变量访问 this 实例
}, 1000);
```

## setInterval 路由跳转继续运行并没有销毁

**场景：**

比如一些弹幕，走马灯文字，这类需要定时调用的，路由跳转之后，因为组件已经销毁了，但是 `setInterval` 还没有销毁，还在继续后台调用，控制台会不断报错，如果运算量大的话，无法及时清除，会导致严重的页面卡顿。

**解决办法：在组件生命周期 beforeDestroy 停止 setInterval**

组件销毁前执行的钩子函数，跟其他生命周期钩子函数的用法相同。

```js
beforeDestroy(){
    //我通常是把setInterval()定时器赋值给this实例，然后就可以像下面这么暂停。
   clearInterval(this.intervalid);
},
```

## vue 滚动行为(浏览器回退记忆位置)用法

这个我当时做的时候以为很难，后来做好了才发现就是一个设置而已（前提是要开启路由的 `History` 模式），下面做一个简单的分享。

**路由设置**

要使用这一功能，首先需要开启 `vue-router` 的 `history` 模式
如果之前一直使用的是 hash 模式(默认模式)，项目已经开发了一段时间，然后转 `history` 模式很可能会遇到：这些问题

滚动行为具体设置如下：

```js
        const router = new VueRouter({
          mode: 'history',
        scrollBehavior (to, from, savedPosition) {
            if (savedPosition) { // 如果savedPosition存在，滚动条会自动跳到记录的值的地方
              return savedPosition
            } else {
              return { x: 0, y: 0 }// savedPosition也是一个记录x轴和y轴位置的对象
             }
            }，
          routes: [...]
        })
```

[vue 滚动行为文档](https://router.vuejs.org/zh-cn/advanced/scroll-behavior.html)，可以进到这里看看更详细的信息。

## vue 路由拦截浏览器后退实现草稿保存类似需求

**场景：**

为了防止用户突然离开，没有保存已输入的信息。

**用法：**

```js
    //在路由组件中：
    mounted(){
    },
    beforeRouteLeave (to, from, next) {
      if(用户已经输入信息){
        // 出现弹窗提醒保存草稿，或者自动后台为其保存
      }else{
        next(true);// 用户离开
      }
    }
```

类似的还有 `beforeEach`、`beforeRouteUpdate`，也分为全局钩子和组件钩子，见[路由文档](https://router.vuejs.org/zh-cn/advanced/navigation-guards.html)。

## v-once 只渲染元素和组件一次，优化更新渲染性能

觉得`v-once`这个 `api` 蛮 6 的，应该很多小伙伴都没有注意到这个 `api`。

**文档介绍：**

`v-once` 文档介绍

这个 `api` 在我看来主要用于那些一次性渲染，并且不会再有操作更改这些渲染的值，这样就可以优化双向绑定的更新性能。

文档推荐：对低开销的静态组件使用 `v-once`

尽管在 `Vue` 中渲染 `HTML` 很快，不过当组件中包含大量静态内容时，可以考虑使用 `v-once` 将渲染结果缓存起来，就像这样：

```html
Vue.component('terms-of-service', { template: '
<div v-once>
  <h1>Terms of Service</h1>
  ...很多静态内容...
</div>
' })
```

[另一篇相似文档](https://juejin.cn/post/6844903555602612231)
