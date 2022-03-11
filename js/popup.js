class Popup {
  constructor() {
    this.ctx = document.querySelector(".container");
    this.coordinate = null
  }

  drawPopup (coordinate) {
    this.coordinate = coordinate;
    const content = `
          <li>class_name：${this.coordinate.class_name}</li>
          <li>score：${this.coordinate.score}</li>
          <li>xmin：${this.coordinate.xmin}</li>
          <li>ymin：${this.coordinate.ymin}</li>
          <li>xmax：${this.coordinate.xmax}</li>
          <li>ymax：${this.coordinate.ymax}</li>
          `;
    this.ctx.innerHTML = content;
  }

  openPopup () {
    if (!Array.from(this.ctx.classList).includes('open')) {
      this.ctx.classList.add("open");
    }
  }

  movePopup (x, y) {
    this.ctx.style.top = y + "px";
    this.ctx.style.left = x + 20 + "px";
  }

  closePopup() {
    this.ctx.classList.remove("open");
  }
}
