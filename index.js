const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
const img = new Image();
const imgWidth = c.width
const imgHeight = c.height;
let ishover = false

// img.crossOrigin = 'Anonymous';
// img.src = "./GitHub.jpg"
// img.width = imgWidth
// img.onload = function() {
  
// };
// ctx.drawImage(img, 0, 0);
  // img.style.display = 'none';

function getImg (coordinate) {
  const {xmin, xmax, ymin, ymax} = coordinate
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const width = xmax - xmin;
  const height = ymax - ymin;
  canvas.width = 80;
  canvas.height = 80;
  ctx.drawImage(document.getElementById('example-img'), xmin, ymin,width, height);
  // ctx.drawImage(document.getElementById('durimg'),0,0);
  document.body.appendChild(canvas);
}


class popUp {
  constructor() {
    this.ctx = document.querySelector(".container");
    this.coordinate = null
  }

  drawPopup (coordinate) {
    this.coordinate = coordinate;
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

// 坐标数据
const coordinate = {
  xmin: 400,
  ymin: 120,
  xmax: 630,
  ymax: 320,
  scroe: 0.9898,
  scroe: 0.9898,
  name: "一只小猫"
};
const coordinate2 = {
  xmin: 30,
  ymin: 30,
  xmax: 130,
  ymax: 130,
  scroe: 0.9898,
  name: "zang_wu2"
};
const arr = {
  len: 2,
  results:[coordinate,coordinate2]
}
// 绘制缺陷名称
function drawText (coordinate, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.font = "20px 黑体";
  ctx.fillText(
    coordinate.name,
    coordinate.xmin + 10,
    coordinate.ymin - 5
  );
  ctx.restore()
}

// 绘制标记框
function drawMark (coordinate, color) {
  drawText(coordinate, color)
  ctx.save()
  ctx.strokeStyle = color;
  const { xmin, ymin, xmax, ymax } = coordinate
  const width = xmax - xmin;
  const height = ymax - ymin;
  ctx.clearRect(xmin, ymin, width, height + 20);
  ctx.strokeRect(xmin, ymin, width, height);
  ctx.restore()
}

// 绘制
function draw () {
  if (!ishover) {
    popup.closePopup()
  }
  arr.results.map(item => {
    if (!item.ishover) {
      drawMark(item, '#578aef')
    } else {
      drawMark(item, '#ffee6f')
      popup.drawPopup(item)
      popup.openPopup()
    }
  })
}

const popup = new popUp()
c.onmousemove = (e) => {
  const x = e.layerX;
  const y = e.layerY;
  flag(x, y, arr.results)
  window.requestAnimationFrame(draw)
  popup.movePopup(x, y)
};


function flag (x, y, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (
      x > arr[i].xmin &&
      x < arr[i].xmax &&
      y < arr[i].ymax &&
      y > arr[i].ymin
    ) {
      ishover = true
      arr[i].ishover = true
      return arr[i]
    } else {
      arr[i].ishover = false
      }
  }
  ishover = false
}

draw(arr)