let mapPadding = 5 //内边距-周围的小圆半径也是使用3
export class ColorRes {
  constructor(cir1, cir2, cir3, cir4, cir5, cir2Wave, cir3Wave) {
    this.cir1 = cir1
    this.cir2 = cir2
    this.cir3 = cir3
    this.cir4 = cir4
    this.cir5 = cir5
    this.cir2Wave = cir2Wave
    this.cir3Wave = cir3Wave
    this.text = "#3B4859"
  }
}

let cRes1 = new ColorRes('rgba(4, 30, 86, 0.1)', 'rgba(4, 30, 86, 0.2)', 'rgba(4, 30, 86, 0.5)',
  'rgba(25, 84, 151, 1)', 'rgba(25, 84, 151, 0.15)',
  'rgba(25,84,151,0.08)', 'rgba(25,84,151,0.1)')
let cRes2 = new ColorRes('rgba(255, 142, 94, 0.1)', 'rgba(255, 142, 94, 0.2)', 'rgba(255, 142, 94, 0.5)',
  'rgba(255, 142, 94, 1)', 'rgba(255, 142, 94, 0.15)',
  'rgba(255, 142, 94,0.08)', 'rgba(255, 142, 94,0.1)')

export default class CircleWave {
  constructor(canvasId, type, value) {
    this.cRes = type === 1 ? cRes1 : cRes2
    this.textValue = value
    this.waveWidth = 2
    this.waveWidth1 = 1
    this.waveTimer = null
    this.waveTimer1 = null
    this.canvas = document.getElementById(canvasId)
    this.initCanvasView()
    this.addCanvasEvent()
  }

  initCanvasView() {
    this.ctx = this.canvas.getContext('2d')
    this.canvasInfo = this.canvas.getBoundingClientRect()
    this.mapWidth = this.canvasInfo.width
    this.rem = this.mapWidth / 260
    this.centerX = this.mapWidth / 2
    this.circleRadio = this.mapWidth / 2 - mapPadding * this.rem
  }

  painting() {
    this.ctx.restore()
    this.ctx.clearRect(0, 0, this.canvasInfo.width, this.canvasInfo.height)
    // 最外圈
    this.strokeCircle(this.circleRadio, 0, 1, this.cRes.cir1)
    // 第二圈
    this.strokeFillCircle(this.circleRadio, -20, 1, this.cRes.cir2, 'white', 10, this.cRes.cir2)
    // 第三圈
    this.fillCircle(this.circleRadio, -20 - 13, 'white', 9, this.cRes.cir3)
    // 核心圈
    this.strokeCircle(this.circleRadio, -20 - 13 * 2, 8, this.cRes.cir4)
    // 内圈
    this.strokeCircle(this.circleRadio, -20 - 13 * 2 - 19, 10, this.cRes.cir5)
    // 文本
    this.fillText()
    // 波纹
    this.strokeCircle(this.circleRadio, -20 + this.waveWidth / 2, this.waveWidth, this.cRes.cir2Wave)
    this.strokeCircle(this.circleRadio, -20 - 13 + this.waveWidth1 / 2, this.waveWidth1, this.cRes.cir3Wave)
    return this
  }

  startWave() {
    this.removeTimer()
    this.waveTimer = setInterval(() => {
      if (this.waveWidth >= 20) {
        this.waveWidth1 = 1
        this.startWave1()
        this.removeTimer()
      } else this.waveWidth += 2
      this.painting()
      // console.log("waveTimer====")
    }, 60)
    return this
  }

  removeTimer() {
    this.waveWidth = 1
    if (this.waveTimer) clearInterval(this.waveTimer), this.waveTimer = null
    this.painting()
  }

  startWave1() {
    this.removeTimer1()
    this.waveTimer1 = setInterval(() => {
      if (this.waveWidth1 >= 13) {
        this.startWave()
        this.removeTimer1()
      } else this.waveWidth1 += 2
      this.painting()
      // console.log("waveTimer1====")
    }, 100)
    return this
  }

  removeTimer1() {
    if (this.waveTimer1) clearInterval(this.waveTimer1), this.waveTimer1 = null
    this.painting()
  }

  startPath(circleRadio) {
    this.ctx.restore()
    this.ctx.save()
    this.ctx.translate(this.centerX, this.centerX)
    this.ctx.beginPath()
    this.ctx.arc(0, 0, circleRadio, 0, 2 * Math.PI)
  }

  strokeCircle(circleRadio, offset, lineWidth, strokeStyle) {
    circleRadio = circleRadio + offset * this.rem
    this.startPath(circleRadio)
    this.ctx.lineWidth = lineWidth
    this.ctx.strokeStyle = strokeStyle
    this.ctx.stroke()//绘制边框
  }

  fillCircle(circleRadio, offset, fillStyle, shadowBlur, shadowColor) {
    circleRadio = circleRadio + offset * this.rem
    this.startPath(circleRadio)
    this.ctx.fillStyle = fillStyle
    this.ctx.shadowBlur = shadowBlur
    this.ctx.shadowColor = shadowColor
    this.ctx.fill()//绘制阴影
  }

  strokeFillCircle(circleRadio, offset, lineWidth, strokeStyle, fillStyle, shadowBlur, shadowColor) {
    this.strokeCircle(circleRadio, offset, lineWidth, strokeStyle)
    this.fillCircle(circleRadio, offset, fillStyle, shadowBlur, shadowColor)
  }

  fillText() {
    this.ctx.restore()
    this.ctx.save()
    this.ctx.translate(this.centerX, this.centerX)
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillStyle = this.cRes.text
    this.ctx.font = `${26 * this.rem}px arial`;
    this.ctx.fillText(this.textValue, 0, 0);
  }

  addCanvasEvent() {
    this.canvas.addEventListener('mousedown', ev => {
      if (this.waveTimer || this.waveTimer1) this.removeTimer1(), this.removeTimer()
      else this.startWave1()
    })
  }
}
