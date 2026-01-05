import OutViews from "./out_views.js"
import InnerLines from "./inner_lines.js"
import InnerProgress from "./inner_progress.js"
import InnerText from "./inner_text.js"

let mapPadding = 3 //内边距-周围的小圆半径也是使用3

export default class CircleProgress {
  constructor(value, type) {
    this.type = type
    this.border = 1
    this.rotate = 0
    this.timer = null
    this.value = value
    this.canvas = document.getElementById('progress_canvas')
    this.initCanvasView()
    this.addMapEvent()
  }

  initCanvasView() {
    this.ctx = this.canvas.getContext('2d')
    this.canvasInfo = this.canvas.getBoundingClientRect()
    this.mapWidth = this.canvasInfo.width
    this.rem = this.mapWidth / 300
    this.centerX = this.mapWidth / 2
    this.circleRadio = this.mapWidth / 2 - mapPadding * this.rem
  }

  painting() {
    //重置坐标系及相关配置
    this.ctx.restore()
    this.ctx.clearRect(0, 0, this.canvasInfo.width, this.canvasInfo.height)
    this.outViews = new OutViews({...this}).paint()
    this.innerLines = new InnerLines({...this}, this.circleRadio - 20 * this.rem).paint()
    this.innerProgress = new InnerProgress({...this}, this.circleRadio - 40 * this.rem).paint(this.value)
    this.innerText = new InnerText({...this}).paint(this.value)
    return this
  }

  addMapEvent() {
    this.canvas.addEventListener('mousemove', ev => {
      console.log("mousemove")
      const currentX = ev.offsetX, currentY = ev.offsetY
      let isIn = this.innerLines.isPointIn(currentX, currentY)
      this.border = isIn ? 1.2 : 1
      if (isIn) this.addTimer()
      else this.removeTimer()
    })
  }

  addTimer() {
    this.removeTimer()
    this.timer = setInterval(() => {
      this.rotate += 5
      this.painting()
    }, 100)
    return this
  }

  removeTimer() {
    if (this.timer != null) clearInterval(this.timer), this.timer = null
    this.painting()
  }
}

