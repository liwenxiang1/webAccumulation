<!--
 * @Author: “liwx” “1258598654qq.com”
 * @Date: 2024-08-09 11:23:35
 * @LastEditors: “liwx” “1258598654qq.com”
 * @LastEditTime: 2024-08-09 11:23:50
 * @FilePath: \vuepress-starter\docs\utils\app-loading.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

## loadding 效果-移动端小球上下浮动

### 可能动画没有那么顺畅，可以自己在代码中调试一下参数，包括 loading 大小、动画参数。

```html
<div class="loadding_father">
  <div class="loadding1"></div>
  <div class="loadding2"></div>
  <div class="loadding3"></div>
</div>
```

```css
/* 外层居中 */
.loadding_father {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}
/* 三个小圆圈 */
.loadding_father div {
  border-radius: 50%;
  background: rgba(216, 216, 216, 1);
}
/* 动画和圆圈大小 */
.loadding1 {
  /* 1.2s 是持续时间 */
  animation: myfirst 1.2s infinite linear;
  width: 10px;
  height: 10px;
}

.loadding2 {
  animation: myfirst2 1.2s infinite linear;
  /* 0.3s是延迟时间 为了有层次感 */
  animation-delay: 0.3s;
  margin: 0 7px 0 5px;
  width: 8px;
  height: 8px;
}

.loadding3 {
  animation: myfirst3 1.2s infinite linear;
  animation-delay: 0.5s;
  width: 6px;
  height: 6px;
}

/* 动画 上下浮动值 */
@keyframes myfirst {
  0% {
    transform: translate(0px, 0px);
  }

  50% {
    transform: translate(0px, -10px);
  }

  100% {
    transform: translate(0px, 0px);
  }
}

@keyframes myfirst2 {
  0% {
    transform: translate(0px, 0px);
  }

  50% {
    transform: translate(0px, -10px);
  }

  100% {
    transform: translate(0px, 0px);
  }
}

@keyframes myfirst3 {
  0% {
    transform: translate(0px, 0px);
  }

  50% {
    transform: translate(0px, -10px);
  }

  100% {
    transform: translate(0px, 0px);
  }
}
```
