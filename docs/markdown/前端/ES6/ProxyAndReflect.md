# Proxy and Reflect

场景：监听对象属性设置和获取的行为

## Object.defineProperty 监听对象（方式 1）

> - 设计出众是定义属性描述符，不是监听属性
> - 不能监听对象新增属性和删除属性

```js
const obj = {
  name: 'zhangsan',
  age: 18,
};
// 监听对象具体属性的变化
Object.defineProperty(obj, 'name', {
  get() {
    console.log('获取name监听');
    return obj.name;
  },
  set(newValue) {
    console.log('设置name监听');
    obj.name = newValue;
  },
}
// 监听一个对象多有的属性
Object.keys(obj).forEach((key) => {
  let value = obj[key];
  Object.defineProperty(obj, key, {
    get() {
      console.log(`获取${key}监听`);
      return value;
    },
    set(){
        value = newValue;
         console.log(`设置${key}监听`);
    }

  }
}

```

## Proxy 监听对象（方式 2）

ES6 新增一个 Proxy 类，帮助我们创建一个代理对象。所有的操作都会先经过这个代理对象，然后由它来决定如何处理。重写其中 13 种捕获器

```js
const obj = {
  name: 'zhangsan',
  age: 18,
};
// new Proxy(obj,{}) 第一个参数是代理对象，第二个参数是拦截器
const proxyObj = new Proxy(obj, {
  // target是原对象，key是属性名,receiver是代理对象
  get(target, key, receiver) {
    console.log(`获取${key}监听`);
    return target[key];
  },
  // target是原对象，key是属性名,value是属性值,receiver是代理对象
  set(target, key, value, receiver) {
    console.log(`设置${key}监听`);
    target[key] = value;
  },
  //   in操作符
  has: (target, key) => {
    return key in target;
  },
  //   删除
  deleteProperty: (target, key) => {
    delete target[key];
  },
});
console.log(proxyObj.name);
proxyObj.name = 'lisi';
console.log(proxyObj.name);
```

> 其他捕获器
>
> - get(target, key, receiver)
>   - target[key]
> - set(target, key, value, receiver)
>   - target[key] = value
> - has(target, key)
>   - key in target
> - deleteProperty(target, key)
>   - delete target[key]
> - apply(target, ctx, args)
>   - target(...args)
> - construct(target, args, newTarget)
>   - new target(...args)
> - defineProperty(target, key, descriptor)
>   - Object.defineProperty(target, key, descriptor)
> - isExtensible(target, receiver)
>   - Object.isExtensible(target)
> - preventExtensions(target, receiver)
>   - Object.preventExtensions(target)
> - getOwnPropertyDescriptor(target, key, receiver)
>   - Object.getOwnPropertyDescriptor(target, key)
> - defineProperty(target, key, descriptor, receiver)
>   - Object.defineProperty(target, key, descriptor)
> - ownKeys(target, receiver)

apply 函数调用捕获器 和 construct new 操作符捕获器。用在函数对象的

```js
function foo() {}

const fooProxy = new Proxy(foo, {
    // target 监听的函数对象，thisArg 函数上下文this，args 函数参数
  apply(target, thisArg, args) {
    console.log('函数调用');
    return target(...args);
  },
//    target 监听的函数对象,args传参
  construct(target, args, newTarget) {
    console.log('new 操作符');
    return new target(...args)
})
fooProxy.apply({}, [1, 2, 3]);
new fooProxy()
```

## Reflect

Reflect 是一个内置的对象，它提供拦截和操作 JavaScript 对象的方法。这些方法与 Proxy handlers 的方法相同。**类似于 Object 操作对象的方法**。有 13 种方法和 Proxy 一一对应

> 出现背景：
>
> - 早起 ECMA 没有考虑到对对象本身的操作如何设计会更加规范，所以将它们放在 Object 上面了，
> - 但是 Object 作为一个构造函数，这些操作不合适
> - 类似 in delete 操作符，让 JS 有些奇怪，所以新增了 Reflect，让这些操作集中在 Reflect 对象上了

```js
const obj = {
  name: 'zhangsan',
  age: 18,
};
// new Proxy(obj,{}) 第一个参数是代理对象，第二个参数是拦截器
const proxyObj = new Proxy(obj, {
  get(target, key, receiver) {
    console.log(`获取${key}监听`);
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    console.log(`设置${key}监听`);
    // Reflect.set(target, key, value, receiver);返回boolean值，可以用来判断是否成功。但是target[key] = value;监听不到
    // target[key] = value;
    Reflect.set(target, key, value, receiver);
  },
});
proxyObj.name = 'lisi';
console.log(proxyObj.name);
```

## Receiver 的作用

> - receiver 是创建出来的代理对象，改变原对象中的 this 指向

```js
const obj = {
  _name: 'zhangsan',
  get name(){
    return this._name;
  }
  set name(value){
    this._name = value;
  }
};

const proxyObj = new Proxy(obj, {
  get(target, key, receiver) {
    console.log(`获取${key}监听`);
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    console.log(`设置${key}监听`);
    Reflect.set(target, key, value, receiver);
  }
})
```

## Reflect 中 constructor 的 作用

> - constructor 捕获器，用来 new 操作符，返回一个对象，这个对象就是 new 操作符创建出来的实例对象
> - ES6 转 ES5 的时候，不允许使用 super()集成父类，就使用了 Reflect 的 constructor 捕获器
>   !![](../../../img/Reflect的constructor的用法.png)
