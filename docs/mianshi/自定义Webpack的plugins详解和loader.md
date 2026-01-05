## 自定义 Webpack 插件详解

**关键步骤**

1. 拿到 webpack 环境配置

2. 告诉 webpack 插件在什么时机调用

- **`compiler`对象：代表了完整的 webpack 环境配置。**这个对象在启用 webpack
  时被一次性创建，并配置好所有可用的配置项，包括 `options`，`loader` 和 `plugin`。当在 `webpack`环境中应用一个插件时，插件将收到此`compailer` 对象的引用。可以使用它来访问 `webpack` 的主环境。

- **compilation 对象：该对象代表了一次资源版本构建。**当运行 `webpack `开发环境中间件时，每当检测到一个文件变化，就会创建一个新的 `compilation`，从而生成一组新的编译资源。一个 `compilation` 对象包含了当前的模块资源、编译生成资源、变化的文件等。`compilation` 对象也提供了很多关键时机的回调，以供插件做自定义处理时选择使用。

**钩子的本质就是事件**

1. 自定义 webpack plugins 声明一个 class ,实现构造函数，重写 apply 方法。在 hooks 上寻找时机添加行为

```js
// First-webpack-plugin.js
//创建一个构造函数
class FirstWebpackPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.environment.tap('TestPlugin', () => {
      console.log('TestPlugin environment');
    });
  }
}
// 3. 将我们的自定义插件导出
module.exports = FirstWebpackPlugin;
```

2. 使用 new FirstWebpackPlugin()调用插件

```js
//webpack.config.js
const FirstWebpackPlugin = require('./First-webpack-plugin');

module.exports = {
  // ...
  plugins: [new FirstWebpackPlugin({ name: 'webpack' })],
};
```

## 自定义 loader

> `同步 loader` `异步 loader` `raw loader` `pitch loader`

**同步 loader**

```js
//first-loader.js
module.exports = function (content, map, meta) {
  // 第一个参数，error, 是否有错误，没错null, 有错就把错误传递出去，如果loader出错了。会把错误传递出去
  // 第二个参数：content,处理后的内容。
  // 第三个参数：map  source-map， 继续传递 source-map
  // 第四个参数： meta, 给其他别的loader传递的数据，可以继承传递出去
  let code = content.replace(/console\.log\(.*?\);?/g, '');
  this.callback(null, code, map, meta);
};
```

```js
 module: {
    rules: [
      {
        test: /\.js$/,
        use: './loaders/first-loader.js',
      },
    ],
  }
```

同步 loader 注意：同步 loader 中不能进行异步操作，会报错。下一个 loader 拿到的值是 undefined。

**异步 loader**

> 异步 loader, 一定会等待这个异步 loader 做完，才会执行下一个 loader,**const callback = this.async();**是关键代码

```js
// 异步loader
module.exports = function (content, map, meta) {
  const callback = this.async();
  console.log('test2', content);
  setTimeout(() => {
    console.log('test2');
    callback(null, content, map, meta);
  }, 1000);
};
```

**raw loader**

> raw loader 接收到的 content 是 buffer (二进制数据); 当我们处理图片，字体图标的时候会使用定义这种 loader;

```js
// raw loader
// raw loader接收到的 content 是 buffer数据（二进制数据）
module.exports = function (content) {
  console.log('raw loader接收到的数据:', content); // 接收的数据是 buffer数据
  return content;
};
module.exports.raw = true; //关键代码
```

**pitch loader**

> pitch loader 要求在暴露的对象中添加 pitch 方法，pitch 方法是在执行 loader 之前执行
> **loader API**

> |         方法名          |                   含义                   |                      用法                      |
> | :---------------------: | :--------------------------------------: | :--------------------------------------------: |
> |       this.async        |    异步回调 loader,返回 this.callback    |         const callback = this.async()          |
> |      this.callback      | 可以同步或者异步调用并返回多个结果的函数 | this.callback(err, content, sourceMap?, meta?) |
> | this.getOptions(schema) |          获取 loader 的 options          |            this.getOptions(schema)             |
> |      this.emitFile      |               产生一个文件               |     this.emitFile(name,content,sourceMap)      |
> |  this.utils.contextify  |             返回一个相对路径             |    this.utils.contextify(context, request)     |
> |  this.utils.absolutify  |             返回一个绝对路径             |    this.utils.absolutify(context, request)     |
