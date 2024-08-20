# instanceof 实现原理

## 思路

右边变量存在于左边变量的原型链上

关于原型链不太懂的同学可以看一下，我的这篇文章：

[原型和原型链](/accumulation/prototype.html)

## 代码：

```js
function myInstanceOf(left, right) {
  let leftValue = left.__proto__;
  let rightValue = right.prototype;
  while (true) {
    if (leftValue === null) {
      return false;
    }
    if (leftValue === rightValue) {
      return true;
    }
    leftValue = leftValue.__proto__;
  }
}
```
