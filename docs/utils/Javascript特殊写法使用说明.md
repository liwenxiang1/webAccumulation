## Javascript 之“+“、“!“、“!!“、“!!+“写法使用说明

> > > "+"能将字符直接转换成 number 类型,如果不是字符串会变成 NaN

```js
let a = '1';
console.log(typeof Number(a)); //普通写法
console.log(typeof +a); //+写法
```

> > > "!"能将字符直接转换成 boolean 类型,如果不是字符串会变成 NaN
> > > 0,null,undefined,"",NaN,取反(!) 都会变成 false,其他情况取反(!) 都会变成 true

> > > !!能将 number 类型直接转换为 Boolean 类型,相当于 Boolean()

> > > !!+能将字符串数字快速转换为 Boolean 类型,相当于 Boolean(Number(a))

```js
let a = '1';
console.log(typeof Boolean(a)); //普通写法
console.log(typeof !!a); //!!写法 直接转换成true
console.log(typeof !!+a); //!!+写法 先转number再转boolean
```
