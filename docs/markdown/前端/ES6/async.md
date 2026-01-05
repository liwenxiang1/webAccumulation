# async / await

其实就是 `Promise + Generator` 的语法糖

实现原理：

```js
function requestData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(url);
    }, 1000);
  });
}

function* getData() {
  const res1 = yield requestData('zyl'); //第一个yield
  //第二次调用next方法的传参，赋值给res1了
  const res2 = yield requestData(res1 + '华夏'); //第二个yield
  const res3 = yield requestData(res2 + '清水河');
  console.log(res3);
}
const generator = getData();
// 这部分是循环，抽取成递归方法execFn
// generator.next().value.then((res) => {
//   generator.next(res).value.then((res) => {
//     generator.next(res).value.then((res) => {
//       console.log(res);
//     });
//   });
// });

// 这部分就是async的实现原理
function execFn(genFn) {
  const generator = genFn();
  function exec(res) {
    const result = generator.next(res);
    if (result.done) {
      return res.value;
    } else {
      result.value.then((res) => {
        exec(res);
      });
    }
  }
  exec();
}
execFn(getData);
```
