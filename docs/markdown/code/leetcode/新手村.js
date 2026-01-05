// var ransomNote = "aab", magazine = "baa" //true
// var ransomNote = "aab", magazine = "ab" //false
//
// var canConstruct = function (ransomNote, magazine) {
//   ransomNote = ransomNote.split(''),magazine=magazine.split('')
//   let countedNames = ransomNote.reduce((obj, name) => {
//     if (name in obj) {
//       obj[name]++
//     } else {
//       obj[name] = 1
//     }
//     return obj
//   }, {})
//   console.log(countedNames)
//   let find=Object.keys(countedNames).find(key=>{
//     let len=magazine.filter(data=>data==key)
//     return len.length<countedNames[key]
//   })
//   return find ? false : true
// };
// console.log(canConstruct(ransomNote, magazine))


// var fizzBuzz = function (n) {
//   let list = Array.from({length: n}, (x, i) => i + 1)
//   console.log(list)
//   list = list.map(item => {
//     if (item % 3 == 0 && item % 5 == 0) return "FizzBuzz"
//     else if (item % 3 == 0) return "Fizz"
//     else if (item % 5 == 0) return "Buzz"
//     else return item.toString()
//   })
//   console.log("list", list)
//   return list
// };
//
// let n = 15
// console.log(fizzBuzz(n))


// Definition for singly-linked list.
// function ListNode(val, next) {
//     this.val = (val===undefined ? 0 : val)
//     this.next = (next===undefined ? null : next)
// }
//
// var middleNode = function (head) {
//   let a = Math.floor(head.length / 2)
//   let list=head.filter(item=>item>a)
//   return list
// };
//
// let head =[1,2,3,4,5,6]
// console.log(middleNode((head)))


// var numberOfSteps = function (num) {
//   let tNum = 1
//   let count = function (number) {
//     tNum++
//     let a = (number / 2).toString(), b
//     if (a.indexOf(".") == -1) b = number / 2
//     else b = number - 1
//     if (b > 1) count(b)
//   }
//   count(num)
//   return tNum
// };
// let num = 123
// console.log(numberOfSteps(num))


var maximumWealth = function (accounts) {
  let list = accounts.map(item => {
    let sum = item.reduce((prev, cur, index, arr) => {
      return prev + cur;
    })
    return sum
  })
  console.log(list)
  console.log(list.sort((a, b) => a - b))
  let max = list.sort((a, b) => a - b)[list.length - 1]
  return max
};
let accounts = [[1, 5], [7, 3], [3, 5]]
console.log(maximumWealth(accounts))
