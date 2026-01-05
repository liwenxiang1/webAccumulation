## js 延迟加载的几种方式

1. **defer 属性**

**用途：** 表明脚本在执行时不会影响页面的构造。也就是说，脚本会被延迟到整个页面都解析完毕之后再执行。
在`<script>` 元素中设置 `defer` 属性，等于告诉浏览器立即下载，但延迟执行。

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="test1.js" defer="defer"></script>
    <script src="test2.js" defer="defer"></script>
  </head>
  <body>
    <!-- 这里放内容 -->
  </body>
</html>
```

`HTML5`规范要求脚本按照它们出现的先后顺序执行。在现实当中，延迟脚本并不一定会按照顺序执行。

`defer`属性只适用于外部脚本文件。支持 HTML5 的实现会忽略嵌入脚本设置的 defer 属性。

2. **async 属性**

**目的：** 不让页面等待脚本下载和执行，从而异步加载页面其他内容。

HTML5 为 `<script>`标签定义了 `async` 属性。与 `defer` 属性类似，都用于改变处理脚本的行为。同样，只适用于外部脚本文件。

异步脚本一定会在**页面 load 事件前执行**。

**不能保证脚本会按顺序执行。**

> 注意：`async `和 `defer` 一样，都**不会阻塞其他资源下载**，所以**不会影响页面的加载**。
> 缺点：**不能控制加载的顺序**

3. 动态创建 DOM 方式
   将创建 DOM 的 `script` 脚本放置在标签前， 接近页面底部

```js
<script type="text/javascript">
   (function(){     var scriptEle = document.createElement("script");
     scriptEle.type = "text/javasctipt";
     scriptEle.async = true;
     scriptEle.src = "http://cdn.bootcss.com/jquery/3.0.0-beta1/jquery.min.js";
     var x = document.getElementsByTagName("head")[0];
     x.insertBefore(scriptEle, x.firstChild);
 })();</script>

```

4. 使**用 `jquery` 的 `getScript` 方法**

```js
$.getScript('outer.js', function () {
  //回调函数，成功获取文件后执行的函数
  console.log('脚本加载完成');
});
```

5. **使用 `settimeout` 延迟方法**

   延迟加载 js 代码，给网页加载留出更多时间

   ```js
   <script type="text/javascript">
   function testLoad() {
       console.log("11");
        //.....这里可以写向后端的请求
   }
   (function(){
        setTimeote(function(){            testLoad();
        }, 1000); //延迟一秒加载    })()
   </script>
   ```

6. **让 js 最后加载。**

   把 `js` 外部引入的文件放到页面底部，来让 `js` 最后引入，从而加快页面加载速度
