# vue3+ts+vite 知识

### 一、vue3 常用的知识

- 1.按钮跳转死路由可以直接使用`router-link`标签，否则只能通过下面的代码实现路由跳转
  ```js
  import { useRouter } from 'vue-router';
  const router = useRouter();
  router.push({ path: '/home' });
  ```
- 2.0 父组件->子组件传参实现，子组件回传参数给父组件
  ```js
  // ========子组件SignView.vue========
  import {reactive} from "vue";
  const props = defineProps({
    signing: {//正在签署中
      type: Boolean,
      default: false
    },
    backData: {//返回结果
      type: Function
    },
  })
  const xxx=()=>{
    props.backData(aaa)
  }
  <div v-if="!props.signing">
  // ========父组件========
  <sign-view :signing="data.signing" :backData="(val)=>state.adbValid=val"></sign-view>
  ```
- 2.1 父组件调用子组件的方法：`defineExpose({ getDeviceInfo})`、`ref="deviceInfoView"`、`deviceInfoView.value.getDeviceInfo()`

  ```js
  //========子组件：DeviceInfo.vue========
  import {reactive} from "vue";
  const getDeviceInfo = async () => { ... }
  defineExpose({
    getDeviceInfo,
  })

  //========父组件：logcat.vue========
  import { ref } from 'vue'
  import DeviceInfo from "../../../components/adb/DeviceInfo.vue";
  const deviceInfoView: any = ref<InstanceType<typeof DeviceInfo>>();

  const xxx=()=>{
    deviceInfoView.value.getDeviceInfo()
  }
  <device-info ref="deviceInfoView"></device-info>
  ```

- 2.2 组件的`v-model`实现：`emit('update:modelValue', false)`、`props.modelValue`。
  如果在子组件内继续使用`v-model='props.modelValue'`的话会警告甚至报错。

  ```js
  // ========子组件 child========
  import {defineEmits} from "vue";
  //定义向父组件回传的方法
  let emit = defineEmits(['update:modelValue'])
  //定义对外的属性名
  const props = defineProps({
    modelValue: {//显示，隐藏弹窗。v-model传入的数据
      type: Boolean,
      default: false,
    }
  })
  //调用回传方法修改源数据
  const closeDialog = (name) => {
    ...
    emit('update:modelValue', false)
  }

  // ========父组件========
  <child v-model="state.showDeviceStorageDialog"></child>
  ```

- 2.3 组件的`v-model`实现：在上面的基础上使用`computed`对象的`get`、`set`方法使用`props.modelValue`
  就可以在子组件内继续使用`v-model='computedValue'`了。
  ```js
  //只需要定义一个computed生成的变量，定义get方法绑定props.modelValue的值，set方法使用emit回传修改的值。
  import {computed,defineEmits} from "vue";
  //定义向父组件回传的方法
  let emit = defineEmits(['update:modelValue'])
  //定义对外的属性名
  const props = defineProps({
    modelValue: {//显示，隐藏弹窗。v-model传入的数据
      type: Boolean,
      default: false,
    }
  })
  const computedValue = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit('update:modelValue', value)
      }
    }
  )
  # 子组件内继续使用computedValue变量
  <van-field v-model="computedValue"></van-field>
  ```
- 3.`watch`方法使用（第一次渲染页面 watch 并不会触发），`watchEffect`使用（第一次进入就会触发）

  ```js
  //不加 flush: 'post'的话，watch监听是在Dom元素更新之前执行的。加上的话就是Dom元素更新之后执行的。
  watch(source, callback, {
    flush: 'post',
  });
  watchEffect(callback, {
    flush: 'post',
  });
  //当num大于5的时候停止监听
  const stopWatch = watchEffect(() => {
    if (num > 5) {
      stopWatch(); //停止监听
    }
  });
  ```

  ```js
  import {watch,watchEffect} from "vue";
  watch(
    () => props.modelValue,
    async (newVal, oldVal) => {
      console.log("watch=====>", newVal)
      if (newVal) {
        state.selectMode.selectDir = ''//显示弹窗的时候就重置selectPackageName这个字段
        resetQuery()
      }
    }
  )
  # 另一种写法
  const message = ref("小猪课堂");
  const newMessage = computed(() => {
    return message.value;
  });
  const number = reactive({ count: 0 });

  watch(message, (newValue, oldValue) => {...});
  watch(newMessage, (newValue, oldValue) => {...});
  watch(number, (newValue, oldValue) => {...}); //已经实现了深度监听
  watch(() => number,(newValue, oldValue) => {...},{ deep: true }); //使用 getter 函数返回了响应式对象，需要手动添加深度监听
  watch(() => number.count,(newValue, oldValue) => {...});
  watch([message, () => number.count], (newValue, oldValue) => {...});

  # watchEffect使用
  watchEffect(()=>{
    console.log("新的值:", number.count);
  })
  ```

