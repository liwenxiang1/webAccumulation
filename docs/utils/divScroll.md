# 判断 div 滚动到底部

> 如果 scroll 事件不触发的话，很可能是 scorll 事件绑错 div 了！

```js
et dom = document.querySelector('textarea')
// div滚动事件
dom.onscroll = () => {
	// 意思就是内容总体的高度 - 滚动条的偏移值  === 元素的高度(包含内边)但不包含外边距，边框，以及滚动条
	if (dom.scrollHeight - dom.scrollTop === dom.clientHeight) {
		console.log('到达底部 do something')
	}

	// div滚到时：离底部不到30px时触发
	if (dom.scrollHeight - dom.scrollTop - dom.clientHeight <= 30) {
		console.log('离底部不到30px 提前发送请求')
	}
}
```
