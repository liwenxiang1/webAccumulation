
创建本地静态文件 `config.json`

创建 `readConfig.js` 文件，代码如下：

```js
const get = function (url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.onload = function () {
      if (xhr.status == 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(null);
      }
    };
    xhr.onerror = function () {
      reject(null);
    };
    xhr.send(null);
  });
};
export default async (vue) => {
  const resp = await get('./static/config.json');
  if (resp) {
    vue.config.plateForm = resp.plateForm; //prod：产品 szjt：深圳交通银行
  }
};
```

`main.js`引入文件

```js
import ReadConfig from '@/common/readConfig.js';
// 执行读取方法
await ReadConfig(Vue);
```

使用配置项

```js
let plateForm = Vue.config.plateForm;
```
