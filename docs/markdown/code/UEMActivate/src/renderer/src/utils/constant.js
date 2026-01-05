//手机型号数据源
export const PhoneBrandMap = {
  "三星": "samsung",
  "小米": "xiaomi",
  "红米": "Redmi",
  "VIVO": "vivo",
  "Real Me 真我": "realme",
  "苹果": "apple",
  "华为": "huawei",
  "OPPO": "oppo",
  "荣耀": "honor",
  "黑鲨": "blackshark",
  "一加": "oneplus",
  "IQOO": "iqoo",
  "努比亚": "nubia",
  "其他": "其他品牌",
}

//手机型号对应的资源
export const ResourceMap = {
  resource0: {
    brand: ['apple'],
    content: {
      step1: '',
      step2: ""
    }
  },
  resource1: {
    brand: ['huawei'],
    content: {
      step1: "请确认隐私空间、应用分身功能未开启。</br>隐私空间：设置>隐私>隐私空间</br>应用分身：设置>应用和服务>应用分身",
      step2: "1. 从手机主页面进入“设置”。</br> 2. 在设置中下拉选择“用户和账户” </br>3. 进入用户和账户选项后在“个人”下方，点击应用并且退出（删除）账户。",
      step3: "1.进入设置界面 </br> 2.在设置中下拉选择“关于手机” </br> 3.连续点击“版本号“进入开发者模式。</br> 4.点击左上方“←：返回设置 </br> 5. 向下滑动，选择USB调试选择开启 </br> 6. 向下滑动，点击‘选择USB配置’ 选择MTP（多媒体传输）"
    }
  },
  resource2: {
    brand: ['xiaomi', 'blackshark', 'Redmi'],
    content: {
      step1: "请确认手机分身、应用双开功能未开启。 </br>手机分身：设置>特色功能>手机分身 </br> 应用双开：设置>应用和服务>应用分身",
      step2: "1. 从手机主页面进入“设置”。</br> 2. 在设置中下拉选择“用户和账户” </br> 3. 进入用户和账户选项后在“个人”选项内退出账户。",
      step3: "1.进入设置界面 </br> 2.在设置中选择“我的设备” </br> 3.下拉选择‘全部参数与信息’ </br> 4. 连续点击‘MIUI版本’直至出现‘您已处于开发者模式’ </br> 5. 返回设置，向下滑动进入‘开发者选项’：</br> ‘USB调试’、‘USB安装’、‘USB调试（安全设置）’选择开启。</br> 6. 向下滑动，点击选择‘默认USB配置’ 选择MTP（多媒体传输）"
    }
  },
  resource3: {
    brand: ['samsung', 'nubia', '其他品牌'],
    content: {
      step1: "请确认应用分身、安全文件夹 功能未开启。</br> 应用分身： 设置>特色功能>手机分身 </br>安全文件夹：设置>生物识别和安全性>安全文件夹",
      step2: "1. 进入“设置”。</br> 2. 在设置中下拉选择“账户与备份” </br> 3. 进入用户和账户选项后在“个人”选项内退出账户。</br> 4. 点击删除账户 </br>温馨提示：退出三星账号时请选择‘保留数据在本机’，防止通讯录丢失。",
      step3: "1.在设置中下拉选择“关于手机” </br> 2.在关于手机中点击“软件信息” </br> 3.连续点击“编译编号“进入开发者模式。</br> 4. 向下滑动，选择‘USB调试’ </br> 5. 向下滑动，点击‘默认USB配置’选择‘MIDI’"
    }
  },
  resource4: {
    brand: ['vivo', 'iqoo'],
    content: {
      step1: "请确认原子分身、应用分身功能未开启。</br> 原子分身： 设置>原子分身 </br> 应用分身： 设置>应用与权限>应用分身",
      step2: "1. 进入“设置”。</br> 2. 在设置中下拉选择“账户与备份” </br> 3. 进入用户和账户选项后在“个人”选项内退出账户。</br> 4. 点击删除账户",
      step3: "1.在设置中下拉选择“系统管理。</br> 2.点击“关于手机”。</br> 3.在点击关于手机 。</br> 4.连续点击“软件版本号“进入开发者模式。"
    }
  },
  resource5: {
    brand: ['oppo', 'oneplus', 'realme'],
    content: {
      step1: "请确认手机 分身、应用分身功能未开启。</br> 系统分身： 设置 > 权限与隐私 > 系统分身 </br>应用分身： 设置>应用管理>应用分身",
      step2: "1. 进入“设置”。</br> 2. 在设置中下拉选择“用户与账号” </br> 3. 点击图标 </br> 4. 右上角点击‘移除账户’",
      step3: "1.在设置中下拉选择“关于手机” </br> 2.在关于手机中点击“版本信息” </br> 3.连续点击“版本号”进入开发者模式 </br> 4. 返回设置，进入开发者模式，下拉选择‘USB调试’开启 </br> 5. 下载点击‘选择USB配置’ </br> 6. 选择‘MTP’"
    }
  },
  resource6: {
    brand: ['honor'],
    content: {
      step1: "请确认隐私空间、应用分身功能未开启。</br> 隐私空间：设置>隐私>隐私空间 </br>应用分身：设置>应用和服务>应用分身",
      step2: "1. 从手机主页面进入“设置”。</br> 2. 在设置中下拉选择“用户和账户” </br> 3. 进入用户和账户选项后在“个人”下方，点击应用并且退出（删除）账户。</br> 温馨提示：退出荣耀账号时请选择‘保留数据在本机’，防止手机号丢失。",
      step3: "1.进入设置界面 </br> 2.在设置中下拉选择“关于手机” </br> 3.连续点击“版本号“进入开发者模式。</br> 4. 返回设置，点击‘系统及更新’，点击开发人员选项 </br> 5. 向下滑动，选择USB调试选择开启 </br> 6. 向下滑动，点击‘选择USB配置’ 选择MTP（多媒体传输）"
    }
  },
}

//获取资源名称
export function getResourceName(phoneBrand) {//参数：如：apple  返回结果：resource0
  let resourceName = Object.keys(ResourceMap).find(key => ResourceMap[key].brand.find(resBrand => phoneBrand == resBrand))
  return resourceName
}

//获取图片资源描述文本
export function getResourceContent(resourceName, step) {
  return ResourceMap[resourceName].content[step]
}

//获取Android系统
export function getPhoneSystem(phoneBrand) {
  return phoneBrand == 'apple' ? 'ios' : 'android'
}
