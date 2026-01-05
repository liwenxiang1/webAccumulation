<!--
 * @Author: “liwx” “1258598654qq.com”
 * @Date: 2025-04-22 15:58:19
 * @LastEditors: “liwx” “1258598654qq.com”
 * @LastEditTime: 2025-04-23 09:51:52
 * @FilePath: \webAccumulation\docs\markdown\前端\ES6\Class.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

# Class 定义类

> 是构造函数和原型链的语法糖，不能被当成普通函数调用
> 只能是单继承

## 基本语法

```js
class Person {
  // 构造方法---接受参数 作用等同于 function Person(name,age)，通过new关键字默认调用
  //   一个类只有一个构造函数
  //   new调用步骤
  //  1、内存中创建对象 moni={}
  // 2、降类的原型赋值给创建的对象moni.__proto__ = Person.prototype
  //  3、将对象赋值给函数的this this = moni
  //  4、执行函数体中代码
  // 5、自动返回创建的对象
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this._address = '北京';
  }
  //   方法是放在Person的原型上的
  say() {
    console.log(`我叫${this.name},今年${this.age}岁`);
  }
  running() {
    console.log(`我叫${this.name},今年${this.age}岁,正在跑步`);
  }
  //   类的访问器。拦截获取以及赋值动作(少用)
  get address() {
    return this._address;
  }
  set address(value) {
    this._address = value;
  }

  //   类的静态方法 用Person.createPerson()访问
  static createPerson() {
    return new Person('张三', 18);
  }
}
```

或者(很少用)

```js
var animal = class {};
```

class 也有自己的 prototype.也有自己的 constructor 指向 Person 对象

使用`new`关键字创建实例,实例的`__proto__`指向构造函数的 `prototype`

```js
var p1 = new Person('张三', 18);
// p1.__proto__ === Person.prototype
```

## 类的继承

```js
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age); // js引擎解析代码时要求调用父类的构造函数 // 必须有
    this.grade = grade;
  }
  //   继承过来的父类方法，其实在父类的原型上，所以子类可以重写父类方法
  say() {
    super.say(); // 调用父类方法,复用父类的逻辑
    console.log(`我叫${this.name},今年${this.age}岁`);
  }
  studying() {
    console.log(`我叫${this.name},今年${this.age}岁,在读${this.grade}年级`);
  }
}
```
