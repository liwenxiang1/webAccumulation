//内部文本
export default class InnerText {
  constructor({ctx, rem, border, centerX, mapWidth, type}) {
    this.type = type
    this.ctx = ctx
    this.rem = rem
    this.border = border
    this.centerX = centerX
    this.mapWidth = mapWidth
    this.init()
  }

  init() {
    this.ctx.restore()
    this.ctx.save()
    this.ctx.translate(this.centerX, this.centerX)
  }

  paint(text = "12%") {
    this.ctx.beginPath()
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillStyle = this.type === "print" ? "#3B4859" : "#1D5799"
    this.ctx.font = `bold ${55 * this.rem * this.border}px arial`;
    this.ctx.fillText(text, 0, -20 * this.rem);
    this.ctx.beginPath()
    this.ctx.font = `bold ${26 * this.rem * this.border}px arial`;
    this.ctx.fillText("正确率", 0, this.centerX - 50 * this.rem)
    return this
  }

}

