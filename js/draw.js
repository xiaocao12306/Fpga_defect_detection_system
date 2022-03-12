class Mark {
  constructor(el, options) {
    this.c = document.getElementById(el);
    this.ctx = this.c.getContext('2d');
    this.width = this.c.width;
    this.height = this.c.height;

    // 标记信息
    this.result = options.result;
    this.popup = new Popup()

    // 鼠标信息
    this.x = null;
    this.y = null;
  }
  
  // 判断鼠标是否在标记框内
  ishover () {
    for (let i = 0; i < this.result.length; i++) {
      if (
        this.x >  this.result[i].xmin &&
        this.x <  this.result[i].xmax &&
        this.y <  this.result[i].ymax &&
        this.y >  this.result[i].ymin
      ) {
        this.result[i].ishover = true
        return  this.result[i]
      } else {
        this.result[i].ishover = false
      }
    }
    return false
  }

  // 绘制缺陷名称
  drawText(coordinate, color) {
    this.ctx.save()
    this.ctx.fillStyle = color
    this.ctx.font = '20px 黑体'
    this.ctx.fillText(coordinate.class_name, coordinate.xmin + 10, coordinate.ymin - 5)
    this.ctx.restore()
  }
  
  // 绘制标记框
  drawMark(coordinate, color) {
    const { xmin, ymin, xmax, ymax } = coordinate
    const width = xmax - xmin
    const height = ymax - ymin
  
    // this.ctx.clearRect(xmin, ymin - 20, width, height + 40)
    this.drawText(coordinate, color)
    this.ctx.save()
    this.ctx.strokeStyle = color
    this.ctx.strokeRect(xmin, ymin, width, height)
    this.ctx.restore()
  }

  // 开始绘制标记框
  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    const ishover = this.ishover()
    if (!ishover) {
      this.popup.closePopup()
    }
    this.markInteract()
    this.result.forEach((item) => {
      if (!item.ishover) {
        this.drawMark(item, '#578aef')
      } else {
        this.drawMark(item, '#ffee6f')
        this.popup.drawPopup(item)
        this.popup.openPopup()
      }
    })
  }

  // 鼠标交互
  markInteract () {
    this.c.onmousemove = (e) => {
      this.x = e.layerX;
      this.y = e.layerY;
      this.draw()
      this.popup.movePopup(this.x, this.y)
    };
  }
}