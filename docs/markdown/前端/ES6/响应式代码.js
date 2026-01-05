/*
 * @Author: “liwx” “1258598654qq.com”
 * @Date: 2025-04-28 09:09:36
 * @LastEditors: “liwx” “1258598654qq.com”
 * @LastEditTime: 2025-04-28 10:11:34
 * @FilePath: \webAccumulation\docs\markdown\前端\ES6\响应式代码.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// 1、封装响应式的函数，将需要响应式的函数传进去，对象变化后，执行回调函数
let activeReactiveFn = null;
// 定义一个监听函数
function watchFn(fn) {
  activeReactiveFn = fn;
  // 执行一次函数，收集依赖
  fn();
  activeReactiveFn = null;
}
// 封装一个获取depend的方法，target监听的对象，key变化的属性
function getDepend(target, key) {
  // 根据target和key获取depend实例
  let map = targetMap.get(target);
  if (!map) {
    map = new Map();
    targetMap.set(target, map);
  }
  let depend = map.get(key);
  if (!depend) {
    depend = new Depend();
    map.set(key, depend);
  }
  return depend;
}
// 创建一个响应式函数
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      // 根据target和key获取depend依赖
      const depend = getDepend(target, key);
      // 给depend对象中添加响应式函数
      // 1、depend.addSub(activeReactiveFn);
      // 优化，将1的代码移至class中get不需要关系activeReactiveFn是否存在，class添加方法depend,操作activeReactiveFn
      depend.depend();
      return Reflect.get(target, key, receiver);
    },
    set(target, key, val, receiver) {
      //4、针对属性变化，只执行与该属性相关的副作用函数

      Reflect.set(target, key, val, receiver);
      const depend = getDepend(target, key);
      depend.notify();
      return true;
    },
  });
}
// 2、依赖收集类的封装,创建一个class,存放依赖
class Depend {
  constructor() {
    this.subs = new Set();
  }
  // 添加依赖，响应的函数
  addSub(sub) {
    this.subs.add(sub);
  }
  depend() {
    if (activeReactiveFn) {
      this.addSub(activeReactiveFn);
    }
  }
  // 通知依赖更新
  notify() {
    this.subs.forEach((sub) => sub());
  }
}

// 3、自动监听对象的变化
// const proxyObj = new Proxy(obj, {
//   get(target, key, receiver) {
//     // 根据target和key获取depend依赖
//     const depend = getDepend(target, key);
//     // 给depend对象中添加响应式函数
//     // 1、depend.addSub(activeReactiveFn);
//     // 优化，将1的代码移至class中get不需要关系activeReactiveFn是否存在，class添加方法depend,操作activeReactiveFn
//     depend.depend();
//     return Reflect.get(target, key, receiver);
//   },
//   set(target, key, val, receiver) {
//     //4、针对属性变化，只执行与该属性相关的副作用函数

//     Reflect.set(target, key, val, receiver);
//     const depend = getDepend(target, key);
//     depend.notify();
//     return true;
//   },
// });

const proxyObj = reactive({
  name: 'zhangsa',
  age: 14,
});
let targetMap = new WeakMap();

//测试上面响应代码

watchFn(() => {
  console.log(proxyObj.name, 'name发生变化1');
  console.log(proxyObj.name, 'name发生变化2');
});
watchFn(() => {
  console.log(proxyObj.age, 'age发生变化1');
});
watchFn(() => {
  console.log(proxyObj.age, 'age发生变化2');
});

// proxyObj.name = '李四';
console.log('第二次执行-----------------');
proxyObj.age = 20;
