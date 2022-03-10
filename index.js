// import draw from "./control";

const img = document.getElementById('example-img');
const from = document.getElementById('upload_form');
const url = 'http://172.18.12.13:8000/predict/'
from.onsubmit = e => {
  let formData = new FormData(from);
  const img = e.target[0].files[0];
  const imgUrl = URL.createObjectURL(img)
  const actions = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    body:formData
  }
  
  // console.log(formData.get('image'));
  fetch(url, actions)
    .then(res => {
      return res.json()
    })
    .then(data => {
      console.log(data)
      ctx.clearRect(0,0,640,480)
      document.getElementById('example-img').src = imgUrl
      draw(data.result)
      // getImg(data.result[0])
      c.onmousemove = (e) => {
        const x = e.layerX;
        const y = e.layerY;
        flag(x, y, data.result)
        draw(data.result)
        popup.movePopup(x, y)
      };
    })
    .catch(err => {
      console.log('请求失败', err)
  })
  return false;
}