- 4.`computed`方法使用

  ```js
  import { computed, ComputedRef } from 'vue';

  const filterStorageDirs: ComputedRef<Array<any>> = computed(() => {
    return state.storageDirs.filter(
      (item) => item.name.toLowerCase().indexOf(state.searchValue) != -1
    );
  });
  const adbEnvInfo = computed(() => {
    return state.adbInfo.adbValid ? '项目adb环境正常！' : '项目adb环境错误！';
  });
  ```

- 5.`onMounted`生命周期使用
  ```js
  import { onMounted } from 'vue';
  onMounted(async () => {
    await initLocalSaveDirEnv();
  });
  ```
- 6.图片资源使用

  ```js
  //一、动态使用
  const getPhoneIcon = (value) => {
    return new URL(
      `../../assets/img/selectPhoneBrand/icon_${value}.png`,
      import.meta.url
    ).href;
  };

  //二、动态引用
  import right_icon_available from '../../../assets/img/installSteps/right_icon_available.png';
  import right_icon_disable from '../../../assets/img/installSteps/right_icon_disable.png';

  const nextImageBtnSrc = computed(() => {
    return data.currentImageIndex >= data.currentPhoneResource.length - 1
      ? right_icon_disable
      : right_icon_available;
  });

  //三、获取目录下的所有文件
  const resource0 = import.meta.glob(
    '/src/assets/img/installSteps/step1/resource0/*.png'
  );
  const resource0Imgs = Object.keys(resource0);

  //四、动态样式background-image使用
  const currentPhoneImageStyle = computed(() => {
    let url =
      data.currentPhoneResource.length &&
      data.currentPhoneResource[data.currentImageIndex];
    let style = { backgroundImage: 'url(' + `${url}` + ')' };
    return style;
  });
  ```

- 7.使用指令功能实现一个防止多次点击的功能
  ```js
  //一、在全局样式中定义禁用类样式
  .disabled-class {
    pointer-events: none;
  }
  //二、给`vue`对象添加禁用指令
  # global_utils.ts
  export default {
    //自定义节流操作
    ReClick: {
      mounted(el: any, binding: any) {
        // console.log("ReClick==>", el, binding)
        // console.log("ReClick==>", el.className, binding)
        el.addEventListener('click', () => {
          console.log("ReClick==>", binding.value)
          console.log("ReClick==>", el.disabled)
          if (el.className.indexOf('disabled-class') == -1) {
            el.className = el.className + " disabled-class";
            setTimeout(() => {
              el.className = el.className.replace(" disabled-class", "")
            }, binding.value || 1200)
          }
        })
      }
    }
  }
  # main.ts
  import global_utils from "./utils/global_utils";
  app.directive('reclick', global_utils.ReClick);
  //三、禁用指令的使用
  <van-button v-reclick></van-button>
  ```
- 8.使用`store`数据缓存，使用的库是：`pinia`

  ```js
  # 第一步：添加 pinia 依赖

  # 第二步：在main.ts中使用 pinia

  import {createPinia} from 'pinia'
  let app = createApp(App)
  app.use(createPinia())

  # 第三步：全局创建 store 对象并添加想要的 store属性
  // store/app.ts - store具体的模块里面的代码
  import {defineStore} from 'pinia'

  export const appStore = defineStore('app', {
    state: () => ({
      token: "",
      phoneBrand: "",//手机型号
      installStepIndex: 0,//安装步骤编号
    }),
    actions: {
      setPhoneBrand(val: any) {
        this.phoneBrand = val
      },
      setInstallStepIndex(val: any) {
        this.installStepIndex = val
      }
    }
  })

  // store/index.ts - 创建全局的store对象，添加对应模块的属性
  import { appStore } from './app'
  const store: any = {}
  export const registerStore = () => {
      store.appStore = appStore()
  }
  export default store

  // main.ts - 在main.ts代码执行入口处注册 store 对象
  import {registerStore} from './store'
  registerStore()

  # 第四步：在代码中的具体使用
  import store from "../../store";
  store.appStore.setPhoneBrand(selectPhoneType)
  console.log("phoneBrand==>", store.appStore.phoneBrand)
  ```

