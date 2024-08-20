## 移动端手写下拉刷新

### 思路

1. 使用 touchstart、touchmove、touchend 三个事件来监听触摸事件
2. 使用 getBoundingClientRect()API 来判断当前 dom 是否在顶部(之前使用 document.body.scrollTop 并不行，然而搜到的都是这个答案。)
3. 最后一个是根据事件传递进来的参数用以计算距离。
4. 剩下的就是具体的逻辑问题

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      .content_father div {
        height: 200px;
        background: gray;
        margin-bottom: 10px;
      }
    </style>
  </head>

  <body>
    <div>F12开启浏览器手机模拟器，在顶部鼠标按住移动</div>
    <div class="content_father">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <script>
      let content = document.querySelector('.content_father');
      let startSite = 0; // 触摸的起始位置
      let sendAjax = false; // 发送请求
      content.ontouchstart = (e) => {
        let contentSite = content.getBoundingClientRect();
        if (contentSite.y >= 0) {
          console.log('在顶部');
          startSite = e.touches[0].pageY;
          // 在顶部才绑定事件
          content.ontouchmove = touchmoveFn;
          content.ontouchend = touchendFn;
        }
      };
      // 开始移动
      function touchmoveFn(e) {
        // 在浏览器顶部
        let moveDistance = e.touches[0].pageY - startSite; // 相差高度
        const DISTANCE = 100; // 下滑距离超过100就刷新
        const DISTANCE_FONT = 50; // 下滑距离超过50 就显示文案
        if (moveDistance > DISTANCE) {
          // 下滑足够距离
          sendAjax = true;
          console.log('展示 刷新页面文案');
        } else if (0 < moveDistance < DISTANCE_FONT) {
          // 下滑距离不足
          sendAjax = false; // 实时更改是否发送请求
          console.log('展示：继续下滑刷新页面文案');
        } else {
          // 上拉 取消请求
          sendAjax = false; // 实时更改是否发送请求
        }
        console.log('滑动距离', moveDistance);
      }
      // 触摸结束
      function touchendFn(e) {
        let contentSite = content.getBoundingClientRect();
        // 判断在顶部
        if (contentSite.y >= 0) {
          // 并且上次上滑超过100
          if (sendAjax) {
            console.log('发送 请求');
          }
        }
        // 清除事件
        content.ontouchmove = null;
        content.ontouchend = null;
      }
    </script>
  </body>
</html>
```
