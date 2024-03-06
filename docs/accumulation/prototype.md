# 原型和原型链

## 什么是原型和原型链

1、显示原型：每一个类（构造函数）都有一个显示原型 prototype 对象

2、隐式原型：每一个实例都有一个隐式原型*proto*

3、每一个函数都有 prototype,指向原型对象，prototype 的所有方法和属性，都能被通过构造函数所创建的实例继承

4、prototype 对象（原型对象）有一个 constructor 属性，默认指向 prototype 对象的构造函数

## 原型链继承（new）

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

## 借用构造函数继承

**一经调用 `call/apply` 就会立即执行函数，并在函数执行时改变 this 的指向**

```js
fatherFn.call(this, ...args)
```

1. 在子类中使用 call 调用父类，fatherFn 将会被立即执行，并将 `fatherFn` 函数的 `this` 指向 `sonFn` 的 `this`
2. 因为函数执行了，所以 `fatherFn` 使用 `this` 声明的函数都会生命到 `sonFn` 的 `this` 对象下
3. 对`fatherFn.prototype` 没有任何影响

**使用该继承方法的优缺点**

优点：

1. 可以向父类传递参数
2. 解决了原型链继承中：杜磊使用 this 声明的属性会在所有的实例中共享的问题

缺点：

1. 只能继承父类通过 `this` 声明的属性、方法，不能继承父类 `prototype` 上的属性和方法
2. 父类方法无法复用：因为无法继承父类 `prototype`，所以每次实例化都要执行父类方法，重新声明 `this` 里所定义的方法，因此无法复用
