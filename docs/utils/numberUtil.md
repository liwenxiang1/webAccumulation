数字转大写

```js
 convertCurrency(money) {
      //汉字的数字
      var cnNums = new Array(
          "零",
          "壹",
          "贰",
          "叁",
          "肆",
          "伍",
          "陆",
          "柒",
          "捌",
          "玖"
      );
      //基本单位
      var cnIntRadice = new Array("", "拾", "佰", "仟");
      //对应整数部分扩展单位
      var cnIntUnits = new Array("", "万", "亿", "兆");
      //对应小数部分单位
      var cnDecUnits = new Array("角", "分", "毫", "厘");
      //整数金额时后面跟的字符
      var cnInteger = "整";
      //整型完以后的单位
      var cnIntLast = "元";
      //最大处理的数字
      var maxNum = 999999999999999.9999;
      //金额整数部分
      var integerNum;
      //金额小数部分
      var decimalNum;
      //输出的中文金额字符串
      var chineseStr = "";
      //分离金额后用的数组，预定义
      var parts;
      if (money == "") {
          return "";
      }
      money = parseFloat(money);
      if (money >= maxNum) {
          //超出最大处理数字
          return "";
      }
      if (money == 0) {
          chineseStr = cnNums[0] + cnIntLast + cnInteger;
          return chineseStr;
      }
      //转换为字符串
      money = money.toString();
      if (money.indexOf(".") == -1) {
          integerNum = money;
          decimalNum = "";
      } else {
          parts = money.split(".");
          integerNum = parts[0];
          decimalNum = parts[1].substr(0, 4);
      }
      //获取整型部分转换
      if (parseInt(integerNum, 10) > 0) {
          var zeroCount = 0;
          var IntLen = integerNum.length;
          for (var i = 0; i < IntLen; i++) {
              var n = integerNum.substr(i, 1);
              var p = IntLen - i - 1;
              var q = p / 4;
              var m = p % 4;
              if (n == "0") {
                  zeroCount++;
              } else {
                  if (zeroCount > 0) {
                      chineseStr += cnNums[0];
                  }
                  //归零
                  zeroCount = 0;
                  chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
              }
              if (m == 0 && zeroCount < 4) {
                  chineseStr += cnIntUnits[q];
              }
          }
          chineseStr += cnIntLast;
      }
      //小数部分
      if (decimalNum != "") {
          var decLen = decimalNum.length;
          for (var i = 0; i < decLen; i++) {
              var n = decimalNum.substr(i, 1);
              if (n != "0") {
                  chineseStr += cnNums[Number(n)] + cnDecUnits[i];
              }
          }
      }
      if (chineseStr == "") {
          chineseStr += cnNums[0] + cnIntLast + cnInteger;
      } else if (decimalNum == "") {
          chineseStr += cnInteger;
      }
      return chineseStr;
  },
```

浮点数千分号（逗号）格式化：12,345.68

```js
  commaFmt(str, bit) {
    // 格式化处理：仅保留‘数字’、‘.’、‘-’符号
    str = String(str).replace(/[^\d\.-]/g, '');
    if (bit) {
      // 小数位数
      //      str = parseFloat(str).toFixed(bit)
      str = this.toFixed(str, bit);
    }
    let num = str.split('.');
    let arr = num[0].split(''); // 整数部分
    let sign = arr[0] == '-' ? 1 : 0;
    for (let i = arr.length - 3; i > sign; i -= 3) {
      arr.splice(i, 0, ','); // 每间隔3位增加一个逗号
    }
    // 拼接&补充小数部分
    return arr.join('') + (num[1] ? '.' + num[1] : '');
  },
```

// 将数字转化为指定位数的字符串

```js
  prefix(number, len) {
    // 前补0
    const str = String(number);
    len = len - str.length; // 补零的数量
    return len > 0 ? this.padding(len, '0') + str : str;
  },
  // 重写，解决四舍五入问题
  // 为了解决不同浏览器四舍五入规则不一致问题
```

```js
toFixed(number, bit) {
  let num = Number(number);
  if (isNaN(num)) return '';
  num = Math.round(Math.pow(10, bit) * num); // 整数
  const sign = num < 0 ? '-' : '';
  const res = this.prefix(Math.abs(num), bit + 1);
  let arr = res.split(''); // 整数部分
  num = arr.length - bit; // 在固定位置增加一个小数点
  return sign + res.slice(0, num) + '.' + res.slice(num);
},
```

货币金额由“分”转换为“元”（默认保留 2 位小数）

````js
toYuan(money, bit = 2) {
  // money 可以是“数字”或“字符串”类型，默认空字符''转换为0.00
  //if (isNaN(money)) return ''
  //return (Number(money) * 0.01).toFixed(bit)
  return this.toFixed(Number(money) * 0.01, bit);
}```
货币金额由“元”转换为“分”（整数）
```js
toCent(str, zeroChar = '') {
  // 默认空‘’
  // 剔除末位的 ‘-’、‘.’和千分符(,)
  str = String(str)
    .replace(/[-\.]$/, '')
    .replace(/,/g, '');
  // 无效金额则返回‘0’或空‘’，如果 zero=‘’空字符时返回‘’
  if (isNaN(str)) return zeroChar; // ‘0’或空‘’
  const num = Math.round(Number(str) * 100);
  return num ? String(num) : zeroChar;
  // 保留两位小数并剔除小数点
  //    str = parseFloat(Number(str)).toFixed(2).replace(/\./, '')
  //    const sign = /^-/.test(str) ? '-' : '' // 正负号
  // 剔除开头重复的‘0’（匹配‘-’或‘0’）
  //    str = str.replace(/^[-0]+/, '')
  //    return str ? sign + str : zeroChar // 返回字符串
}
````

整数型金额（单位：分）转为人民币大写

```js
toRmb(num) {
 num = Number(num); // 虽然 num是整数，还是要转换一下
 if (isNaN(num) || num === 0) return ''; // '零元整'
 // 正负号、及大写符号
 const sign = num < 0 ? '负' : '';
 const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
 const units = [
   ['分', '角', '元', '万', '亿'],
   ['', '拾', '佰', '仟'],
 ];
 num = Math.abs(num); // 绝对值
 if (num > 999999999999) return '¥∞'; // 超界，无限大
 const arr = String(num).split('').reverse();
 // 如：1034001230060 >> 0600321004301
 let rmb = '';
 for (let i = 0; i < arr.length; i++) {
   if (i < 2) {
     // 陆角零分，其中.点匹配任意字符，剔除零分
     //rmb = (digit[arr[i]] + units[0][i]).replace(/零./, '') + rmb
     rmb = digit[arr[i]] + units[0][i] + rmb;
   } else {
     for (let n = 2; n < units[0].length && i < arr.length; n++) {
       let str = '';
       for (let j = 0; j < units[1].length && i < arr.length; j++) {
         str = digit[arr[i]] + units[1][j] + str;
         i++; // 贰仟叁佰零拾零、肆仟零佰零拾壹、壹佰零拾叁
       }
       // 零仟零佰零拾零 >> 零亿（零万、零元）
       rmb =
         str.replace(/(零.)*零$/, '').replace(/^$/, '零') +
         units[0][n] +
         rmb;
     }
   }
 }
 //rmb = rmb.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/元$/, '元整')
 rmb = rmb
   .replace(/(零.)*零元/, '元')
   .replace(/(零.)+/g, '零')
   .replace(/零$/, '整');
 return sign + rmb;
},
```
