## JavaScript 类数组对象的定义

**定义：**
一个拥有 `length` 属性和`若干索引属性`的对象就可以被称为类数组对象，类数组对象和数组类似，但是不能调用数组的方法。常见的类数组对象有 `arguments` 和 `DOM 方法的返回结果`，还有`函数`也可以被看作是类数组对象，因为它含有 `length` 属性值，代表可接收的参数个数。

<font  color=mediumaquamarine size=3>常见的类数组转换为数组的方法有这样几种：</font>

1. 通过 `call` 调用数组的 `slice` 方法来实现转换

```js
Array.prototype.slice.call(arrayLike);
```

2. 通过 `call` 调用数组的 `splice` 方法来实现转换

```js
Array.prototype.splice.call(arrayLike, 0);
```

3. 通过 `apply` 调用数组的 `concat` 方法来实现转换

```js
Array.prototype.concat.apply([], arrayLike);
```

4. 通过 `Array.from` 方法来实现转换

```js
Array.from(arrayLike);
```

5. 通过扩展运算符 `...` 来实现转换

```js
[...arrayLike];
```

**遍历类数组对象的方法有：**

1. 将数组的方法应用到类数组上，这时候就可以使用 `call` 和 `apply` 方法，如：

```js
Array.prototype.forEach.call(arrayLike, (a) => console.log(a));
```

2. 将类数组转成数组之后遍历
