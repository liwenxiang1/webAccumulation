// var moveZeroes = function (nums) {
//   nums.sort((a, b) => a - b)
//   console.log(nums)
//   let last = nums.lastIndexOf(0)
//   console.log(last)
//   nums.splice(0, last + 1)
//   console.log(nums)
//   let list = Array.from({length: last + 1}, (x, i) => 0)
//   nums = [...nums, ...list]
//   return nums
// };
// let nums = [0,1,0,3,12]
// console.log(moveZeroes(nums))


// var longestPalindrome = function (s) {
//
// };
// let s = "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz"
// console.log(longestPalindrome(s))


// var twoSum = function (nums, target) {
//   let arr = []
//   for (let i = 0; i < nums.length; i++) {
//     for (let j = i + 1; j < nums.length; j++) {
//       if (nums[i] + nums[j] == target) {
//         return  [i, j]
//       }
//     }
//   }
//   console.log(arr)
// };
// let nums = [3,3], target = 6
// console.log(twoSum(nums, target))


// var isPalindrome = function (x) {
//   if (x < 0) return false
//   let list = x.toString().split('').reverse()
//   return list.join('')==x.toString()
// };
// let x = 10
// console.log(isPalindrome(x))


// var romanToInt = function (s) {
//   let total = 0
//
//   function nextNum(s) {
//     let obj = {
//       I: 1, II: 2, III: 3,
//       IV: 4, V: 5, VI: 6,
//       IX: 9, X: 10, XX: 20,
//       XL: 40, L: 50, LX: 60,
//       XC: 90, C: 100, CC: 200,
//       CD: 400, D: 500, DC: 600,
//       CM: 900, M: 1000, MM: 2000,
//     }
//     let obj1 = {IV: 4, IX: 9, XL: 40, XC: 90, CD: 400, CM: 900,}
//     let obj2 = {V: 5, L: 50, D: 500}
//     let obj3 = {I: 1, X: 10, C: 100, M: 1000}
//     Object.keys(obj1).forEach(key => {
//       let index = s.indexOf(key)
//       if (index != -1) {
//         total = total + obj1[key]
//         s = s.replace(key, '')
//       }
//     })
//     console.log(total, s)
//     Object.keys(obj2).forEach(key => {
//       let index = s.indexOf(key)
//       if (index != -1) {
//         total = total + obj2[key]
//         s = s.replace(key, '')
//       }
//     })
//     console.log(total, s)
//     Object.keys(obj3).forEach(key => {
//       let start = s.indexOf(key), end = s.lastIndexOf(key), sub = end - start + 1
//       if (start != -1) {
//         total = total + obj3[key] * sub
//         s = s.replace(/key/g, '')
//       }
//     })
//   }
//
//   nextNum(s)
//   console.log("total", total)
//   return total
// };
// let s = "MMMCMXCIV"
// console.log(romanToInt(s))


// var longestCommonPrefix = function (strs) {
//   let list = strs[0].split('')
//   if (list.length <= 0) return ''
//   for (let i = 0; i < list.length; i++) {
//     for (let j = 0; j < strs.length; j++) {
//       let key = list[i], item = strs[j]
//       if (key !== item.charAt(i)) {
//         return i == 0 ? '' : strs[0].substring(0, i)
//       }
//     }
//   }
//   return strs[0].substring(0)
// };
// let strs = ["a"]
// console.log(longestCommonPrefix(strs))


// var isValid = function (s) {
//   let arr = ["\\(\\)", "\\{\\}", "\\[\\]"], list = ['()', '{}', '[]']
//
//   function reduce(str) {
//     arr.forEach(key => {
//       str = str.replace(new RegExp(key, 'g'), '')
//     })
//     for (let i = 0; i < list.length; i++) {
//       if (str.indexOf(list[i]) != -1) {
//         return reduce(str)
//       }
//     }
//     return str
//   }
//
//   let a = reduce(s)
//   console.log("a======", a)
//   return a ? false : true
// };
// let s = "(([]))"
// // let s = "()[]{} "
// console.log(isValid(s))


// function ListNode(val, next) {
//   this.val = (val === undefined ? 0 : val)
//   this.next = (next === undefined ? null : next)
// }
//
// var mergeTwoLists = function (list1, list2) {
//
// };
// let l1 = [1, 2, 4], l2 = [1, 3, 4]
// console.log()


// var removeDuplicates = function (nums) {
//   let i = 0, cur
//   while (i < nums.length) {
//     if (cur != undefined && cur == nums[i]) {
//       nums.splice(i, 1)
//     } else {
//       cur = nums[i]
//       i++
//     }
//   }
//   return nums.length
// };
// let nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
// console.log(removeDuplicates(nums))


// var removeElement = function (nums, val) {
//   let i = 0
//   while (i < nums.length) {
//     if (nums[i] == val) {
//       nums.splice(i, 1)
//     } else {
//       i++
//     }
//   }
//   console.log(nums)
//   return nums.length
// };
// let nums = [0,1,2,2,3,0,4,2], val = 2
// console.log(removeElement(nums, val))


var searchInsert = function (nums, target) {
  let index = nums.indexOf(target)
  console.log(index)
  if (index == -1) {
    let i = 0, list = [undefined, undefined]
    while (i < nums.length) {
      if (nums[i] < target) list[0] = i
      if (!list[1] && nums[i] > target) list[1] = i
      i++
    }
    console.log("list", list)
    if (target > nums[nums.length - 1]) return nums.length
    else if (target < nums[0]) return 0
    else if (list[0] != undefined) return list[0] + 1
  } else {
    return index
  }
};
// let nums = [1,3,5,6], target = 7
let nums = [1,3,5,6], target = 2
console.log(searchInsert(nums, target))
