# JS 基础系列-重新认识 call apply bind

## call apply bind 基本介绍

**语法**

```
fun.call(thisArg,params1,params2,...)
fun.apply(thisArg,[params1,params2,...])
fun.bind(thisArg,params1,params2,...)
```

**返回值**

1. call/apply:返回的是执行的结果
2. bind:返回的是`fun`的拷贝，并拥有指定的`this`以及初始参数

**参数**
`thisArg`（可选）：

1. fun 的 this 指向 thisArg
2. 非严格模式下：thisArg 指定为 null,undefined,fun 中的 this 指向的是 window 对象
3. 严格模式下：fun 的 this 为 undefined
4. 值为原始值（字符串，数字，布尔值）的 this 指向的是原始对象，如 String,Number,Boolean

`params1，...`（可选）

1. 如果 params 不传或者未 numm,undefined。则表示不需要传入参数
2. apply 第二个参数是数组，数组中的值为传给 fun 的参数

**调用 call/apply/bind 必须是函数**

> call,apply,bind 是挂在 Function 对象的三个方法，只有函数才有
> 例如：Object.prototype.toString.call(data)

**区别**

**_call 与 apply 的区别_**

传参写法不同：

- `apply` 第二个参数是传给 fun 的，他是个数组
- `call` 从第 2 个开始都是传给 fun 的参数

**_call /apply 与 bind 的区别_**

**执行：**

- `call/apply` 改变函数的 this 指向后立马**执行该函数**
- `bind` 返回改变了上下文之后的函数，**不执行改函数**

**返回值**

- call/apply 返回的是执行的结果
- bind 返回的是 fun 的拷贝，并指定了 fun 的 this 的指向，保存了 fun 的参数

## call/apply/bind 的核心理念：借用方法

Ad 对象有个方法，B 对象出于某种原因也需要该方法，那么我们就向 A 对象借用一下，几达到目的又节省了内存
