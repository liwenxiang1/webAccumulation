# vue知识

## 一、vue常见的`style`和`class`动态绑定问题

### 1.style 动态绑定

> 三元判断
```
:style="{ color: monthData.grow ? '#EE4E4E' : '#38B289' }"
```
> 值引用
```
:style="{ width: completeData.completionRateMonth }"
```
> 多属性动态配置
```
:style="{ width: item.width, color: index == selIndex ? '#1989fa' : '#404144' }"
```
> 多条件判断
```
:style="{ color: canGetYzm && canGetYzmClick ? '#4575ee' : '#999999' }"
```
> 使用返回的返回值
```
:style="{ background: computeLineColor(dataIdx, tableList.length) }"
```
> 值拼接
```
:style="{ width: yearData.ratio + '%' }"
```
> 多值拼接
```
:style="{ top: 'calc(75px + ' + marginTop + 'px)' }"
```

### 2.class 动态绑定

> 条件判断
```
:class="{ 'tag-divider': index != 0 }"
```
> 三元判断
```
:class="activeTab1 == item.name ? 'active-tab' : 'tab-link'"
```
> 多类名绑定
```
:class="[{ 'tab-below': tabBelow }, { 'tab-below-route_detail': showRouteDetail }]"
```

## 二、组件中使用 `v-model` 绑定数据

> 在组件中使用`computed`将 `v-model` 传入的 ***value*** 和传出的 ***input*** 事件进行转换，方便使用。

* 1.在 `index` 页面中代码：
  ```
  <create-dialog v-model="showDialog"></create-dialog>
  import createDialog from "./component/createDialog"
  export default { 
  	data() { return {showDialog: false} } 
  }
  ```
* 2.在 `createDialog` 组件中代码： *可以直接使用 **showDialog** 属性*
  ```
  export default {
    props: {
      value: {type: Boolean,default: false, }
    },
    computed: {
      showDialog: {
        get() {
          return this.value;
        },
        set(val) {
          this.$emit("input", val);
        }
      }
    }
  }
  ```
  
  > 第二种方法：使用emit方法的【update:title】参数将组件值修改同步到使用的控件上
  >
  > ```
  > app.component('my-component', {
  >   props: {
  >     title: String
  >   },
  >   emits: ['update:title'],
  >   template: `
  >     <input
  >       type="text"
  >       :value="title"
  >       @input="$emit('update:title', $event.target.value)">
  >   `
  > })
  > 
  > <my-component v-model:title="bookTitle"></my-component>
  > ```

## 二、store(vuex)使用

#### 1.参考mpx框架代码 [`mpx-store官方文档` ][mpx-store官方文档]  及   [`视频`][mpx-store视频地址]

* 1.[store.js写法示例][store-todo.js]

  <details>   
      <summary>展开查看</summary>   
      <pre><code>import { createStore } from '@mpxjs/core'
  const store = createStore({
    state: {
      count: 1
    },
    mutations: { //修改state里面的属性值
      add(state, payload) {
        state.count+=payload
      }
    },
    actions:{ //1.第一个参数是 context 对象；可以写成{ commit, state ,dispatch }；2.可以执行异步方法
      addAsync({commit},payload){
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            commit('add',payload);
            resolve()
          }, 1000)
        })
      },
      actionB ({ dispatch, commit }) {
        return dispatch('addAsync',2).then(() => {
          commit('someOtherMutation')
        })
      }
    },
    getters: { //不修改state里面的属性值直接返回逻辑数据
      isBiggerThan10:state=>{
        return state.count>10; 
      }
    },
  })
  export default store</code></pre> 
  </details>

* 2.[vue界面使用示例][store-todo.mpx]

  <details>   
      <summary>展开查看</summary>   
      <pre><code>import store from '../../store/index'
  computed:{
    ...store.mapState({zCount:'count'}), //1.mapState辅助函数获取多个状态；全局可以直接使用 zCount 属性
    ...store.mapGetters(['isBiggerThan10']),
    mCount(){ //2.原始写法：
      return store.state.count;
    }
  },
  methods: {
    ...store.mapMutations(['add']),//1.全局可以直接使用 add 方法
    ...store.mapActions(['addAsync']),
    addTen(){ //2.原始写法：
      store.commit('add',10)
      store.dispatch('addAsync',10)
    },
    addProcess(){
      this.add(10)
      this.addAsync(10).then(...)
    }
  }</code></pre> 
  </details>

#### 2.正常vue项目中使用

* 1.store/modules/lesson下的代码：

  ```
  export default {
    state: {curLessonTab: 'first'},
    mutations: {
    	setLessonTab: (state, tab) => {
        state.curLessonTab = tab
      }
    },
    getters: { //不修改state里面的属性值直接返回逻辑数据
    	getLessonTab(state) {
        return state.curLessonTab
      }
    }
  }
  ```

