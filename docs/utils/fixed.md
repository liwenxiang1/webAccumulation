<!--
 * @Author: “liwx” “1258598654qq.com”
 * @Date: 2024-08-09 09:46:17
 * @LastEditors: “liwx” “1258598654qq.com”
 * @LastEditTime: 2024-08-09 10:05:00
 * @FilePath: \vuepress-starter\docs\codeBlock\fixed.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

## fixed 从父原则导致 z-index 无效

### 什么是从父原则:

1、子元素在与父辈元素比较的时候，用父辈的 z-index 去比较
2、在与同级元素比较的时候，才有自己的 z-index 去比较

### 什么情况下出现 从父原则

1、父元素通过`fixed absolute relative`定位的元素, 子元素也是`fixed absolute relative`定位的元素。
2、在父元素上设置了`z-index`
3、跟父元素同级的元素也是通过`fixed absolute relative`定位的元素，并且设定了`z-index`

### 代码

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      body,
      html {
        margin: 0;
        padding: 0;
      }
      #father1 {
        width: 50px;
        height: 50px;
        background: red;
        position: absolute;
        /* position: fixed; */
        /* position: relative; */
        bottom: 0;
        right: 0;
        /* TODO: 比father2大 将覆盖father2 */
        z-index: 3;
      }
      #son1 {
        /* 子元素在与父辈元素比较的时候，用父辈的z-index去比较。*/
        /* 在与同级元素比较的时候，才有自己的z-index去比较  */
        width: 100vw;
        height: 100vh;
        background: orange;
        /* position: absolute; */
        /* position: fixed; */
        position: relative;
        top: 0;
        left: 0;
        z-index: 10;
      }
      #son2 {
        width: 100px;
        height: 100px;
        background: black;
        position: fixed;
        top: 0;
        left: 0;
        color: #fff;
        z-index: 8;
        /* TODO: 打开将覆盖son1 因为比它们是同级，且son2 z-index比较大 */
        /* z-index: 100; */
      }
      .father2 {
        /* TODO: 出现从父原则的情况: 在fixed的父元素设relative和z-index */
        /* position: fixed; */
        /* position: relative; */
        position: fixed;
        z-index: 1;
        /* TODO: 打开将覆盖father1 因为son1和father1不同级,然后father2比father1的z-index大 */
        /* z-index: 10; */
      }
    </style>
  </head>
  <body>
    <div id="father1">father1</div>
    <div class="father2">
      <div id="son1">子元素1</div>
      <div id="son2">子元素2</div>
    </div>
  </body>
</html>
```