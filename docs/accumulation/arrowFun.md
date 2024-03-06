# 箭头函数和普通函数

箭头函数式 ES6 的新特性

## 箭头函数和普通函数的区别

1. 箭头函数没有原型（prototype）所以箭头函数没有 this

```js
let a = () => {}

console.log(a.prototype) //undefined
```

2.箭头函数的 this 指向在第一的时候继承自外层普通函数的 this

```js
function a() {
	setTimeout(() => {
		console.log(this.id)
	})
}
a.call({ id: 11 })
```

3. 不能直接修改箭头函数 this 的指向

> 幸运的是，我们可以通过间接的形式来修改箭头函数的指向：
> 去修改被继承的普通函数的 this 指向，然后箭头函数的 this 指向也会跟着改变，这在上一个栗子中有演示。

```js
a.call({ id: 3 })
```

4. 箭头函数的外层没有普通函数，在严格模式和非严格模式下它的 this 都指向全局变量（window）

普通函数的绑定规则：在非严格模式下，this 指向的全局变量，在严格模式下 this 指向的是 undefined

## 箭头函数的 arguments

1. 如果箭头函数的 this 指向全局，所以使用 arguments 会报未声明的错误

```js
let b = () => {
	console.log(arguments)
}
b(1, 2, 3, 4) // Uncaught ReferenceError: arguments is not defined
```

2. 如果箭头函数的 this 指向普通函数，他的 arguments 继承于该普通函数

```js
function bar() {
	console.log(arguments) // ['外层第二个普通函数的参数']
	bb('外层第一个普通函数的参数')
	function bb() {
		console.log(arguments) // ["外层第一个普通函数的参数"]
		let a = () => {
			console.log(arguments, 'arguments继承this指向的那个普通函数') // ["外层第一个普通函数的参数"]
		}
		a('箭头函数的参数') // this指向bb
	}
}
bar('外层第二个普通函数的参数')
```

**rest 参数获取函数的多余参数**

rest ES6 的 API，用于获取函数不定数量的参数数组，这个 API 是用来替代 arguments 的，API 用法如下

```js
let a = (first, ...b) => {
	console.log(first, b) //1,[2,3,4]
}
a(1, 2, 3, 4)
```

**rest 的使用需要注意两点**

1.  rest 必须是最后一位参数

2.  函数的 length 不包括 rest

**使用 new 调用箭头函数会报错**

因为箭头函数没有 `constructor`

**箭头函数不支持 new.target**

new.target 是 ES6 的新属性，如果普通函数通过 new 调用,new.target 会返回该函数的引用

**箭头函数不支持重命名函数参数,普通函数的函数参数支持重命名**

```js
function func1(a, a) {
	console.log(a, arguments) // 2 [1,2]
}

var func2 = (a, a) => {
	console.log(a) // 报错：在此上下文中不允许重复参数名称
}
func1(1, 2)
func2(1, 2)
```
