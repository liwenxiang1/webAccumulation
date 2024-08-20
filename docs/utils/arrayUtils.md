# 常用数组处理工具

## 对象数组取并集

```js
unionFn(a = [], b = [], flag) {
    let arr = a.concat(b);
    let result = arr.filter(
        (item, index) => arr.findIndex((it) => it[flag] === item[flag]) == index
    );
    return result;
},
```

## 交集

```js
intersectFn(a = [], b = [], flag) {
    let result = a.filter((aItem) =>
        b.some((bItem) => aItem[flag] === bItem[flag])
    );
    return [...result];
},
```

## 差集

```js
minusFn(a = [], b = [], flag) {
    let result = a.filter((aItem) =>
        b.every((bItem) => aItem[flag] !== bItem[flag])
    );
    return [...result];
},
```

## 补集

```js
complementFn(a = [], b = [], flag) {
    let result1 = a.filter((aItem) =>
        b.every((bItem) => aItem[flag] !== bItem[flag])
    );
    let result2 = b.filter((bItem) =>
        a.every((aItem) => aItem[flag] !== bItem[flag])
    );
    return [...result1, ...result2];
},
```

## 去重

```js
  // 去重 arr数组  param :参数
  unique(arr, param = 'id') {
      const res = new Map();
      return arr.filter((a) => !res.has(a[param]) && res.set(a[param], 1));
  },
```

## 数组转 Map

```js
list2Map(list, key, val) {
    let obj = {};
    for (let item of list) {
        obj[item[key]] = val ? item[val] : item;
    }
    return obj;
},
```

## 用于具备父子关系的科目编码体系的转换

```js
list2Tree(list, {
    id = 'id',
    pid = 'pid',
    children = 'children'
}) {
    // 将数据存储为以 id 为 KEY 的 map 索引数据列
    let tree = [],
        map = {};
    list.forEach(function(item) {
        delete item[children]; // 删除所有 children 以防止多次调用
        map[item[id]] = item;
    });
    list.forEach(function(item) {
        // 以当前遍历项的 pid，去 map 对象中找到索引的 id
        let parent = map[item[pid]];
        // 如果找到索引，那么说明此项不在顶级当中，那么需要把此项添加到他对应的父级中
        if (parent) {
            (parent[children] || (parent[children] = [])).push(item);
        } else {
            // 如果没有在 map 中找到对应的索引 id，那么直接把当前的 item 添加到 list 结果集中作为顶级
            tree.push(item);
        }
    });
    return tree;
},
```

## 把树型 JSON 数据格式转换为列表格式

```js
treeToArray(nodes, children = "children") {
    var r = [];
    if (Array.isArray(nodes)) {
        for (var i = 0, l = nodes.length; i < l; i++) {
            r.push(nodes[i]); // 取每项数据放入一个新数组
            if (
                Array.isArray(nodes[i][children]) &&
                nodes[i][children].length > 0
            ) {
                // 若存在 children 则递归调用，把数据拼接到新数组中，并且删除该 children
                r = r.concat(this.treeToArray(nodes[i][children], children));
            }
            delete nodes[i][children];
        }
    }
    return r;
},
```

## 多维数组展开

**原理：**

1. 利用 reduce 累加，将数组平铺。
2. 判断每次传入的第二个参数是否为数组，如果是数组的话，递归。
3. 然后每层都平铺，一层一层用 concat 连接成一个数组

**代码：**

```js
const flatten = (arr) => {
  return arr.reduce((flat, next) => {
    console.log(flat, next); // flat:初始值或累加的值 next:当前值
    return flat.concat(Array.isArray(next) ? flatten(next) : next);
    // 判断当前元素是否为数组 决定是否递归 将值返回到下次循环
  }, []);
};
// 运行示例：
let nestedArr = [1, 2, [3, 4, [5, [6, 7]]]]; // 四维数组 展开
console.log(flatten(nestedArr)); // [1,2,3,4,5,6,7]
```
