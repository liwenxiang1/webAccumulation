let textHorMargin = 32 //文字左右边距
export default class Radar {
  constructor({average, real}) {
    this.real = real
    this.average = average
    this.moveTimer = null
    this.canvas = document.getElementById('radar_canvas')
    this.curStep = {step: 0, lineIndex: 0}//当前步骤点信息
    this.curStepLine = {s: {x: 0, y: 0}, e: {x: 0, y: 0}, xSpan: 0, ySpan: 0, stepNum: 0}
    this.linesSteps = []//线条上面的步骤点信息
    this.initCanvasView()
    this.addCanvasEvent()
  }

  initCanvasView() {
    this.ctx = this.canvas.getContext('2d')
    this.canvasInfo = this.canvas.getBoundingClientRect()
    this.mapWidth = this.canvasInfo.width
    this.mapHeight = this.canvasInfo.height
    this.radarWidth = parseInt(this.canvas.getAttribute('radar'))
    this.radarTop = (this.mapHeight - this.radarWidth) / 2
    this.radarLeft = (this.mapWidth - this.radarWidth) / 2
    this.radarX = this.radarWidth / 2
    this.outWidth = Math.sqrt(this.radarX ** 2 + this.radarX ** 2)
    this.outX = this.outWidth / 2
    this.rem = this.mapWidth / 465
  }

  updateValue({average, real}) {
    this.real = real
    this.average = average
    this.painting()
    this.startTimer()
  }

  painting() {
    this.ctx.restore()
    this.ctx.clearRect(0, 0, this.mapWidth, this.mapHeight)
    this.fillAxiosText()
    this.ctx.save()
    this.ctx.translate(this.radarLeft, this.radarTop)
    this.ctx.translate(this.radarX, this.radarX)
    this.ctx.rotate(45 * Math.PI / 180)
    this.ctx.fillRect(0, 0, 2, 2)
    this.ctx.lineWidth = 0.7;
    this.ctx.strokeStyle = "#CACACA";
    this.strokeRect(1, 1)
    this.strokeFillRect(4 / 5, 4 / 5, "#F6F8FC")
    this.strokeFillRect(3 / 5, 3 / 5, "#FFFFFF")
    this.strokeFillRect(2 / 5, 2 / 5, "#F6F8FC")
    this.strokeFillRect(1 / 5, 1 / 5, "#FFFFFF")
    this.strokeLine(-this.outX, -this.outX, this.outX, this.outX)
    this.strokeLine(-this.outX, this.outX, this.outX, -this.outX)
    let pData = this.strokeValueLine(this.real, "#FF8E5E")
    this.strokeValueLine(this.average, "#195497")
    this.movePointProcess(pData)
    this.movePoint(this.curStepLine)
    return this
  }

  movePointProcess({p1, p2, p3, p4}) {
    let lines = [{s: p1, e: p2}, {s: p2, e: p3}, {s: p3, e: p4}, {s: p4, e: p1}]
    let linesSteps = []
    for (let i = 0; i < lines.length; i++) {
      let {s, e} = lines[i]
      let distance = this.getDistanceLine(s, e)
      let stepNum = Math.floor(distance / 1)
      let xSpan, ySpan
      xSpan = this.getDistanceAxis(s.x, e.x) / stepNum
      ySpan = this.getDistanceAxis(s.y, e.y) / stepNum
      linesSteps.push({s, e, xSpan, ySpan, stepNum})
    }
    this.linesSteps = linesSteps
  }

  getDistanceAxis(v1, v2) {
    if ((v1 >= 0 && v2 >= 0) || (v1 <= 0 && v2 <= 0))
      return Math.abs(Math.abs(v1) - Math.abs(v2))
    if ((v2 <= 0 && v1 >= 0) || (v1 <= 0 && v2 >= 0))
      return Math.abs(v1) + Math.abs(v2)
  }

  getDistanceLine(p1, p2) {
    let a = p2.x - p1.x;
    let b = p2.y - p1.y;
    return Math.sqrt(a * a + b * b);
  }

