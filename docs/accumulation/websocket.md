<!--
 * @Author: liwenxiang
 * @Date: 2024-03-04 17:18:46
 * @LastEditors: liwenxiang
 * @LastEditTime: 2024-03-04 18:19:28
-->

# websocket

> websocket 是一种基于 TCP 协议的实时通讯协议，为前端应用提供了强大的双向通讯能力

## wensocket 例子：

```js
function socketConnect(url){
    //客户端和服务器进行连接
    let ws = new WebSocket(url) //返回WebSocket对象，赋值给ws
    //连接成功的回调
    ws.onopen =e =>{
        console.log('连接成功',e)
        ws.send('发送消息给服务端')
    }
    //监听服务器返回消息
    ws.onmessage =e =>{
        console.log('接收到服务器返回的值'e.data)
    }
    return ws
}

let wsValue = socketConnect('ws://121.40.165.18:8800')
```

**webSocket 的 class 类**

当项目中很多地方用到 websocket 时，把它封装成一个 class 类，是更好的选择

```js
class WebSocketClass {
	/**
	 * @description: 初始化实例属性，保存参数
	 * @param {String} url ws的接口
	 * @param {Function} msgCallback 服务器信息的回调传数据给函数
	 * @param {String} name 可选值 用于区分ws，用于debugger
	 */
	constructor(url, msgCallback, name = 'default') {
		this.url = url
		this.msgCallback = msgCallback
		this.name = name
		this.ws = null // websocket对象
		this.status = null // websocket是否关闭
	}
	/**
	 * @description: 初始化 连接websocket或重连webSocket时调用
	 * @param {*} 可选值 要传的数据
	 */
	connect(data) {
		// 新建 WebSocket 实例
		this.ws = new WebSocket(this.url)
		this.ws.onopen = e => {
			// 连接ws成功回调
			this.status = 'open'
			console.log(`${this.name}连接成功`, e)
			// this.heartCheck();
			if (data !== undefined) {
				// 有要传的数据,就发给后端
				return this.ws.send(data)
			}
		}
		// 监听服务器端返回的信息
		this.ws.onmessage = e => {
			// 把数据传给回调函数，并执行回调
			if (e.data === 'pong') {
				this.pingPong = 'pong' // 服务器端返回pong,修改pingPong的状态
			}
			return this.msgCallback(e.data)
		}
		// ws关闭回调
		this.ws.onclose = e => {
			this.closeHandle(e) // 判断是否关闭
		}
		// ws出错回调
		this.onerror = e => {
			this.closeHandle(e) // 判断是否关闭
		}
	}
	heartCheck() {
		// 心跳机制的时间可以自己与后端约定
		this.pingPong = 'ping' // ws的心跳机制状态值
		this.pingInterval = setInterval(() => {
			if (this.ws.readyState === 1) {
				// 检查ws为链接状态 才可发送
				this.ws.send('ping') // 客户端发送ping
			}
		}, 10000)
		this.pongInterval = setInterval(() => {
			this.pingPong = false
			if (this.pingPong === 'ping') {
				this.closeHandle('pingPong没有改变为pong') // 没有返回pong 重启webSocket
			}
			// 重置为ping 若下一次 ping 发送失败 或者pong返回失败(pingPong不会改成pong)，将重启
			console.log('返回pong')
			this.pingPong = 'ping'
		}, 20000)
	}
	// 发送信息给服务器
	sendHandle(data) {
		console.log(`${this.name}发送消息给服务器:`, data)
		return this.ws.send(data)
	}
	closeHandle(e = 'err') {
		// 因为webSocket并不稳定，规定只能手动关闭(调closeMyself方法)，否则就重连
		if (this.status !== 'close') {
			console.log(`${this.name}断开，重连websocket`, e)
			if (this.pingInterval !== undefined && this.pongInterval !== undefined) {
				// 清除定时器
				clearInterval(this.pingInterval)
				clearInterval(this.pongInterval)
			}
			this.connect() // 重连
		} else {
			console.log(`${this.name}websocket手动关闭`)
		}
	}
	// 手动关闭WebSocket
	closeMyself() {
		console.log(`关闭${this.name}`)
		this.status = 'close'
		return this.ws.close()
	}
}
function someFn(data) {
	console.log('接收服务器消息的回调：', data)
}
// const wsValue = new WebSocketClass('ws://121.40.165.18:8800', someFn, 'wsName'); // 这个链接一天只能发送消息50次
const wsValue = new WebSocketClass('wss://echo.websocket.org', someFn, 'wsName') // 阮一峰老师教程链接
wsValue.connect('立即与服务器通信') // 连接服务器
setTimeout(() => {
	wsValue.sendHandle('传消息给服务器')
}, 1000)
setTimeout(() => {
	wsValue.closeMyself() // 关闭ws
}, 10000)
```

**WebSocket 心跳机制：**

> 因为某些未知原因连接断开但是没有触发 error 或 close 事件，这样就导致实际连接已经断开了，但是服务端和客户端都不知道，还在等待对方回应，**心跳机制**是一种不错的选择

客户端就像心跳一样每隔一段时间就发送一次 `ping`，来告诉服务器我还活着，而服务器也会返回`pong`来响应客户端

## websocket 的基础知识点

###Websocket 的当前状态（Websocket.readyState）：
四个状态值：

- 0：正在连接
- 1：连接成功，可以通信了
- 3：连接正在关闭
- 4： 连接关闭或者连接失败

我们可以利用当前状态来做一些处理，比如上面例子中 Websocket 连接成功后，再允许客户端发送 ping

```js
if (this.ws.readyState == '1') {
	this.ws.send('ping')
}
```

### 与 HTTP 协议相比，有一下区别

- 实时性：websocket 提供了低延迟的实时通信能力，能够在服务端有新数据时立即推送消息给客户端
- 双向信息：websocket 支持客户端与服务器之间的双向通信。可以实时数据更新
- 较低的网络开销：websocket 使用长连接，提高了性能
- 跨域支持：具有跨域通信的能力，没有同源机制
- websocket 使用了 ws://、wss://的前缀
- 数据格式：websocket 支持字符串和二进制数据

### webscoket 建立过程是怎样的？

- 客户端发送 websocket 握手请求，请求头包括 Upgrade 和 connection 字段，指定协议升级和建立连接
- 服务器收到握手请求后，验证请求头字段，并返回握手响应，添加了一个 Aec-Websocket-Key 字段
- 客户端收到握手响应后，验证响应头，并生成一个 Sec-websocket-Accept 值进行校验
- 验证成功后 Websocket 连接建立成功，双方就可以进行实时通讯了

### webSocket 事件

- open：连接建立成功时触发事件。可以在此事件中执行初始化操作或向服务器发送初始数据
- message：接收到消息时触发的事件
- error:连接出现错误触发的事件 错误包括连接失败，数据传输错误
- close:连接关闭触发的事件。关闭可能由服务器或客户端发起，可以在此事件中执行清理操作或者重新连接操作
