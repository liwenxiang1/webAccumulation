# 数组 API 解析合集

数组的使用场景非常多，平日中也涉及到很多数组的 api/相关操作，一直也没有对这块内容进行一块整理总结

## 创建数组

```js
let a = [1, 2, 3]
//构造器，实际上是new Array === Array,可以不加new

let a = Array() // []
let a = Array(2) // [,,]
let a = Array(1, 2, 3) //[1,2,3]
```

## ES6 Array.of

定义：返回由所有参数值组成的数组，如果没有参数，就返回一个空数组

```js
let a = Array.of(2) //[2]
let a = Array.of(1, 2, 3) //[1,2,3]
```

## Es6 Array.from

定义：将两类对象转换为真正的数组（不改变源对象，返回新数组）
参数：

- 第一个参数（必须）：要转化成数组的对象
- 第二个参数（可选）：类似 map,对每个元素进行处理，将处理后的值放入数组
- 第三个参数（可选）：用来绑定 this

```js
let obj = { a: '1', b: 's' }
let arry = Array.from(obj) //[1,s]

//部署了Iterator接口的数据结构，比如字符串，Set、NodeList
let arry = Array.from('he') //['h','e']
let array = Array.from(new Set(['a', 'b'])) //['a','b']
```
