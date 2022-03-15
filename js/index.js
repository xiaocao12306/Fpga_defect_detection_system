const img = document.getElementById('example-img');
const from = document.getElementById('upload_form');
const exImg = document.getElementById('example-img');
const url = 'http://172.16.84.201:8000/'


from.onsubmit = e => {
  let formData = new FormData(from);
  if (formData.get('image').size === 0) {
    alert('请选择预测图片')
    return false; 
  }
  // formData.append('model_name', 'example')
  $('.loading').css('opacity', '1');
  $('.btn').val('识别中...')
  const actions = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    body:formData
  }
  getResult(url + 'predict/', actions)
  
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
        console.log(data)
        const mark = new Mark('myCanvas', data.result[0])
        mark.draw()
      })
      .catch(err => {
        console.log('请求失败', err)
    })
  }

function getHistoryResult (url) {
  fetch(url +'predict/'+ '?size=5')
    .then((response) => response.json())
    .then(data => {
      const { image_info } = data
      image_info.forEach((image) => {
        const tr = document.createElement('tr')
        const content = `
          <td class="lalign">
            <img src="http://172.16.84.201:8000${image.image_path}" class="list-img" alt="">
          </td>
          <td>${image.id}</td>
          <td>${image.image_use_model}</td>
          <td>${formatDate(image.image_upload_time)}</td>
          <td>${image.image_defect_number}</td>
          `
        tr.innerHTML = content
        $('#keywords tbody').append(tr);
      })
    })
  
}

function formatDate (now){
  var date = new Date(now)
  var y = date.getFullYear() // 年份
  var m = date.getMonth() + 1 // 月份，注意：js里的月要加1
  if(m<10){
  m="0"+m;
  }
  var d = date.getDate() // 日
  if(d<10){
  d="0"+d;
  }
  var h = date.getHours() // 小时
  if(h<10){
  h="0"+h;
  }
  var min = date.getMinutes() // 分钟
  if(min<10){
  min="0"+min;
  }
  var s = date.getSeconds() // 秒
  if(s<10){
  s="0"+s;
  }
  // 返回值，根据自己需求调整，现在已经拿到了年月日时分秒了
  return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s
}

getHistoryResult(url) 