- 9.关于`axios`的使用参考：[render-api][render-api]、[render-request][render-request]

- 10.toRef、 toRefs 的使用.toRefs 的作用是将一个响应式对象转换为一个普通对象，其中每个属性都是一个 ref。这样，我们就可以在模板中使用这些 ref，而不需要通过响应式对象的属性访问器来访问它们。

```js
import { reactive, toRefs } from 'vue';

const state = reactive({
  count: 0,
  message: 'Hello, world!',
});
const { count, message } = toRefs(state);
// const a = toRef(state, 'count')

console.log(count.value); // 0
console.log(message.value); // 'Hello, world!'

// 在模板中使用
<template>
  <div>
    <p>{{ count }}</p>
    <p>{{ message }}</p>
  </div>
</template>;
```

### 二、vue3 遇到的问题

- 1.打印`reactive`的数据，显示的都是`Proxy`的信息。需要使用下面的方法打印
  ```js
  console.log(JSON.parse(JSON.stringfy(xxx)));
  ```
- 2.xxx

### 三、typescript 的知识

typescript 和 JavaScript 用法基本一样，正常使用即可。在需要关心数据类型的地方可以定义具体的数据类型。

- 1.`type`和`interface`功能基本一样的，写法有点区别

```js
 # interface使用
 export interface IMsg {
   source: string
   user_id: number
   create_time: Date
 }
 # type使用
 export type INewUser = {
   id: number,
   username: string,
 }
 type ISearch = {
   join: string,
   sql: '',
 }
 export type IWhere = {
   user: INewUser
   search: ISearch
 }
 # 具体引用后的使用
 sqlitePlugin.deleteSqliteDataRender({user: {id: item.id}} as IWhere)
```

### 四、electron 的知识

有三层分别为：`main`主进程，`preload`中间层，`render`渲染层。

- 1.主进程相当于是`nodejs`服务层，可以调用 pc 系统的一些功能如：文件系统，命令行功能等。
- 2.中间层可以调用主进程和渲染层的东西。因为渲染层是使用的 vue 框架，所以不直接调用渲染层。

> 因为渲染层使用 vue 框架，调用渲染层的东西比较麻烦。所以常用的调用顺序都是：【render 层】->【preload 层】->【main 层】

**知识点介绍**

- 1.关于 main 层的代码参考：[main-adb.ts][main-adb.ts]，需要在`main/index.ts`中引入
- 2.关于 preload 层的代码参考：[preload-adbApi.ts][preload-adbApi.ts]，需要在`preload/index.ts`中注册
- 3.关于 render 层的代码参考：[render-plugin.ts][render-plugin.ts]，在具体页面中可以使用。
- 4.关于在 render-vue 层的代码参考：[render-vue-ApkAction.vue][render-vue-ApkAction.vue]
- 5.想要隐藏应用的菜单栏，网上说用`Menu.setApplicationMenu(null)`但是不管用。通过下面的代码实现了
  ```js
  const mainWindow = new BrowserWindow({
    ...
    titleBarStyle: 'hidden',//隐藏title标题栏
  })
  ```
- 6.如果在 render 层动态加载系统的文件的时候，应该加载使用 main 层的
  `fs.readFileSync(filePath)`读取到的数据，而不是直接加载本地文件的路径。

```js
 //main层读取文件
 class ZipPlugin {
   ...
   readFileBase64Main(filePath) {
     const result = fs.readFileSync(filePath);
     console.log("readFileBase64==>", result)
     return result.toString('base64')
   }
 }

 //render层使用文件的base64字符串加载本地资源
 const previewFile = async (item) => {
   ...
   let result = await window.zipApi.readFileBase64Preload(state.previewInfo.localFilePath)
   state.previewInfo.localFileBase64 = "data:image/jpg;base64," + result
 }
```

