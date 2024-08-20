## 浏览器原生进度条-progress

### 代码

```html
<progress class="progress_class" max="100" value="80" />
```

```css
.progress_class {
  width: 500px;
  height: 8px;
  // 外部圆角
  overflow: hidden;
  border-radius: 8px 8px 8px 8px;
  /*设置iOS下清除灰色背景*/
  appearance: none;
  -webkit-appearance: none;
}

// 进度条的进度样式
.progress_class::-webkit-progress-value {
  background: linear-gradient(
    90deg,
    rgba(20, 96, 181, 1) 0%,
    rgba(4, 195, 250, 1) 100%
  );
  border-radius: 8px; // 内部的圆角
}

// 进度条未达到部分
.progress_class::-webkit-progress-bar {
  background-color: #d7d7d7; // 进度条未进度 部分
}
```
