<!--
 * @Author: “liwx” “1258598654qq.com”
 * @Date: 2024-08-20 16:00:29
 * @LastEditors: “liwx” “1258598654qq.com”
 * @LastEditTime: 2025-04-22 11:17:23
 * @FilePath: \webAccumulation\docs\accumulation\prototype.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

# 原型和原型链

## 什么是原型和原型链

1、显式原型：每一个类（构造函数）都有一个显式原型 prototype 对象。只有方法才有

2、隐式原型：每一个实例都有一个隐式原型*proto*，只有对象有

3、每一个函数都有 prototype,指向原型对象，prototype 的所有方法和属性，都能被通过构造函数所创建的实例继承

4、prototype 对象（原型对象）有一个 constructor 属性，默认指向 prototype 对象的构造函数

```js
function foo() {}
constructor: foo;
```

## 使用 new 创建对象后的内存表现

![](../img/创建对象的原型表现.png)

# 继承的方式

## 1、原型链继承（new）

```js
function fatherTn() {
	this.some = '父类的this属性',
    this.say=fuction(){
        console.log('我是父类')
    }
}
fatherFn.prototype.fatherSome = '父类原型对象的属性或者方法'

//子类
function sonFn() {
	this.boo = '子类的this属性'
}

//核心步骤：重写子类的原型对象
sonFn.prototype = new fatherFn() //将fatherFn的实例赋值给sonFn的prototype
sonFn.prototype.sonFnSome = '子类原型对象的属性和方法' //子类的属性或者方法声明在后面，避免被覆盖

//实例化子类
const sonFnInstance = new sonFn()
sonFnInstance.say() //我是父类
console.log(sonFnInstance.some) //父类的this属性
console.log(sonFnInstance.fatherSome) //父类原型对象的属性或者方法
console.log(sonFnInstance.sonFnSome) //子类原型对象的属性和方法


function sonFn2 (name){
    this.name = name
}
sonFn2.prototype = new fatherFn()
const sonFInstance2 = new sonFn2('张三')
console.log(sonFInstance2.name) //张三
console.log(sonFInstance2.some) //父类的this属性
sonFInstance2.say() //我是父类

```

**原型链继承获取父类的属性和方法**

1. `fatherFn`通过 this 声明的属性和方法都会绑定在`new`期间创建的新对象上
2. 新对象的原型是`fatherFn.prototype`，通过原型链的`_proto_`属性查找到`fatherFn.prototype`的属性和方法上

**理解`new`做了什么**

> new 的定义是：new 运算符创建一个自定义对象类型的实例或者具有构造函数的内置对象的实例

1. 创建一个全新的对象
2. 这个新对象的原型（`_proto_`）指向函数的 prototype
3. 改变 this 的指向，指向该空对象
4. 对构造函数的返回值做判断，然后返回对应的值

   - 一般是返回第一步创建的空对象
   - 但是`构造函数有返回值`时 需要做判断，是`对象类型则返回该对象`，是`原始类型则返回第一步创建的空对象`

     **使用原型链继承的缺点**
     1、父类使用`this`声明的属性被所有实例共享

     > 原因是：实例化父类（`sonFn.prototypr = new fatherFn()`）是一次性赋值到子类实例原型（`son.prototype`）上，他会将父类通过 `this` 声明的属性也赋值到子类的 `prototype` 上

## 2、借用构造函数继承

**一经调用 `call/apply` 就会立即执行函数，并在函数执行时改变 this 的指向**

```js
fatherFn.call(this, ...args);
```

1. 在子类中使用 call 调用父类，fatherFn 将会被立即执行，并将 `fatherFn` 函数的 `this` 指向 `sonFn` 的 `this`
2. 因为函数执行了，所以 `fatherFn` 使用 `this` 声明的函数都会生命到 `sonFn` 的 `this` 对象下
3. 对`fatherFn.prototype` 没有任何影响

**使用该继承方法的优缺点**

优点：

1. 可以向父类传递参数
2. 解决了原型链继承中：杜绝使用 this 声明的属性会在所有的实例中共享的问题

缺点：

1. 只能继承父类通过 `this` 声明的属性、方法，不能继承父类 `prototype` 上的属性和方法
2. 父类方法无法复用：因为无法继承父类 `prototype`，所以每次实例化都要执行父类方法，重新声明 `this` 里所定义的方法，因此无法复用

## 3、寄生组合式继承

```js
function Person(name, age, friends) {
  this.name = name;
  this.age = age;
  this.friends = friends;
}
Person.prototype.running = function () {
  console.log(this.name + '在跑步');
};
function Student(name, age, friends, score) {
  Person.call(this, name, age, friends);
  this.score = score;
}
inheritPrototype(Student, Person);
Student.prototype.sayScore = function () {
  console.log(this.score);
};

// 工具函数---继承原型
function inheritPrototype(subType, superType) {
  // 创建新对象，并将prototype指向父类的prototype，此时constructor是指向父类的
  subType.prototype = Object.create(superType.prototype);
  // 将subType的prototype.constructor指向自己
  // subType.prototype.constructor = subType;
  // Object.defineProperty精准控制constructor是否可枚举，可编辑
  Object.defineProperty(subType.prototype, 'constructor', {
    value: subType,
    enumerable: false,
    writable: true,
    configurable: true,
  });
}
```

## 4、class 继承

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  running() {

}
```

# 原型判断方法

```js
var obj = {
  name: 'zhangyunlei',
  age: 18,
};
var info = Object.create(obj, {
  value: '张三',
  enumerable: true,
});
// 1、判断是否是自身的属性
console.log(info.hasOwnProperty('value')); //true
///2、 in 操作符 判断存在该属性，不管是自身的还是原型上的
console.log('value' in info); //true
console.log('name' in info); //true
// 3、 instanceof 判断是否是某个构造函数的实例,判断Object.prototype是否出现在info的原型链上
console.log(info instanceof Object); //true
// 4、isPrototypeOf 检查某个对象是否出现在另一个对象的原型链上
console.log(Object.prototype.isPrototypeOf(info)); //true
```