  movePoint({s, e, xSpan, ySpan, stepNum}) {
    this.ctx.save()
    this.curStep.step += 1
    this.ctx.fillStyle = "#FF8E5E"
    this.ctx.shadowOffsetX = 2
    this.ctx.shadowOffsetY = 2
    this.ctx.shadowColor = 'rgba(100, 100, 100, 0.8)'
    this.ctx.shadowBlur = 2
    this.ctx.beginPath()
    let potX = e.x > s.x ? s.x + this.curStep.step * xSpan : s.x - this.curStep.step * xSpan
    let potY = e.y > s.y ? s.y + this.curStep.step * ySpan : s.y - this.curStep.step * ySpan
    this.ctx.arc(potX, potY, 3, 0, 2 * Math.PI)
    this.ctx.closePath();
    this.ctx.fill()
    this.ctx.restore()
  }

  startTimer() {
    if (this.curStepLine.stepNum === 0) this.curStepLine = this.linesSteps[0]
    console.log(this.linesSteps, this.curStepLine)
    this.moveTimer = setInterval(() => {
      // debugger
      if (this.curStep.step >= this.curStepLine.stepNum) {//如果走到线条最后，开始走下一条线路
        if (this.curStep.lineIndex == 3) this.curStep.lineIndex = 0
        else this.curStep.lineIndex += 1
        this.curStep.step = 0
        this.curStepLine = this.linesSteps[this.curStep.lineIndex]
      }
      this.painting()
    }, 30)
    return this
  }

  clearTimer() {
    if (this.moveTimer) clearInterval(this.moveTimer), this.moveTimer = null
  }

  strokeValueLine([v1, v2, v3, v4], fillStyle) {
    let p1 = this.fillCircle(v1, fillStyle, 1)
    let p2 = this.fillCircle(v2, fillStyle, 2)
    let p3 = this.fillCircle(v3, fillStyle, 3)
    let p4 = this.fillCircle(v4, fillStyle, 4)
    this.strokeLine(p1.x, p1.y, p2.x, p2.y, fillStyle)
    this.strokeLine(p2.x, p2.y, p3.x, p3.y, fillStyle)
    this.strokeLine(p3.x, p3.y, p4.x, p4.y, fillStyle)
    this.strokeLine(p4.x, p4.y, p1.x, p1.y, fillStyle)
    return {p1, p2, p3, p4}
  }

  strokeLine(sX, sY, eX, eY, strokeStyle = "#CACACA") {
    this.ctx.lineWidth = 1.4;
    this.ctx.strokeStyle = strokeStyle
    this.ctx.beginPath()
    this.ctx.moveTo(sX, sY);
    this.ctx.lineTo(eX, eY);
    this.ctx.stroke()
  }

  strokeRect(x, w) {
    x = -this.outX * x
    w = this.outWidth * w
    this.ctx.beginPath()
    this.ctx.rect(x, x, w, w)
    this.ctx.stroke()
  }

  strokeFillRect(x, w, fillStyle) {
    x = -this.outX * x
    w = this.outWidth * w
    this.ctx.beginPath()
    this.ctx.rect(x, x, w, w)
    this.ctx.fillStyle = fillStyle
    this.ctx.fill()
    this.ctx.stroke()
  }

  fillCircle(per, fillStyle, flag) {
    let x, y
    if (flag === 1) x = y = -this.outX
    else if (flag === 2) x = this.outX, y = -this.outX
    else if (flag === 3) x = this.outX, y = this.outX
    else x = -this.outX, y = this.outX
    this.ctx.beginPath()
    this.ctx.arc(x * per, y * per, 2, 0, 2 * Math.PI)
    this.ctx.fillStyle = fillStyle
    this.ctx.fill()
    return {x: x * per, y: y * per}
  }

  fillAxiosText() {
    this.ctx.save()
    this.ctx.fillStyle = "#3B4859"
    this.ctx.textBaseline = 'middle';
    this.ctx.font = `${14 * this.rem}px arial`;
    this.ctx.fillText("简单题准确率", 0, this.mapHeight / 2)
    this.ctx.fillText("难题准确率", this.mapWidth / 2 + this.radarWidth / 2 + textHorMargin * this.rem, this.mapHeight / 2)
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'top';
    this.ctx.fillText("简单题用时", this.mapWidth / 2, 0)
    this.ctx.textBaseline = 'bottom';
    this.ctx.fillText("难题用时", this.mapWidth / 2, this.mapHeight)
    this.ctx.restore()
  }

  addCanvasEvent() {
    this.canvas.addEventListener('mousedown', ev => {
      if (this.moveTimer) this.clearTimer()
      else this.startTimer()
    })
  }
}
