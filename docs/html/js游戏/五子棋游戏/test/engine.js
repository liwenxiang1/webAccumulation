class FivePoint {
  constructor() {
    this.canvas = document.getElementById("five-point")
    this.ctx = this.canvas.getContext("2d")
    this.drawBackground()
  }

  drawBackground() {
    this.drawRoundRect(1, 1, 450, 450, 8)
  }

  drawRoundRect(x, y, w, h, r, line = 1) {
    x = x + 1, y = y + 1, w = w - 3 * line, h = h - 3 * line
    let [x1, y1, x2, y2] = [x, y, x + w, y]
    let [x3, y3, x4, y4] = [x + w, y + h, x, y + h]
    this.ctx.lineWidth = 1
    this.ctx.strokeStyle = "#9E9E9E"
    this.ctx.shadowOffsetX=-5
    this.ctx.shadowOffsetY=5
    this.ctx.shadowBlur = 5; // 模糊尺寸
    this.ctx.shadowColor = '#9e9e9ed9'; // 颜色
    this.ctx.fillStyle="#F7E6B7"
    this.ctx.beginPath();
    this.ctx.moveTo(x1 + r, y1)
    this.ctx.lineTo(x2 - r, y2)
    this.ctx.arcTo(x2, y2, x2, y2 + r, r)
    this.ctx.lineTo(x3, y3 - r)
    this.ctx.arcTo(x3, y3, x3 - r, y3, r)
    this.ctx.lineTo(x4 + r, y4)
    this.ctx.arcTo(x4, y4, x4, y4 - r, r)
    this.ctx.lineTo(x1, y1 + r)
    this.ctx.arcTo(x1, y1, x1 + r, y1, r)
    this.ctx.stroke()
    this.ctx.fill()
    return this;
  }
}

window.onload = () => {
  console.log("fivePoint")
  let fivePoint = new FivePoint()
  console.log("fivePoint", fivePoint)
}