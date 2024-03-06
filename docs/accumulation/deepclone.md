<!--
 * @Author: liwenxiang
 * @Date: 2024-03-05 09:18:19
 * @LastEditors: liwenxiang
 * @LastEditTime: 2024-03-05 13:32:12
-->

# 深拷贝和浅拷贝

## 什么是深拷贝和浅拷贝

**浅拷贝**

浅拷贝是指将对象或数组的值复制到一个新对象或数组中，但是新对象中的元素或属性依然是源对象的引用，这意味着当我们修改其中一个对象时，另一个对象会收到影响。

**浅拷贝的实现方法**

1. `Object.create(obj)`

Object.create()方法可以用于创建一个新对象，并将原对象作为新对象的原型。这样，新对象就可以访问源对象的所有属性和方法

_示例代码_

```js
const a = { name: '张三', age: 18 }
const b = Object.create(a)
console.log(b.name) //张三

a.name = '李四'
console.log(b.name) //李四
```

2.  `Object.assgin({},obj)`

    Object.assgin()方法用于将一个或者多个对象的属性赋值到目标对象中,语法如下：

> Object.assgin(target,...source)

其中 target 是目标对象，soruce 是一个或者多个对象。该方法会遍历所有源对象的可枚举属性，并将其复制到目标对象中。如果目标对象中有相同属性，则**已有属性会被后面的覆盖**

需要注意的是，该方法**只会复制对象自身的属性，不会复制原型链上的属性**，如果源对象中有值为**null 或者 Undefined 的属性，也不会被复制**

示例代码：

```js
let a = {
	name: '张三',
	like: {
		n: 'code'
	}
}
let b = Object.assgin({}, a)

a.name = '李四'
a.like.n = 'running'
console.log(b.name) //张三
console.log(b.like.n) //running
```

产生这个效果的原因是：当 a 中的原始类型属性被修改时，b 中的这个属性时不会跟着修改的，但是引用类型则不然，这是因为原始类型和引用类型的存放位置不同，在代码执行时，原始类型的值存放在调用栈中，而引用类型的值会被放入堆中，如果对这点有一会可以看一下[关于数据类型分类，构造函数和包装类的重要底层原理](https://juejin.cn/post/7301909438587600937)

新对象 b 中从 a 中复制过来的所有原始类型的属性都是新属性，在 b 的执行上下文中具有自己的空间地址，而复制过来的引用类型 like 的值并不是真正的值，是它在堆中的引用地址，所以在上述代码中**b.like 和 a.like 仍然是同一个对象**，它们在调用栈中的值都指向同一个堆中的地址，所以**当 a.like 中的属性被修改时，b.like 的属性也变了。**

3. `[].concat(arr)`

[].concat() 方法可以用于将一个或多个数组合并成一个新数组。

示例代码：

```js
let arr = [1, 2, 3]
let newArr = [].concat(arr)
arr.push(4)
arr[0] = 10
console.log(newArr) //输出[1,2,3]
```

这个时候修改原数组 arr,newArray 中的值不会跟着改变，下面将数组内的原始类型换成引用类型试试

```js
let arr = [1, 2, { name: '张三' }]
let newArr = [].concat(arr)
arr[2].name = '李四'
console.log(newArr) //输出[1,2,{name:"李四"}]
```

4. 数据结构 [.arr]

数组结构是一种将数组或类数组中的对象提取出来，赋值给变量的方法。他可以让我们更方便的访问数组元素

[...arr]代码示例

```js
let arr = [1, 2, { name: '张三' }]
let newArr = [...arr]
newArr[3].name = '李四'
console.log(newArr) //输出[1,2,{name:'李四'}]
```

5. `arr.slice()`

slice()是 js 数组对象的一个方法，用户从数组中提取指定区间的元素创建一个新的数组，并不会对原数组产生影响。他接受两个参数：开始所以和结束索引，当参数为空时，则会复制整个数组，这意味着返回的新数组与原数组具有相同的元素、长度和顺序

示例：

```js
const arr1 = [1, 2, 3]
const arr2 = arr1.slice()
console.log(arr2) //[1,2,3]
```

**深拷贝**

深拷贝是指原对象或数组的值复制到一个新的对象或数组中，并且新的对象的属性或元素完全独立于原对象或数组，即他们不共享引用地址。因此，当我们修改其中一个对象或数组时，另一个不受影响

常用方法 `JSON.parse(JSON.stringify())` 和 `Jquery.extend()`
