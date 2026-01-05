/**
* @Description:
*
* @文件名 政策法规详情
*
* @开发者 zhangwenjiao
* @创建时间: 2022-2-18 3:58:17 ?F10: PM?
*/
<template>
  <view class="ques-detail">
    <view class="title">
      {{ params}}
    </view>
<!--    <button id="contentDiv" ref="contentDiv" type="default" class="white-bg-color" @click="detail.imgDetail">啊啊</button>-->
    <view id="contentView"  class="imgStyle" v-html="content" :prop="currentTime" :change:prop="detail.imgDetail">
    </view>

  </view>
</template>

<script>
import const_val from "../../../utils/const_val";
import sublevel from '../../../api/sublevel.js';
import {BASE_URL} from "../../../plugins/service";

export default {
  data() {
    return {
      params: null,
      content: '',
      title: '',
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
    getDetailData(data){
      uni.showLoading({title: "加载中"})
      sublevel.zcfgListDetail(data).then(res => {
        this.params = res.infotitle
        let content = res.content
		console.log(content)
        content = content.replace(
                /XXFBPT/g,
                BASE_URL + '/hlwyy/business-ggfw/fileFeign/downloadFile?fileFullPath=XXFBPT'
        )

        this.content = content
        // do {
        //   this.content = this.content.replace('19px', '14px')
        //   this.content = this.content.replace('宋体', 'Microsoft YaHei')
        //   this.content = this.content.replace('text-indent: 37px;', '')
        //   this.content = this.content.replace('img', 'over-image')
        // } while (this.content.indexOf('19px') !== -1 || this.content.indexOf('宋体') !== -
        //         1 ||
        // this.content.indexOf('text-indent: 37px;') !== -1);
        // console.log("eventChannel: ", this.content);
      }).finally(res => {
          uni.hideLoading()
          this.$nextTick(()=>{
            this.currentTime=new Date().getTime()
            // console.log(document.getElementById('contentDiv'))
            // this.$refs.contentDiv.$trigger("click")
            // this.$refs.contentDiv.click()
            // document.getElementById('contentDiv').click()
          })
      })
    }
  }
}
</script>
<script module="detail" lang="renderjs">
export default {
  data(){
    return{
      img_list:[]
    }
  },
  watch: {
    currentTime: {
      immediate: true,
      handler(value) {
        console.log("currentTime====")
        //this.$refs.contentDiv.click()
        //this.$refs.contentDiv.$trigger("click")
        //document.getElementById('contentDiv').click()
      }
    }
  },
  methods:{
    imgDetail(newValue, oldValue, ownerInstance, instance){
      console.log("imgDetail====",newValue)
      console.log("imgDetail====",oldValue)
      console.log("imgDetail====",ownerInstance)
      let parentDom = window.document.getElementById('contentView')
      if (parentDom && parentDom.childNodes.length > 0) {
        let p_dom = parentDom.childNodes
        p_dom.forEach(item=>{
          item.childNodes.forEach(item0=>{
            // console.log("item0",item0)
            if (item0.nodeName === "IMG") {
              this.img_list.push(item0.src)
              item0.addEventListener("click", (e) => {
                // console.log(e.target.src)
                //this.previewImage(this.img_list.indexOf(e.target.src), this.img_list)
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
<style lang="less">
  .title {
    height: 4rem;
    text-align: center;
  }
</style>

