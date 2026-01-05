//最外圈圆
export default class OutViews {
  constructor({ctx, rem, border, rotate, centerX, circleRadio, type}) {
    this.ctx = ctx
    this.rem = rem
    this.border = border
    this.rotate = rotate
    this.centerX = centerX
    this.outRadio = circleRadio
    this.ctx.lineWidth = 1.5 * this.rem * this.border
    this.ctx.strokeStyle = type === "print" ? "#3B4859" : "#2266AA"
    this.ctx.fillStyle = type === "print" ? "#3B4859" : "#2266AA"
    this.init()
  }

  init() {
    this.ctx.restore()
    this.ctx.save()
    this.ctx.translate(this.centerX, this.centerX)
  }

  paint() {
    this.strokeLine(90, 130)
    this.fillPoint(90)
    this.fillPoint(130)
    this.fillPointLine(140, 170)
    this.fillPoint(180)
    this.strokeLine(180, 270)
    this.fillPoint(270)
    this.fillPointLine(280, 310)
    this.fillPoint(320)
    this.strokeLine(320, 50)
    this.fillPoint(50)
    this.fillPointLine(70, 80)
    return this
  }

  //绘制点
  fillPoint(radValue) {
    radValue = radValue + this.rotate
    this.ctx.beginPath()
    let rad = 2 * Math.PI / 360 * radValue;
    let x = Math.cos(rad) * this.outRadio
    let y = Math.sin(rad) * this.outRadio
    this.ctx.arc(x, y, 3 * this.rem * this.border, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  //绘制线
  strokeLine(start, end) {
    start = start + this.rotate
    end = end + this.rotate
    this.ctx.beginPath()
    this.ctx.arc(0, 0, this.outRadio, start / 180 * Math.PI, end / 180 * Math.PI)
    this.ctx.stroke()
  }

  //绘制弧线点线
  fillPointLine(start, end) {
    start = start + this.rotate
    end = end + this.rotate
    let count = (end - start) / 2
    for (let i = 0; i <= count; i++) {
      let radValue = start + i * 2
      this.ctx.beginPath()
      let rad = 2 * Math.PI / 360 * radValue;
      let x = Math.cos(rad) * this.outRadio
      let y = Math.sin(rad) * this.outRadio
      this.ctx.arc(x, y, 1 * this.rem * this.border, 0, 2 * Math.PI);
      this.ctx.fill();
    }
  }
}
