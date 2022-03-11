$('#chooseFile').bind('change', function () {
  var filename = $("#chooseFile").val();
  const img = $("#chooseFile")[0].files[0]
  if (/^\s*$/.test(filename)) {
    $(".file-upload").removeClass('active');
    $("#noFile").text("请选择图片..."); 
  }
  else {
    $(".file-upload").addClass('active');
    $("#noFile").text(filename.replace("C:\\fakepath\\", "")); 
    const imgUrl = URL.createObjectURL(img);
    document.querySelector('#example-img').src = imgUrl
  }
});
