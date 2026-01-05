# Iterator（迭代器）和 generator(生成器)

## Iterator（迭代器）

是帮助我们对某个数据结构进行遍历的**对象**。迭代器协议：

- 产生一系列值的标准方式
- js 中标准就是指定的 `next` 函数
  next 的要求：
  - 一个无参数或者一个参数的函数，返回一个对象
  - 返回的对象要求有两个属性：
    - done（布尔值）
      - 如果迭代器可以产生序列中的下一个值，则为 false。
      - 如果迭代器已将序列迭代完毕，则为 true。这种情况下 value 是可选的，如果它依然存在，即为迭代结束之后的默认返回值。
    - value
      - 迭代器返回的任何 JavaScript 值。done 为 true 时可省略该值。

```js
const iterator = {
  next: function () {
    return { done: false, value: 1 };
  },
};
```

### 可迭代对象

内部实现了迭代器，`[Symbol.iterator]`返回一个迭代器

> - 当一个对象实现了 iterable protocol 协议时，它就是一个可迭代对象。
> - 这个对象必须实现@iterator 要求具有一个 key 为 Symbol.iterator 的属性，属性值是一个函数，这个函数返回一个迭代器对象。
> - 可迭代对象包括 Array、String、Map、Set、arguments 对象、NodeList 对象等。
> - 可迭代对象可以被 for...of 遍历。重复调用.next()方法，直到返回{done: true}为止。
> - 4.使用场景 展开语法.对象的展开运算符不是迭代器，ES9 新增特性
>
> ```js
> const obj = { name: 'zyl', age: 18 };
> const newObj = { ...obj };
> ```
>
> - 5.使用场景 解构语法 对象的结构也不是迭代器，ES9 新增特性
> - 6.使用场景 Promise.all
>
> ```js
> Promise.all();
> ```

## generator（生成器）

ES6 新增的一种`函数`控制和使用的方案,可以让灵活的控制函数的执行与结束

生成器是个函数，与普通函数的区别

- 生成器函数需要在 function 后面和参数列表之间使用星号（\*）表示，即`function*`。

```js
function* foo() {}
```

- 在生成器函数中可以通过 yield 关键字来指明数据生成的过程，yield 关键字只能在生成器函数中使用，其他地方使用会报错。

```js
function* foo() {
  const value1 = 100;
  yield;
  const value2 = 200;
  yield;
}
```

> 调用生成器函数使，返回了一个 generator 对象，该对象符合可迭代协议，因此可以使用 for...of 循环进行遍历

### 生成器函数执行过程

- 遇到 yield 关键字，函数暂停执行，并返回一个对象，该对象包含一个 value 属性，其值为 yield 关键字后面的表达式的值，以及一个 done 属性，其值为 false。
- 遇到 return 停止执行 .return()

```js
function* foo() {
  const value1 = 100;
  yield value1;
  const value2 = 200;
  yield value2;
}

const generator = foo();
// 执行第一段（第一个yield之前的代码）
console.log(generator.next()); // { value: undefined, done: false }
// 执行第二段;（第一个yield和第二个yield之间的代码）
console.log(generator.next()); // { value: undefined, done: false }
console.log(generator.next()); // { value: undefined, done: true }
```

next 方法可以传递参数

```js
function* foo(num) {
  const value1 = 100 * num;
  let n = yield value1;
  const value2 = 200 * n;
  yield value2;
}

const generator = foo(5);
// 执行第一段（第一个yield之前的代码）
console.log(generator.next()); // { value: undefined, done: false }
// 执行第二段;（第一个yield和第二个yield之间的代码）这里的参数10，实际上是付给const n = yield value1
console.log(generator.next(10)); // { value: undefined, done: false }
console.log(generator.next()); // { value: undefined, done: true }
```

next 也可以抛出异常 .throw()

```js
function* foo(num) {
  const value1 = 100 * num;
  try {
    let n = yield value1;
    const value2 = 200 * n;
    yield value2;
  }.catch(e) {
      console.log(e);
  }
}

const generator = foo(5);
console.log(generator.next()); //
// 第二段代码不会执行
console.log(generator.throw(new Error('error'))); //
```

## 生成器替代迭代器

```js
const arr = [1, 2, 3];
function* foo(arr) {
  // 方法1
  for (const item of arr) {
    yield item;
  }
  //   方法二 yield\* + 可迭代的对象
  yield* arr;
}
const generator = foo(arr);
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
```
