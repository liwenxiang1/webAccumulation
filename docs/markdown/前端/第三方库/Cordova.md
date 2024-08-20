# Cordova文档



### 一、常用命令

```
npm install -g cordova                 // 安装 cordova
 
npm update -g cordova                  // 更新 cordova
 
npm info cordova                       // 查看 cordova 信息
 
cordova platform [ls | list]           // 查询工程支持哪些平台
 
cordova platform update android        // 更新 android 项目
 
cordova platform update ios            // 更新 ios 项目
 
cordova create myapp                   // 创建一个 Cordova 项目
 
cordova requirements                   // 查看安装 cordova 所需要的配置
 
cordova help create                    // cordova 帮助命令
 
cordova platform add browser           // 创建浏览器文件
 
cordova platform add ios               // 创建 ios 版本
 
cordova platform add android           // 创建安卓版本
 
cordova build android --release --prod // 打包出 APK 文件 
 
cordova platform rm android            // 删除 android 平台支持
 
cordova platform rm ios                // 删除 ios 平台支持
 
cordova platform up android            // 更新 android 平台版本
 
cordova platform up ios                // 更新 ios 平台版本
 
 
cordova plugin [ls | list]             // 查询工程包含的插件列表
 
// 为工程添加一个或者多个插件
cordova plugin add <path-to-plugin> [<path-to-plugin>...]
cordova plugin add cordova-plugin-device
cordova plugin add https://github.com/apache/cordova-plugin-console.git
 
// 从该工程中删除某个插件
cordova plugin [rm | remove] <path-to-plugin> [<path-to-plugin>...]
cordova plugin rm cordova-plugin-device
cordova plugin remove cordova-plugin-device
 
// 根据关键字搜索插件
cordova plugin search [<keyword1> <keyword2> ...]
cordova plugin search camera
 
 
// 编译指定平台的 app 包
cordova build [platform...]
cordova build ios
cordova build android   相当于  cordova prepare android | cordova compile android
cordova build browser
 
// 启动模拟器运行应用
cordova emulate [<platform> [<platform> [...]]]
cordova emulate android
 
// 在移动设备上运行应用
cordova run [<platform> [<platform> [...]]]
cordova run android
cordova run ios
 
// 启动本地 web 服务来访问
cordova serve [port]
cordova serve 或 cordova serve 8080
```



### 二、常用网址

[ionic官网](https://ionicframework.com/docs)

[cordova官网](https://cordova.apache.org/)





