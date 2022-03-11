const img = document.getElementById('example-img');
const from = document.getElementById('upload_form');
const exImg = document.getElementById('example-img');
const url = 'http://172.18.12.13:8000/predict/'


from.onsubmit = e => {
  let formData = new FormData(from);
  if (formData.get('image').size === 0) {
    alert('请选择预测图片')
    return false; 
  }
  formData.append('model_name', 'example')
  $('.loading').css('opacity', '1');
  $('.btn').val('识别中...')
  const actions = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    body:formData
  }
  getResult(url, actions)
  
  return false;
}

function getResult (url, actions) {
    fetch(url, actions)
    .then(res => {
      return res.json()
    })
      .then(data => {
        $('.loading').css('opacity', '0')
        $('.btn').val('开始识别')
        ctx.clearRect(0,0,640,480)
        draw(data.result)
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
  }
