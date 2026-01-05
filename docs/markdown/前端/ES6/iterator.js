// const iterator = {
//   next: () => {
//     return { done: true, value: 1 };
//   },
// };
// let names = ['a', 'b', 'c'];
// const iterator = names[Symbol.iterator]();
// console.log(iterator.next());

// 1、封装生成迭代器的函数
// function createIterator(arr) {
//   let index = 0;
//   return {
//     next: () => {
//       if (index < arr.length) {
//         return { done: false, value: arr[index++] };
//       } else {
//         return { done: true, value: undefined };
//       }
//     },
//   };
// }
// let num = [1, 2, 3];
// const iterator = createIterator(num);
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());

// 可迭代对象

// const iteratorObj = {
//   names: ['a', 'b', 'c'],
//   [Symbol.iterator]: function () {
//     let index = 0;
//     return {
//       next: () => {
//         if (index < this.names.length) {
//           return { done: false, value: this.names[index++] };
//         } else {
//           return { done: true, value: undefined };
//         }
//       },
//     };
//   },
// };
// const iterator = iteratorObj[Symbol.iterator]();
// console.log(iterator.next());
// console.log(iterator.next());

// 3.使用场景 for...of

// 4.使用场景 展开语法.对象的展开运算符不是迭代器，ES9新增特性
// const obj = { name: 'zyl', age: 18 };
// const newObj = { ...obj };
// 5.使用场景 解构语法 对象的结构也不是迭代器，ES9新增特性

// 6.使用场景 Promise.all
// Promise.all();
// function* foo(num) {
//   const value1 = 100 * num;
//   let n = yield value1;
//   const value2 = 200 * n;
//   yield value2;
// }

// const generator = foo(5);
// // 执行第一段（第一个yield之前的代码）
// console.log(generator.next()); // { value: undefined, done: false }
// // 执行第二段;（第一个yield和第二个yield之间的代码）
// console.log(generator.next(10)); // { value: undefined, done: false }
// console.log(generator.next()); // { value: undefined, done: true }

// 生成器替代迭代器
const arr = [1, 2, 3];
function* foo(arr) {
  yield* arr;
}
const generator = foo(arr);
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
