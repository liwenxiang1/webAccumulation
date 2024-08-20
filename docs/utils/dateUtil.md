<!--
 * @Author: “liwx” “1258598654qq.com”
 * @Date: 2024-08-08 14:25:26
 * @LastEditors: “liwx” “1258598654qq.com”
 * @LastEditTime: 2024-08-08 14:30:07
 * @FilePath: \vuepress-starter\docs\utils\dateUtil.md
 * @Description: 这是默认设置, 请设置 `customMade` , 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

// 获取天数

```js
getDayNum(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return (endDate - startDate) / (1000 _ 60 _ 60\ * 24) + 1;
}
```

日期格式化

```js
dateFormatter(date, fmt) {
    //date = '' + date;
    if (!date) return '';
    if (!fmt) fmt = 'YYYY-MM-DD';
    fmt = fmt.replace(/^Y{4}/, date.substr(0, 4));
    fmt = fmt.replace(/MM/, date.substr(4, 2));
    return date.length > 6 ? fmt.replace(/DD/, date.substr(6, 2)) : fmt;
}
```

日期格式化去掉 横杠 -

```js
dateDelF(date, type) {
    if (date && date != null) {
        if (type == 'datetime') {
            date = date.replace(/-/g, '');
            date = date.replace(/:/g, '');
            date = date.replace(/ /g, '');
            return date;
        } else {
            return date.replace(/-/g, '');
        }
    }
}
```

自定义格式化时间格式

```js
formatTime(date, format = 'YYYY-MM-DD') {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    let formattedTime = format;
    formattedTime = formattedTime.replace('YYYY', year);
    formattedTime = formattedTime.replace('MM', month);
    formattedTime = formattedTime.replace('DD', day);
    formattedTime = formattedTime.replace('HH', hours);
    formattedTime = formattedTime.replace('mm', minutes);
    formattedTime = formattedTime.replace('ss', seconds);

    return formattedTime;

}
```

日期时间 格式化为了展示

```js
dateTimeFormatter(date, fmt) {
    //date = '' + date;
    if (!date) return '';
    if (!fmt) fmt = 'YYYY-MM-DD HH:mm';
    fmt = fmt.replace(/^Y{4}/, date.substr(0, 4));
    fmt = fmt.replace(/MM/, date.substr(4, 2));
    fmt = fmt.replace(/DD/, date.substr(6, 2));
    fmt = fmt.replace(/HH/, date.substr(8, 2));
    fmt = fmt.replace(/mm/, date.substr(10, 2));
    // fmt = fmt.replace(/ss/, date.substr(12, 2));

    return fmt;

}
```
