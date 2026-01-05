# Promise 的内部实现

功能设计：按照 Promise/A+规范实现一个 Promise

```js
// 状态管理
const PROMISE_STATUS_PENDING = 'pending';
const PROMISE_STATUS_FULFILLED = 'fulfilled';
const PROMISE_STATUS_REJECTED = 'rejected';
// 封装工具函数
function executorFnWithCatchError(execFn, value, resolve, reject) {
  try {
    const result = execFn(value);
    resolve(result);
  } catch (err) {
    reject(err);
  }
}
class MyPromise {
  constructor(executor) {
    // 默认状态是pending
    this.status = PROMISE_STATUS_PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledFns = []; // 存放resolve回调
    this.onRejectedFns = []; //存放reject回调
    // 定义resolve函数，当Promise状态变为resolved时调用
    const resolve = (value) => {
      if (this.status == PROMISE_STATUS_PENDING) {
        // queueMicrotask延迟调用，将代码放在微任务中执行，防止onFulfilled找不到为undefined
        queueMicrotask(() => {
          // 如果状态不是pending，直接返回，防止resolve和reject被多次调用
          if (this.status != PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_FULFILLED;
          this.value = value;
          //   执行then传过来的第一个回调函数
          this.onFulfilledFns.forEach((fn) => {
            fn(value);
          });
        });
      }
    };
    // 定义reject函数，当Promise状态变为rejected时调用
    const reject = (reason) => {
      if (this.status == PROMISE_STATUS_PENDING) {
        // 放到微任务队列中
        queueMicrotask(() => {
          // 如果状态不是pending，直接返回，防止resolve和reject被多次调用
          if (this.status != PROMISE_STATUS_PENDING) return;
          this.reason = reason;
          this.status = PROMISE_STATUS_REJECTED;
          //   执行then传过来的第二个回调函数
          this.onRejectedFns.forEach((fn) => {
            fn(reason);
          });
        });
      }
    };
    // 执行executor函数，并将resolve和reject函数作为参数传入
    executor(resolve, reject);
  }
  then(onFulfilled, onRejected) {
    // onFulfilled, onRejected 没有值，给默认值。兼容.catch,利用的是promise的catch，然后再运行第二层的catch
    const defaultOnRejected = (err) => {
      throw err;
    };
    onRejected = onRejected || defaultOnRejected;
    const defaultOnFulfilled = (value) => {
      return value;
    };
    onFulfilled = onFulfilled || defaultOnFulfilled;

    return new MyPromise((resolve, reject) => {
      // 如果状态确定了，直接调用，不用加到数组里面了

      if (this.status == PROMISE_STATUS_FULFILLED && onFulfilled) {
        executorFnWithCatchError(onFulfilled, this.value, resolve, reject);
      }

      if (this.status == PROMISE_STATUS_REJECTED && onRejected) {
        executorFnWithCatchError(onRejected, this.reason, resolve, reject);
      }
      if (this.status == PROMISE_STATUS_PENDING) {
        // 为了防止promise多次then，需要将onFulfilled和onRejected保存在数组中起来

        if (this.onFulfilledFns && onFulfilled) {
          this.onFulfilledFns.push(() => {
            executorFnWithCatchError(onFulfilled, this.value, resolve, reject);
          });
        }

        if (this.onRejectedFns && onRejected) {
          this.onRejectedFns.push(() => {
            executorFnWithCatchError(onRejected, this.reason, resolve, reject);
          });
        }
      }
    });
  }
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
  //   无论成功还是失败都执行finally
  finally(onFinally) {
    this.then(
      () => {
        onFinally();
      },
      () => {
        onFinally();
      }
    );
  }
  static resolve(value) {
    return new MyPromise((resolve, reject) => resolve(value));
  }
  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason));
  }
  //   所有回调函数都fullfilled，resolve，任何一个rejected直接reject
  static all(promiseArr) {
    return new MyPromise((resolve, reject) => {
      const values = [];
      promiseArr.forEach((promise) => {
        promise
          .then((res) => {
            values.push(res);
            // 所有的promiseArr回调都有结果，resolve
            if (values.length == promiseArr.length) {
              resolve(values);
            }
          })
          .catch((err) => {
            // 有一个回调报错，就reject
            reject(err);
          });
      });
    });
  }
  //   所有的回调函数执行完毕再resolve,不管状态是fullfilled还是rejected
  static allSettled(promiseArr) {
    return new MyPromise((resolve, reject) => {
      const values = [];
      promiseArr.forEach((promise) => {
        promise
          .then((res) => {
            values.push({ status: PROMISE_STATUS_FULFILLED, value: res });
            if (values.length == promiseArr.length) {
              resolve(values);
            }
          })
          .catch((err) => {
            values.push({ status: PROMISE_STATUS_REJECTED, reason: err });
            if (values.length == promiseArr.length) {
              resolve(values);
            }
          });
      });
    });
  }
  //   有一个回调函数状态变了就返回
  static race(promiseArr) {
    return new MyPromise((resolve, reject) => {
      promiseArr.forEach((promise) => {
        promise
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
  }
  //   等待一个成功的回调，如果都是吧，返回一个合并的异常
  static any(promiseArr) {
    return new MyPromise((resolve, reject) => {
      const reason = [];
      promiseArr.forEach((promise) => {
        promise
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reason.push(err);
            if (reason.length == promiseArr.length) {
              //   node环境暂不支持AggregateError
              //   reject(reason)
              reject(new AggregateError(reason));
            }
          });
      });
    });
  }
}
// const promise = new MyPromise((resolve, reject) => {
//   resolve(111);
//   //   reject(222);
// });
// 优化1、then方法多次调用
// promise.then(
//   (res) => {
//     console.log('res1', res);
//   },
//   (err) => {
//     console.log('err1', err);
//   }
// );
// promise.then(
//   (res) => {
//     console.log('res2', res);
//   },
//   (err) => {
//     console.log('err2', err);
//   }
// );

// 2、then方法调用时，状态已经确定了，直接执行回调

// setTimeout(() => {
//   promise.then(
//     (res) => {
//       console.log('res3', res);
//     },
//     (err) => {
//       console.log('err3', err);
//     }
//   );
// }, 1000);

// 3、链式调用

// promise
//   .then(
//     (res) => {
//       console.log('第一次调用res', res);
//       return 'aaa';
//       //   throw new Error('aaa');
//     },
//     (err) => {
//       console.log('第一次调用err', err);
//       //   throw new Error('bbb');
//       return 'bbb';
//     }
//   )
//   .then(
//     (res) => {
//       console.log('第二次调用res', res);
//     },
//     (err) => {
//       console.log('第er次调用err', err);
//     }
//   );

// 4、catch方法设计

// promise
//   .then((res) => {
//     console.log('第一次then', res);
//     return 'aaa';
//   })
//   .catch((err) => {
//     console.log('catch', err);
//   })
//   .finally(() => {
//     console.log('finally');
//   });
// 5、resolve和reject的实现
// MyPromise.resolve('111').then((res) => {
//   console.log('resolve内调研', res);
// });
// MyPromise.reject('222').catch((res) => {
//   console.log('reject内调研', res);
// });
// 6、all
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => reject('1111'), 1000);
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => reject('222'), 2000);
});
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => reject('333'), 3000);
});
// MyPromise.all([p1, p2, p3])
//   .then((res) => {
//     console.log('all的res', res);
//   })
//   .catch((err) => {
//     console.log('all的err', err);
//   });
// 7、allSettled
// MyPromise.allSettled([p1, p2, p3]).then((res) => {
//   console.log('allsettle结果', res);
// });

// 8、race
// MyPromise.race([p1, p2, p3])
//   .then((res) => {
//     console.log('race成功的结果', res);
//   })
//   .catch((err) => {
//     console.log('race失败的结果', err);
//   });

// //9、any
MyPromise.any([p1, p2, p3])
  .then((res) => {
    console.log('any的结果', res);
  })
  .catch((err) => {
    console.log('any的失败结果', err);
  });
```
