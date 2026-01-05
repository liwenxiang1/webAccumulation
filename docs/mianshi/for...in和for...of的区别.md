## for...in 和 for...of 的区别

1. for...in 遍历的是对象的属性名，for...of 遍历的是对象的属性值
2. for...in 遍历的是可枚举属性，for...of 遍历的是可迭代对象
3. for...in 可以遍历对象和数组，for...of 只能遍历数组
4. for...in 可以遍历原型链上的属性，for...of 不能遍历原型链上的属性
5. for...in 可以使用 break、continue、return 等语句来控制循环，for...of 不能使用 break、continue、return 等语句来控制循环

6. for..in 获取是是数组的索引 for...of 获取的才是数组的值
