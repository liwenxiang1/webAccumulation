# uniapp前端使用uQRCode生成二维码带文字的图片

在`uniapp`中使用`uqrcode`库生成二维码图片的时候发现：可以生成样式较多的二维码并生成图片，但是不能带上文字。 所以有了这篇文档的说明。

**整体思路说明：**
> 使用`uqrcode`先生成二维码并下载二维码图片，再使用`canvas`绘制二维码图片和文字信息，最后使用`canvas`的保存图片方法将图片保存下来。

### 一、关于页面显示说明

页面正常显示的是`uqrcode`组件生成的二维码 + 文本信息

实际在下载二维码+文字图片的时候是使用一个隐藏的`canvas`来执行的。

```
//实际显示的布局
<uqrcode ref="uqrcode" class="qrcode-view" canvas-id="qrcode" :value="tgInfo.apkPathTg"
               :options="qrcodeOption"></uqrcode>
<view v-if="tgInfo.tgm" class="tgm-code-view">{{ tgInfo.tgm }}
      
//实际生成二维码的canvas元素
<canvas canvas-id="mutilCanvas" style="width: 200px; height: 220px;visibility: hidden;"></canvas>      
```

### 二、具体的下载带文字的二维码图片的逻辑

```
# 第一步：先使用uqrcode生成二维码图片
downloadApkWithCodeImage() {
  this.$refs.uqrcode.toTempFilePath({
    success: res => {
      console.log("downloadApkImage", res);
      this.addMutilImage(res)
    }
  });
},
# 第二步：使用mutilCanvas绘制二维码图片和文字
addMutilImage(image) {
  this.mutilContext = uni.createCanvasContext('mutilCanvas')
  this.mutilContext.setFillStyle('white')
  this.mutilContext.fillRect(0, 0, 200, 220)

  this.mutilContext.drawImage(image.tempFilePath, 0, 0, 200, 200, 0, 0, 200, 200)
  this.mutilContext.setFontSize(20)
  this.mutilContext.setFillStyle('#FF0000')
  this.mutilContext.setTextBaseline('top')
  this.mutilContext.fillText(this.tgInfo.tgm, 80, 200)
  // this.mutilContext.fillText('邀请码：421D', 40, 200)

  this.mutilContext.restore()
  this.mutilContext.draw(false, callback => {
    this.saveImageToAlbum()
  })
},      
# 第三步：uni.canvasToTempFilePath方法将mutilCanvas的内容生成图片保存到相册
saveImageToAlbum() {
  //保存图片到相册
  uni.canvasToTempFilePath({
    canvasId: 'mutilCanvas',
    destWidth: 200,
    destHeight: 220,
    quality: 1,
    success: (res) => {
      // console.log(res.tempFilePath)
      uni.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success: res => {
          console.log("saveImageToPhotosAlbum", res);
          uni.showToast({
            icon: 'success',
            title: '保存成功'
          });
        },
        fail: err => {
          // console.log(err);
        }
      });
    }
  });
},
```
