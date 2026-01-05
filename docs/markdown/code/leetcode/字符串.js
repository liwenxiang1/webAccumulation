// var lengthOfLastWord = function (s) {
//   let list = s.split(" ").filter(item => item)
//   console.log(list)
//   return list[0].length
// };
// let s = "   fly me   to   the moon  "
// console.log(lengthOfLastWord(s))

// var addBinary = function (a, b) {
//   let sum = 0, str = ''
//   for (let i = a.length - 1, j = b.length - 1; i >= 0 || j >= 0; i--, j--) {
//     console.log("for", a[i], b[j])
//     sum = Number(i >= 0 ? a[i] : 0) + Number(j >= 0 ? b[j] : 0) + sum
//     if (sum < 2) str += sum, sum = 0
//     else if (sum == 2) str += '0', sum = 1
//     else if (sum == 3) str += '1', sum = 1
//     if (i <= 0 && j <= 0 && sum == 1) str += '1'
//   }
//   let rStr = str.split('').reverse().join("")
//   return rStr
// };
// let a = "1", b = "111"
// console.log(addBinary(a, b))

// var isPalindrome = function (s) {
//   s = s.toLowerCase().replace(new RegExp('[^0-9a-z]', 'g'), '')
//   let sNew = s.split('').reverse().join('')
//   console.log(s,sNew)
//   return s == sNew
// };
// let s = "A man, a plan, a canal: Panama"
// console.log(isPalindrome(s))


var convertToTitle = function (columnNumber) {
  let num = 0, lit = columnNumber % 26

  function div(a) {
    num++
    let val = a / 26
    if (val > 26) div(val)
  }

  div(columnNumber)
  console.log(num)

};

// console.log("Y".charCodeAt() - 64)
// console.log("Z".charCodeAt() - 64)
// console.log(26 * 26 + 25)
// console.log(701 / 26)
console.log(convertToTitle(701))
// console.log(701 % 26)
