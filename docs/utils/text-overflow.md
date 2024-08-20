<!--
 * @Author: “liwx” “1258598654qq.com”
 * @Date: 2024-08-09 14:25:57
 * @LastEditors: “liwx” “1258598654qq.com”
 * @LastEditTime: 2024-08-09 14:27:08
 * @FilePath: \vuepress-starter\docs\utils\text-overflow.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

# 单行、多行文本溢出

```html
<p class="one">单行文本溢出显示省略号</p>
<p class="moreLine">多行文本溢出显示省略号 啦啦啦啦啦啦 哈哈哈哈</p>
```

```css
.one {
  width: 100px; /* 记住要限定宽度 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.moreLine {
  width: 100px; /* 记住要限定宽度 */
  /*   height:300px; */ /* 也要限制高度，这边是自适应了 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* 限定几行文字溢出 */
  overflow: hidden;
}
```
