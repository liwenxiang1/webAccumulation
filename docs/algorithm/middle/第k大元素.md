<!--
 * @Author: “liwx” “1258598654qq.com”
 * @Date: 2024-08-19 14:47:42
 * @LastEditors: “liwx” “1258598654qq.com”
 * @LastEditTime: 2024-08-19 14:48:57
 * @FilePath: \vuepress-starter\docs\algorithm\middle\第k大元素.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

## **第 k 大元素**

### 描述：

在数组中找到第 `k`大的元素

### 样例：

给出数组 `[9,3,2,4,8]`，第三大的元素是`4`

给出数组 [1,2,3,4,5]，第一大的元素是 5，第二大的元素是 4，第三大的元素是 3，以此类推

### 思路分析：

### 代码：

从大到小，移除 `n` 个最大值

```js
const kthLargestElement = function (n, nums) {
  let value;
  // 遍历 n 次，移除 n 个最大值，最终 value 即为第 n 大元素
  for (let i = 0; i < n; i++) {
    let item = Math.max(...nums); // 取出最大值
    value = nums.splice(nums.indexOf(item), 1)[0]; // 删除并保存最大值
  }
  return value;
};
console.log(
  '输出',
  kthLargestElement(3, [9, 3, 2, 4, 8]),
  kthLargestElement(1, [1, 3, 4, 2])
);
```

sort 排序

```js
const kthLargestElement = function (n, nums) {
  // 降序
  nums.sort((a, b) => {
    return b - a;
  });
  return nums[n - 1]; // 第 n 大(数组从 0 开始)
};
console.log(
  '输出',
  kthLargestElement(3, [9, 3, 2, 4, 8]),
  kthLargestElement(1, [1, 3, 4, 2])
);
```
