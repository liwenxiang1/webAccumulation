# css知识

### 一、transition动画使用
```
// 切换tab标签动画实现：每个tab-下的image标签只有一个，动态切换src和样式；使用transition实现属性动画。
const getTabSrc = (item) => {
  if(item.img==state.sjlx)return require('../../assets/img/home/ckyb_'+item.img+'_sel.png')
  else return require('../../assets/img/home/ckyb_'+item.img+'.png')
}
//样式
.ckyb-tab-image{
  width: 35px;
  height: 35px;
  transition:all 0.3s linear;
  margin-top: calc(56px - 35px)
}

.ckyb-tab-image.select{
  width:53px;
  height:56px;
  margin-top:0px;
}
```
今天项目中使用了`transition`动画，但是没有效果。排查发现设置对应的div元素样式为：`display: flex;`后才生效了。

### 二、其他样式问题

#### 1.多个class同时存在的样式

```
//中间没有空格
.question-item-text.answered {
  color: #FFFFFF;
  background: #195497;
  border: 1px solid #195497;
}
```
#### 1.1 class的子class样式（可以是多层级的子class）
```
//中间有空格
.add-view .vux-x-icon {
  padding-top: 0px;
}

.fxsdbz-switch .weui-label::before {
  content: "*";
  color: red;
}
```

#### 2.class所在的元素被点击

```
.start-test:active {
  position: relative;
  cursor: pointer;
  top: 3px;
}
```

#### 3.class的子元素class样式

```
//一级子元素
.analysis-text > .line2 {
  margin-top: 20px;
}
//用空格分隔也可以
.analysis-text .line2 {
  margin-top: 20px;
}
```

#### 4.多个html元素偶数个样式

```
tr:nth-child(2n+1) {
  background: rgba(82, 139, 255, 0.1);
}
```

#### 5.多个html元素第一个和第二个样式

```
th:first-child {
  width: 290px;
  border-top-left-radius: 17px;
}

th:last-child {
  border-right: 0;
  border-top-right-radius: 17px;
}
```

#### 6.多个class使用同一样式

```
.ver-layout, .ver-layout-center, .ver-layout-center-all {
  display: flex;
  flex-direction: column;
}

.ver-layout-center {
  align-items: center;
}

.ver-layout-center-all {
  align-items: center;
  justify-content: center;
}
```

#### 7.图表添加灰色滤镜
```
 //添加样式
 filter: grayscale(100%);
```
