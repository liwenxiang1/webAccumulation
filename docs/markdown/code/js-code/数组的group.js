const groupBy = (array, key) => {
  let groupObj = array.reduce((result, currentItem) => {
    // 使用 key 函数获取分组的键
    const groupKey = key(currentItem)

    // 确保 result 对象中有对应键的数组
    if (!result[groupKey]) {
      result[groupKey] = []
    }

    // 将当前项添加到对应分组的数组中
    result[groupKey].push(currentItem)

    return result
  }, {})
  return Object.keys(groupObj).map(key => {
    return { category: key, children: groupObj[key] }
  })
}

// 示例数据
const items = [
  { category: 'fruits', name: 'apple' },
  { category: 'animals', name: 'dog' },
  { category: 'fruits', name: 'banana' },
  { category: 'animals', name: 'cat' }
]

// 使用 groupBy 函数进行分组
const groupedItems = groupBy(items, item => item.category)

console.log(groupedItems)

let nameStr=groupedItems.map(item=> `name【${item.children.map(cItem=>cItem.name).join(",")}】,category:${item.category}`).join("; ")

console.log(nameStr)
