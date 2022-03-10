const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
const li = document.querySelector('.list-item')
let ishover = false

function getImg (coordinate) {
  const {xmin, xmax, ymin, ymax} = coordinate
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const width = xmax - xmin;
  const height = ymax - ymin;
  canvas.width = 80;
  canvas.height = 80;
  ctx.drawImage(document.getElementById('example-img'), xmin, ymin,width, height);
  
  let newImage = new Image();
  newImage.src = canvas.toDataURL("image/png");
  newImage.classList.add('myImage')
  li.appendChild(newImage);
}


class popUp {
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

// 绘制缺陷名称
function drawText (coordinate, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.font = "20px 黑体";
  ctx.fillText(
    coordinate.class_name,
    coordinate.xmin + 10,
    coordinate.ymin - 5
  );
  ctx.restore()
}

// 绘制标记框
function drawMark (coordinate, color) {
  const { xmin, ymin, xmax, ymax } = coordinate
  const width = xmax - xmin;
  const height = ymax - ymin;

  ctx.clearRect(xmin, ymin-20, width, height + 40);
  drawText(coordinate, color)
  ctx.save()
  ctx.strokeStyle = color;
  ctx.strokeRect(xmin, ymin, width, height);
  ctx.restore()
}

// 绘制
function draw (arr) {
  if (!ishover) {
    popup.closePopup()
  }
  arr.map(item => {
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

// function loading () {
//   let timer = null;
//   timer = setInterval(() => {
//     document.getElementById('example-img').style.opacity += 0.1
//     if (document.getElementById('example-img').style.opacity >= 1) {
//       clearInterval(timer)
//     }
//   }, 100);
// }