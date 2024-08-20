# uniapp使用renderjs

参考：https://www.jb51.net/article/263532.htm

参考：https://www.jianshu.com/p/1fed6d0c658c

### 一、基本使用

> 前提说明:在`template`页面中可以调用`script`和`renderjs`里面的方法，
>
> 但是两个`script`里面的方法不能相互调用。所以有了下面的写法。

* 1.在`script`的方法中调用`renderjs`的方法实现过程
  * 1.通过修改`script`-`data`中的`msg`通知到`template`页面层
  * 2.在`template`中监听`msg`数据变化并调用`renderjs`里面的方法。具体代码：
    ```
    :msg="msg" :change:msg="renderJS.receiveMsg"
    ```
  * 3.在`renderjs`的方法中接收相应的值并执行相关逻辑
* 2.在`renderjs`中调用`script`中的方法的实现过程：具体代码
  ```
  ownerVm.callMethod('receiveSendData', this.name)
  ```

#### 1.页面模版
```
<template>
    <view class="renderWrap">
        <view>
            <button type="primary" @click="renderJS.sendData">直接调用renderjs中的sendData方法</button>
            
            <button type="warn" @click="changeMsg">点击修改msg值</button>
            
            <view  :msg="msg" :change:msg="renderJS.receiveMsg">
                {{msg}}
            </view>
        </view>
    </view>
</template>
```

#### 2.基础vue的script
```
<script>
    export default {
        data() {
            return {
                msg: '看看Model层的msg'
            }
        },
        methods: {
            // 触发service层 触发renderjs数据改变
            changeMsg() {
                this.msg = "修改 msg 值，执行 receiveMsg 方法";
            },
            // 接收renderjs发回的数据
            receiveSendData(val) {
                this.msg = `Model 接收 View层 值：${val}`;
            }   
        }
    }
</script>
```

#### 3.创建renderjs的module
```
<script module="renderJS" lang="renderjs">
    export default {
        data() {
            return {
                name: '我是renderjs module!',
                message: ''
            }
        },
        methods: {
            // 接收逻辑层service层发送的数据
            receiveMsg(newValue, oldValue, ownerVm, vm) {
                console.log('监听 msg 值：', newValue, oldValue)
            },
            // 发送数据到service层
            sendData(e, ownerVm) {
                ownerVm.callMethod('receiveSendData', this.name)
                // 或者
                /* this.$ownerInstance.callMethod('receiveSendData',{
                    content:this.content
                }) */
            }
        }
    }
</script>
```

### 二、实际应用

要实现的功能是：对于`v-html`渲染的图片标签实现点击可以预览的效果。

#### 1.`template`页面
```
<template>
  <view id="contentView"  class="imgStyle" v-html="content" :prop="currentTime" :change:prop="detail.imgDetail"></view>
</template>
```

#### 2.`<script>`标签
```
<script>

export default {
  data() {
    return {
      content: '',
      currentTime:'',
    }
  },
  onLoad(params) {
    let infoid = params.infoid
    this.getDetailData({infoid})
  },
  methods: {
    previewImage({index, arr}){
      let arrList = arr.map(item => { //获取当前页面的轮播图数据
        if (item.url) {
          return item.url
        } else {
          return item
        }
      })
      //uniapp预览轮播图
      if (arrList.length > 0) {
        uni.previewImage({
          current: index, //预览图片的下标
          urls: arrList, //预览图片的地址，必须要数组形式，如果不是数组形式就转换成数组形式就可以
          indicator:'number'
        })
      }
    },
    getDetailData(data){//加载v-html里面的内容
      uni.showLoading({title: "加载中"})
      sublevel.zcfgListDetail(data).then(res => {
        this.params = res.infotitle
        this.content = res.content
      }).finally(res => {
          uni.hideLoading()
          this.$nextTick(()=>{
            //使用currentTime更新调用renderjs里面的方法
            this.currentTime=new Date().getTime()
          })
      })
    }
  }
}
</script>
```

#### 3.`renderjs`标签
```
<script module="detail" lang="renderjs">
export default {
  data(){
    return{
      img_list:[]
    }
  },
  methods:{
    imgDetail(newValue, oldValue, ownerInstance, instance){
      //在上面的v-html标签渲染完成后使用document获取contentView标签下面的img标签并设置相应的点击事件
      let parentDom = window.document.getElementById('contentView')
      if (parentDom && parentDom.childNodes.length > 0) {
        let p_dom = parentDom.childNodes
        p_dom.forEach(item=>{
          item.childNodes.forEach(item0=>{
            // console.log("item0",item0)
            if (item0.nodeName === "IMG") {
              this.img_list.push(item0.src)
              item0.addEventListener("click", (e) => {
                //图片点击的时候调用script里面的previewImage预览图片
                ownerInstance.callMethod('previewImage', {
                  index: this.img_list.indexOf(e.target.src),
                  arr: this.img_list
                })
              })
            }
          })
        })
      }
    },
  }
}
</script>
```
