  $(window).ready(function() {
    adjust();

    $(".clickable").click(function(){
      $("#pic_file").click();
    });
  });

  $("#pic_file").on("change", function () {
    var file = this.files[0];
    var imageType = /image.*/;
    if (file != null && file.type.match(imageType)) {
        var reader = new FileReader();
        reader.onload = function () {
          $("#picture").attr("src",reader.result);
          var img = new Image();
          img.src = reader.result;
          img.onload = function(){
            if(img.width > img.height){
              $("#picture").css("padding",(img.width-img.height)/img.width * $("#picture").width()/2 + "px 15px");
            }
            else{
              $("#picture").css("padding","15px " + (img.height-img.width)/img.height * $("#picture").width()/2 + "px");
            }
          }
            
        };
        reader.readAsDataURL(file);
    } else {
        alert("图片打开失败,请确认文件类型！");
    }
  });

  $(window).resize(function() {
     adjust();
  });



  function adjust(){

    if($(window).width() > 768){

      $(".row-wrap").each(function(){
        this.style.height = this.offsetWidth / 5 + 'px';
        this.style.paddingTop = this.offsetWidth / 10 - 17 + 'px';
      }
      );

      var dpt = document.getElementById("description");
      dpt.style.height = dpt.offsetWidth/5*2+'px';

      $(".pic_reminder").removeClass("dash-bord");
    }
    else{
      $(".pic_reminder").addClass("dash-bord");
    }

    var picture = document.getElementById("picture");
    picture.style.height = picture.offsetWidth+'px';
  }