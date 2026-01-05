//内部进度圆弧
export default class InnerProgress {
  constructor({ctx, rem, border, centerX, type}, innerRadio) {
    this.type = type
    this.ctx = ctx
    this.rem = rem
    this.border = border
    this.centerX = centerX
    this.innerRadio = innerRadio
    this.init()
  }

  init() {
    this.ctx.restore()
    this.ctx.save()
    this.ctx.translate(this.centerX, this.centerX)
  }

  paint(percentStr) {
    let percent = parseInt(percentStr.replace("%", "")) / 100
    this.totalAngle = 360 - 160 + 20
    this.valueAngle = percent * Math.pow(10, 4) * this.totalAngle / Math.pow(10, 4)
    this.strokeBgLine()
    this.strokeBgMarkers()
    this.strokeValueLine()
    this.strokeValueMarkers()
    this.fillValuePoint()
    return this
  }

  strokeBgLine() {
    this.ctx.beginPath()
    this.ctx.lineWidth = 11 * this.rem * this.border//进度条背景条宽度
    this.ctx.lineCap = "round";
    this.ctx.strokeStyle = this.type === "print" ? "#E6E6E6" : "#9ABDE1"
    this.ctx.arc(0, 0, this.innerRadio, 160 / 180 * Math.PI, (160 + this.totalAngle) / 180 * Math.PI)
    this.ctx.stroke()
  }

  //绘制进度条上面的指示线
  strokeBgMarkers() {
    let hintCount = this.totalAngle / 8
    for (let i = 1; i < hintCount; i++) {
      this.ctx.beginPath()
      let startAngle = 160 + 8 * i
      let widthAngle = 0
      this.ctx.strokeStyle = this.type === "print" ? "#3B4859" : "#0C3966"
      this.ctx.lineCap = "butt";
      if (i % 2 === 0) this.ctx.strokeStyle = this.type === "print" ? "#3B4859" : "#0C3966", widthAngle = 1.8
      else this.ctx.strokeStyle = this.type === "print" ? "#3B4859" : "#668DB4", widthAngle = 1
      this.ctx.arc(0, 0, this.innerRadio, startAngle / 180 * Math.PI, (startAngle + widthAngle) / 180 * Math.PI)
      this.ctx.stroke()
    }
  }

  //绘制进度条上面的指示线
  strokeValueLine() {
    this.ctx.beginPath()
    this.ctx.lineWidth = 14 * this.rem * this.border//进度条宽度
    this.ctx.lineCap = "round";
    this.ctx.strokeStyle = this.type === "print" ? "#3B4859" : "#FF8E5E"
    this.ctx.arc(0, 0, this.innerRadio, 160 / 180 * Math.PI, (160 + this.valueAngle) / 180 * Math.PI)
    this.ctx.stroke()
  }

  //绘制进度条指示线上面的指示线
  strokeValueMarkers() {
    let onLineHintCount = this.valueAngle / 8
    for (let i = 1; i < onLineHintCount; i++) {
      this.ctx.beginPath()
      let startAngle = 160 + 8 * i
      let widthAngle = 0
      this.ctx.lineWidth = 11 * this.rem * this.border//使用背景条的宽度
      this.ctx.strokeStyle = "#ffffff"
      this.ctx.lineCap = "butt";
      if (i % 2 === 0) widthAngle = 1.8
      else widthAngle = 1
      this.ctx.arc(0, 0, this.innerRadio, startAngle / 180 * Math.PI, (startAngle + widthAngle) / 180 * Math.PI)
      this.ctx.stroke()
    }
  }

  //绘制进度条上面的指示圆
  fillValuePoint() {
    let rad = 2 * Math.PI / 360 * (160 + this.valueAngle);
    let x = Math.cos(rad) * this.innerRadio
    let y = Math.sin(rad) * this.innerRadio
    this.ctx.beginPath()
    this.ctx.fillStyle = this.type === "print" ? "#3B4859" : "#FF8E5E"
    this.ctx.shadowColor = "black";
    this.ctx.shadowBlur = 6;
    this.ctx.arc(x, y, 9 * this.rem * this.border, 0, 2 * Math.PI)//指示圆的半径
    this.ctx.fill()
  }

}

