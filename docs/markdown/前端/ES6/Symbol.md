# 使用 Symbol 作为 key

```js
let s1 = Symbol('foo');
let s2 = Symbol('foo');
let s3 = Symbol();
let s4 = Symbol();
s1 === s2; // false
// 1、方法1
let obj = {
  [s1]: 'foo',
  [s2]: 'bar',
};
// 2、方法2
obj[s3] = 'zom';

// 3、方法3
Object.defineProperty(obj, s4, {
  value: 'foo',
  writable: false,
  enumerable: false,
  configurable: false,
});
console.log(obj[s1]); // foo
console.log(obj[s2]); // bar
console.log(obj[s3]); // zom
```

- 使用 Symbol 作为 key 的属性，通过 `Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()`获取不到,通过使用 `Object.getOwnPropertySymbols()`可以获取到

## Symbol.for(key)

> 如果想声明两个相同的 Symbol，可以使用 `Symbol.for(key)`，它会先检查全局环境中是否存在以该 key 为名称的 Symbol，如果存在则返回该 Symbol，否则创建一个新的 Symbol 并将其添加到全局环境中，然后返回该 Symbol.

```js
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');
s1 === s2; // true
```

> 使用 Symbol.keyFor(symbol)方法来获取该 Symbol.

```js
let sc = Symbol.keyFor('foo');
sc === s1; // true
```
