# vant组件使用遇到的问题

### 一、问题记录（这些问题在vant官网都有说明）

* 1.在`vite`项目中使用了`vant`组件自动引入的功能后，`dialog`、`toast`等弹窗组件样式错乱问题
    ```
    //在main.ts文件中引入下面的代码
    // 这几个组件的样式使用 unplugin-vue-components 无法自动引入对应的样式，因此需要手动引入样式
    import 'vant/es/toast/style';
    import 'vant/es/dialog/style';
    import 'vant/es/notify/style';
    import 'vant/es/image-preview/style';
    ```
* 2.因为`vant`组件时针对移动端的，在浏览器端使用时遇到`van-field`组件的`v-model`属性并不生效的问题。
  ```
  添加"@vant/touch-emulator": "^1.4.0",依赖。
  在main.ts中引入：import '@vant/touch-emulator';
  ```
* 3.