* 2.在页面中使用：

  ```
  this.$store.commit('lesson/setLessonTab', this.activeName)
  this.$store.state['lesson/curLessonTab'] //在lf-system-web项目中使用
  const token = this.$store.state.user.token //在org-app项目中使用
  this.index=this.$store.state.ydfa.tabIndex //在xcyz-app项目中使用
  const lessonTab = this.$store.getters['lesson/getLessonTab']
  ```
  
  

## 三、Vue.prototype全局变量使用 在 [`main.js`][main.js] 中

> 1.正常可以直接在main.js中定义Vue.prototype.xxx全局变量
>
> 2.为了代码分离可以使用Vue.use(xxx)将变量定义放到其他js中。   *这里的xxx是使用`别处导出的default对象`，`对象`需要有`install(Vue)`方法*

#### 1.配置一个变量

* 1.mian.js代码

  ```
  import globalVariable from './utils/globalVariable'
  Vue.prototype.globalVariable = globalVariable
  ```

* 2.globalVariable.js代码

  ```
  let isMathjaxConfig = false
  const initMathjaxConfig = () => {}
  const MathQueue = function(elementId) {}
  export default {
    isMathjaxConfig,
    initMathjaxConfig,
    MathQueue
  }
  ```

> 可以将上面的代码转成Vue.use的格式：

* 1.修改main.js代码：	`Vue.use(globalVariable)`

* 2.修改globalVariable.js代码如下

  ```
  export default{
  	install(Vue) {
  		Vue.prototype.$globalVariable={isMathjaxConfig,  initMathjaxConfig,  MathQueue}
  	}
  }
  ```

#### 2.配置多个变量

* 1.main.js代码：

   > `Vue.use(plugin)`
   
* 2.plugin.js代码：

   ```
   import {
    initUtil
   } from './util.js'
   export default {
    install(Vue) {
        initUtil(Vue)
        initPermission(Vue)
        initInterceptor()
    }
   }
   ```
   
* 3.util.js代码：

   ```
   function formatDate(date, format = 'yyyy/MM/dd hh:mm:ss'){
    return ...
   }
   export function initUtil(Vue) {
    Vue.prototype.$formatDate = formatDate
    Vue.prototype.$formatBytes = formatBytes
   }
   ```

## 四、Vue.directive快捷指令的使用

> 同上面的`prototype`定义一样，可以直接在`main.js`中定义，也可以使用Vue.use(xxx)在别处定义后引入。
>
> 还可以单独挂载到Vue页面中使用时再挂载

#### 1.全局使用（防止按钮连续点击）

* main.js中代码：

```
import throttle from "@/utils/throttle";
Vue.use(throttle)
```

* throttle.js中代码：

```
export default {
  install(Vue) {
    // 防止重复点击
    Vue.directive('throttle', {
      inserted(el, binding) {
        console.log("binding-7", binding)
        el.addEventListener('click', () => {
          if (!el.disabled) {
            el.disabled = true
            setTimeout(() => {
              el.disabled = false
            }, binding.value || 1000)
          }
        })
      }
    })
  }
}
```

#### 2.挂载到页面中，使用时再挂载

* index.vue页面中代码：

```
import waves from '@/directive/waves/index.js' // 水波纹指令
export default {
  directives: {
    waves
  }
  ...
}
```

* waves/index.js代码：

```
import waves from './waves'
const install = function(Vue) {
  Vue.directive('waves', waves)
}
if (window.Vue) {
  window.waves = waves
  Vue.use(install); // eslint-disable-line
}
waves.install = install
export default waves
```

* waves/waves.js代码：

```
export default {
  bind(el, binding) {
    el.addEventListener('click', handleClick(el, binding), false)
  },
  update(el, binding) {
    el.removeEventListener('click', el[context].removeHandle, false)
    el.addEventListener('click', handleClick(el, binding), false)
  },
  unbind(el) {
    el.removeEventListener('click', el[context].removeHandle, false)
    el[context] = null
    delete el[context]
  }
}
```

## 五、mixin使用


## 六、生命周期：`beforeRouteLeave`使用
`beforeRouteEnter`里面执行this的方法好像会失败。。。

```
beforeRouteLeave(to, from, next) {
  if (to.path == "/searchdw" || to.path == "/bmjcyj") {
    this.$store.commit("jgjyfazjinfo", this.jgjyfazj);
    next();
  } else {
    this.$store.commit("jgjyfazjinfo", "");
    this.$store.commit("setsjdwmc", "");
    this.$store.commit("setsgdwmc", "");
    this.$store.commit("setsydwmc", "");
    next();
  }
},
```




[main.js]:code/admin_unicloud/main.js
[store-todo.js]:code/mpx-demo/store/todo.js
[store-todo.mpx]:code/mpx-demo/pages/todo.mpx
[mpx-store视频地址]:https://www.imooc.com/video/20829
[mpx-store官方文档]:https://didi.github.io/mpx/store/#开始

