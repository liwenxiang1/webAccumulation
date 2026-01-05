function requestData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(url);
    }, 1000);
  });
}
// 需求：多次回调，上一个回调的结果，作为下一个回调的参数，继续调用第二个函数

// 第一种方案 promise和generator
// function* getData() {
//   const res1 = yield requestData('zyl');
//   const res2 = yield requestData(res1 + '华夏');
//   const res3 = yield requestData(res2 + '清水河');
//   console.log(res3);
// }
// const generator = getData();
// 这部分是循环，抽取成递归方法
// generator.next().value.then((res) => {
//   generator.next(res).value.then((res) => {
//     generator.next(res).value.then((res) => {
//       console.log(res);
//     });
//   });
// });

// 这部分就是async的实现原理
// function execFn(genFn) {
//   const generator = genFn();
//   function exec(res) {
//     const result = generator.next(res);
//     if (result.done) {
//       return res.value;
//     } else {
//       result.value.then((res) => {
//         exec(res);
//       });
//     }
//   }
//   exec();
// }
// execFn(getData);

// 第二种方案 有个npm包co
// const co = require('co');
// co(getData);

// 第三种方案 async await
async function getData() {
  const res1 = await requestData('zyl');
  const res2 = await requestData(res1 + '华夏');
  const res3 = await requestData(res2 + '清水河');
  console.log(res3);
}
getData();
