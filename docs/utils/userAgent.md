<!--
 * @Author: “liwx” “1258598654qq.com”
 * @Date: 2024-08-09 14:01:57
 * @LastEditors: “liwx” “1258598654qq.com”
 * @LastEditTime: 2024-08-19 15:31:22
 * @FilePath: \vuepress-starter\docs\utils\userAgent.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

## 判断用户浏览器

`navigator.userAgent`
判断用户所使用的浏览器主要用到的 api 是 `navigator.userAgent`，这是一个只读的字符串，声明了浏览器用于 HTTP 请求的用户代理头的值，**不同浏览器的 userAgent 值都不相同，所以我们可以根据这个字符串来判断用户是从哪个浏览器进入。**

## 判断方式：

下面两个是刚做的 demo 获取的值，仔细观察下面两个字符串，会发现有些值是不一样的，并且浏览器特有的，依据这个我们就可以作为不同浏览器的判断条件。

### QQ 内置浏览器的 userAgent 值：

> mozilla/5.0 (iphone; cpu iphone os 11_1_2 like mac os x) applewebkit/604.3.5 (khtml, like gecko) mobile/15b202 qq/7.5.8.422 v1_iph_sq_7.5.8_1_app_a pixel/1080 core/uiwebview device/apple(iphone 8plus) nettype/wifi qbwebviewtype/1

### 微信内置浏览器的 userAgent 值：

> mozilla/5.0 (iphone; cpu iphone os 11_1_2 like mac os x) applewebkit/604.3.5 (khtml, like gecko) mobile/15b202 micromessenger/6.6.6 nettype/wifi language/zh_cn

## 示例:判断 QQ 和微信内置浏览器

使用方式，直接使用这个 api 读取值，然后根据事先观察 userAgent 字符串的不同之处来判断：

```js
let url = navigator.userAgent.toLowerCase();
//使用toLowerCase将字符串全部转为小写 方便我们判断使用
if (url.indexOf('15b202 qq') > -1) {
  //单独判断QQ内置浏览器
  alert('QQ APP 内置浏览器，做你想做的操作');
}
if (url.indexOf('micromessenger') > -1) {
  //单独判断微信内置浏览器
  alert('微信内置浏览器，做你想做的操作');
}
if (url.indexOf('15b202') > -1) {
  //判断微信内置浏览器，QQ内置浏览器
  alert('QQ和微信内置浏览器，做你想做的操作');
}
```

上面判断了微信和 QQ 的内置浏览器，如果有更多不同的需求的话，可以按照上面的方式，先获取 userAgent 的字符串，然后再根据观察，使用 indexOf 判断是否含有指定的字符，来对不同浏览器进行不同的操作。

### 判断是手机打开浏览器

```
let isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)
```

### 判断页面是在手机端，平板端还是 PC 端打开

```js
var os = (function () {
  var ua = navigator.userAgent,
    isWindowsPhone = /(?:Windows Phone)/.test(ua),
    isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
    isAndroid = /(?:Android)/.test(ua),
    isFireFox = /(?:Firefox)/.test(ua),
    isChrome = /(?:Chrome|CriOS)/.test(ua),
    isTablet =
      /(?:iPad|PlayBook)/.test(ua) ||
      (isAndroid && !/(?:Mobile)/.test(ua)) ||
      (isFireFox && /(?:Tablet)/.test(ua)),
    isPhone = /(?:iPhone)/.test(ua) && !isTablet,
    isPc = !isPhone && !isAndroid && !isSymbian;
  return {
    isTablet: isTablet,
    isPhone: isPhone,
    isAndroid: isAndroid,
    isPc: isPc,
  };
})();

if (os.isAndroid || os.isPhone) {
  console.log('手机');
} else if (os.isTablet) {
  console.log('平板');
} else if (os.isPc) {
  console.log('电脑');
}
```

### 3. 获取手机操作系统类型，判断是 Android 或者 IOS

```js
/**
 * 获取操作系统类型，
 * 0 -- Android
 * 1 -- iOS
 */
function getOSType() {
  if (/(Android)/i.test(navigator.userAgent)) {
    return 0;
  } else if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    return 1;
  } else {
    return 2;
  }
}
```

### 判断当前环境是否是微信环境

```js
function is_weixin() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}
```
