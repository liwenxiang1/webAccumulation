//中间线条
export default class InnerLines {
  constructor({ctx, rem, border,type}, innerRadio) {
    this.type = type
    this.ctx = ctx
    this.rem = rem
    this.border = border
    this.innerRadio = innerRadio
  }

  paint() {
    //绘制上面的弧线
    this.ctx.beginPath()
    this.ctx.lineWidth = 5 * this.rem * this.border
    this.ctx.arc(0, 0, this.innerRadio, 136 / 180 * Math.PI, 46 / 180 * Math.PI)
    this.ctx.stroke()
    //绘制下面的弧线
    this.drawCurveLine(this.innerRadio, 137, 45, 20 * this.rem)
    this.drawInnerBackground(this.innerRadio, 137, 45, 20 * this.rem)
    //绘制上面的点弧线
    this.ctx.lineWidth = 4 * this.border
    this.ctx.setLineDash([7, 7]);
    this.drawCurveLine(this.innerRadio, 144, 37, 0)
    return this
  }

  //绘制弧线 -1.根据特定的圆心及半径(circleRadio)、角度(sAngle)可以确定点的位置
  drawCurveLine(circleRadio, sAngle, eAngle, controlY) {
    this.ctx.beginPath()
    let sRad = 2 * Math.PI / 360 * sAngle;
    let sX = Math.cos(sRad) * circleRadio
    let sY = Math.sin(sRad) * circleRadio
    let eRad = 2 * Math.PI / 360 * eAngle;
    let ex = Math.cos(eRad) * circleRadio
    let ey = Math.sin(eRad) * circleRadio
    this.ctx.moveTo(sX, sY)
    this.ctx.quadraticCurveTo(0, controlY, ex, ey)
    this.ctx.stroke()
  }

  //绘制背景
  drawInnerBackground(circleRadio, sAngle, eAngle, controlY, draw = true) {
    let sRad = 2 * Math.PI / 360 * sAngle;
    let sX = Math.cos(sRad) * circleRadio
    let sY = Math.sin(sRad) * circleRadio
    this.ctx.beginPath()
    this.ctx.arc(0, 0, circleRadio, sAngle / 180 * Math.PI, eAngle / 180 * Math.PI)
    this.ctx.quadraticCurveTo(0, controlY, sX, sY)//正好相反，这里的结束点使用上面数据的开始点
    this.ctx.closePath()
    if (!draw) return
    this.ctx.fillStyle = "#F3F6FA";//绘制的背景颜色
    this.ctx.fill()
  }

  isPointIn(x, y) {
    this.drawInnerBackground(this.innerRadio, 137, 45, 20 * this.rem, false)
    let isIN = this.ctx.isPointInPath(x, y)
    console.log("isPointIn", x, y, isIN)
    return isIN
  }
}

