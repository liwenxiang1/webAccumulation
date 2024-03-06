<!--
 * @Author: liwenxiang
 * @Date: 2024-03-04 22:15:44
 * @LastEditors: liwenxiang
 * @LastEditTime: 2024-03-04 22:29:58
-->

# Object.defineProperty

Object.defineProperty 的作用就是直接在一个对象上定义一个新属性，或者修改一个属性。并返回该对象

## Object.defineProperty 的参数

Object.defineProperty 需要三个参数

`Object.defineProperty(obj,prop,desc)`

- obj:需要定义属性的当前对象
- prop:当前需要定义的属性名
- desc:操作符 一般是一个对象

```js
 {

    value:'属性的值',
    enumerable:true,//控制是否可枚举，默认值是 false
    writable:true,//控制属性是否可以被修改，默认值微 false
    configurable:true,//控制属性是否可以被删除，默认值微 false

 }
```

## get/set 方法

> get/set 设置时，不能同时设置 writable 和 value,会报错

```js
let obj = {
	singer: '周杰伦'
}
let value = '青花瓷'
Object.defineProperty(obj, 'music', {
	enumerable: true, // 设置可枚举
	get() {
		// 获取obj.music的时候就会调用get方法
		// let value = "强行设置get的返回值"; // 打开注释 读取属性永远都是‘强行设置get的返回值’
		return value
	},
	set(val) {
		// value = val; // 将修改的值重新赋给song
		value = '强行设置修改的值'
	}
})

console.log(obj.music) // 青花瓷
delete obj.music // 删除无效
console.log(obj.music) // 青花瓷
obj.music = '听妈妈的话'
console.log(obj.music) // 强行设置修改的值
for (let key in obj) {
	console.log(key) // singer, music 上面设置了enumerable可枚举
}
```
