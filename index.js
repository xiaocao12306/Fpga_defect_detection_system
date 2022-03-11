// import draw from "./control";

const img = document.getElementById('example-img');
const from = document.getElementById('upload_form');
const url = 'https://172.18.12.13:8000/predict/'
from.onsubmit = e => {
  let formData = new FormData(from);
  const img = e.target[0].files[0];
  const imgUrl = URL.createObjectURL(img);
  document.getElementById('example-img').src = imgUrl
  document.getElementById('example-img').classList.add('loading')
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

// fetch(url, { method: 'GET' })
//   .then(res => {
//   return res.json();
//   })
//   .then(data => {
//     const { image_info } = data;
//     image_info.forEach(info => {
//       let li = document.createElement('li');
//       li.classList.add('list-item');
//       const content = `
//         <img src="${'http://172.18.12.13:8000' + info.image_path}" id="myImage" alt=""class="list-img" />
//         <table>
//           <tr>
//             <th>score</th>
//             <th>name</th>
//             <th>xmin</th>
//             <th>xmax</th>
//             <th>ymin</th>
//             <th>ymax</th>
//           </tr>
//           <tr>
//             <td>${result.score}</td>
//             <td>${result.class_name}</td>
//             <td>${result.xmin}</td>
//             <td>${result.xmax}</td>
//             <td>${result.ymin}</td>
//             <td>${result.ymax}</td>
//           </tr>
//         </table>
//       `
//       li.innerHTML =content
//       document.querySelector('.list').appendChild(li)
//     })
// })