- 7.安装应用时，将项目中的文件复制到应用的安装目录中，根据项目框架的区别配置的地方不一样。
  - 1.针对普通的 electron 项目，具体看运行的命令里面的`--config`配置的是哪个配置文件
    ```js
    // build.config.win.js 或者 build.config.js
    const config = {
      extraResources: {
        from: './resource/adb_win32',
        to: 'adb',
      },
    };
    ```
  - 2.针对`vite-electron`框架的项目，框架里面配置的打包的配置文件是`electron-builder.yml`
    ```js
    extraResources:
      - from: ./doc/adb_win32
        to: adb_win32
      - from: ./doc/data.db
        to: data.db
    ```
- 8.在 main 层判断环境的信息

```js
import { app } from 'electron';
const isBuild = app.isPackaged;
```

- 9.配置`electron`安装包自定义安装目录，`electron-builder.yml`中配置

  ```js
  nsis:
    oneClick: false
    allowToChangeInstallationDirectory: true

  # 具体介绍：
  oneClick：值为布尔类型，true时代表一键安装，false代表一步步安装

  perMachine：值为布尔类型，代表是否显示辅助安装程序的安装模式安装程序页面（选择按机器还是按用户）。true时代表始终按用户安装。

  allowToChangeInstallationDirectory：值为布尔类型，是否允许用户修改安装目录，true为允许，false为不允许

  displayLanguageSelector：布尔类型，是否允许选择语言(默认为系统语言)，true为允许，false为不允许

  language：字符串类型，默认语言

  guid：字符串类型，为应用软件指定guid，此guid会存放在注册表中，如果没有指定则系统会自动生成

  createDesktopShortcut：布尔类型或"always"，是否创建桌面快捷方式，true时表示创建，false表示不创建，"always"代表重新安装时也创建

  include：字符串类型，NSIS包含定制安装程序脚本的路径
  ```

- 10.针对`vite-electron`框架的项目的`main`层的热更新。在`package.json`中的`scripts`里面的命令里面添加`--watch`。
  ```js
  # package.json
  {
    "scripts": {
      ...
      "dev": "electron-vite dev --watch",
    }
  }
  ```
- 11.main 层功能示例。更多关于`main`层操作文件或者其他功能参考：[main-adb.ts][main-adb.ts]及其他代码。

```js
 // 使用electron自带的选择文件或者文件路径弹窗
 # 选择文件弹窗
 import {app, dialog, ipcMain} from 'electron'
 dialog.showOpenDialog({
   title: "选择文件",
   properties: ["openFile"],
   filters: [{name: "zip", extensions: ["zip"]}],
 } as OpenDialogOptions).then(result => {
   console.log(result.filePaths[0])
   if (result.filePaths.length) return this._unzipFile(result.filePaths[0], savePath);
   else return {}
 })

 # 选择文件夹路径
 let {filePaths} = await dialog.showOpenDialog({
   title: '选择文件夹',
   defaultPath: path.join(__dirname, ''),
   properties: ['openDirectory']
 })
```

- 12.关于`electron`的`.ico`应用图标的制作，使用的是`electron-icon-builder`库然后执行相应的命令生成。
  ```js
  # package.json
  {
    "script":{
      ...
      "build-icon": "electron-icon-builder --input=./resources/icon.png --output=build --flatten"
    }
  }
  ```

[main-adb.ts]: /markdown/code/UEMActivate/src/main/adb.ts
[preload-adbApi.ts]: /markdown/code/UEMActivate/src/preload/adbApi.ts
[render-plugin.ts]: /markdown/code/UEMActivate/src/renderer/src/utils/plugin.ts
[render-vue-ApkAction.vue]: /markdown/code/UEMActivate/src/renderer/src/components/adb/ApkAction.vue
[render-api]: /markdown/code/UEMActivate/src/renderer/src/api/user/index.ts
[render-request]: /markdown/code/UEMActivate/src/renderer/src/utils/request/index.ts
