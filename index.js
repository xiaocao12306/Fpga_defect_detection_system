const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
const img = document.getElementById("img")
ctx.drawImage(img, 0, 0)
ctx.save();
class popUp {
  constructor() {
    this.ctx = document.querySelector(".container");
    this.coordinate = null
  }

  drawPopup() {
    const content = `
          <li>name：${this.coordinate.name}</li>
          <li>scroe：${this.coordinate.scroe}</li>
          <li>xmin：${this.coordinate.xmin}</li>
          <li>ymin：${this.coordinate.ymin}</li>
          <li>xmax：${this.coordinate.xmax}</li>
          <li>ymax：${this.coordinate.ymax}</li>
          `;
    this.ctx.innerHTML = content;
  }

  openPopup (x, y, coordinate) {
    this.coordinate = coordinate;
    this.drawPopup()
    this.ctx.classList.add("open");
    this.ctx.style.top = y + "px";
    this.ctx.style.left = x + 20 + "px";
  }

  closePopup() {
    this.ctx.classList.remove("open");
  }
}

// 坐标数据
const coordinate = {
  xmin: 200,
  ymin: 60,
  xmax: 330,
  ymax: 170,
  scroe: 0.9898,
  name: "一只小猫"
};

const coordinate2 = {
  xmin: 10,
  ymin: 10,
  xmax: 100,
  ymax: 100,
  scroe: 0.9898,
  class_name: "zang_wu2"
};

const arr = {
  len: 2,
  results:[coordinate]
}
// 绘制缺陷名称
function drawText(coordinate, color) {
  ctx.fillStyle = color;
  ctx.fillRect(coordinate.xmin, coordinate.ymin - 20, 60, 20);
  ctx.stroke();
  ctx.strokeStyle = "white";
  ctx.font = "20px";
  ctx.strokeText(
    coordinate.name,
    coordinate.xmin + 10,
    coordinate.ymin - 5
  );
}

// 绘制标记框
function drawMark (coordinate, color) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(coordinate.xmin, coordinate.ymin);
  ctx.lineTo(coordinate.xmax, coordinate.ymin);
  ctx.lineTo(coordinate.xmax, coordinate.ymax);
  ctx.lineTo(coordinate.xmin, coordinate.ymax);
  ctx.lineTo(coordinate.xmin, coordinate.ymin);
  ctx.stroke();
}

function draw (arr) {
  arr.results.map(item => {
    ctx.save();
    drawMark(item, 'red')
    drawText(item, 'red')
    ctx.restore();
  })
}

const popup = new popUp()
draw(arr)
c.onmousemove = (e) => {
  const x = e.clientX;
  const y = e.clientY;
  const currentMark = flag(x, y, arr.results)
  if (currentMark) {
    ctx.save();
    drawMark(currentMark, 'green')
    ctx.restore();

    popup.openPopup(x, y, currentMark)
  } else {
    ctx.save()
    ctx.strokeStyle = 'red'
    ctx.stroke()
    ctx.restore()
    popup.closePopup()
  }
};

function flag (x, y, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (
      x > arr[i].xmin &&
      x < arr[i].xmax &&
      y < arr[i].ymax &&
      y > arr[i].ymin
    ) {
        return arr[i];
      }
  }
  return false;
}

// left-top 210,89 right-top 320 78 left-b 216 171 right-b 323 154