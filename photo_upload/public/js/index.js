  var i = 2;

  $(window).ready(function() {
      adjust();
      binding();
      $(".pic_file").change();
  });

  $(window).resize(function() {
      adjust();
  });

  function adjust() {

      if ($(window).width() > 768) {

          $(".row-wrap").each(function() {
              this.style.height = this.offsetWidth / 4 + 'px';
              this.style.paddingTop = this.offsetWidth / 8 - 17 + 'px';
          });

          //var dpt = document.getElementById("description");
          //dpt.style.height = dpt.offsetWidth / 5 * 2 + 'px';

          $(".pic_reminder").removeClass("dash-bord");
      } else {
          $(".pic_reminder").addClass("dash-bord");
      }

      var picture = document.getElementsByClassName("pic");
      //console.log(picture);
      HTMLCollection.prototype.toArray = function() {
          return [].slice.call(this);
      };
      picture.toArray().forEach(picc => {
          picc.height = picc.offsetWidth + 'px';
      });
      //picture.height = picture.offsetWidth + 'px';
  }

  function addpic() {
      $("#mainlist").before('<div class="col-split col-sm-offset-0 col-sm-6 col-xs-offset-1 col-xs-10">' +
          '<div class="white card photolist">' +
          '<div class = "delete clickable">×</div>' +
          '<div class= "pic"><img id="picture' + i + '" class="clickable showpic" src="img/logo.svg"></div>' +
          '<input name="photo' + i + '" type="file" class="pic_file" id="pic_file' + i + '" style="display: none">' +
          '<div id="description' + i + '" class="description">' +
          '<div class="col-lg-2 col-sm-3 col-xs-2" style = "padding-right: 0px;">' +
          '<label>图片描述 </label>' +
          '</div>' +
          '<div class="col-lg-10 col-sm-9 col-xs-10"><textarea class="form-control describe" name="description' + i + '" placeholder="请添加必要的图片说明"></textarea></div>' +
          '</div></div></div>' +
          '<div class="clearfix visible-sm-block"></div>'
      );

      newbinding(i);
      i += 1;
  }

  function newbinding(val) {
      $(".delete").click(function() {
          $(this).parent().parent().remove();
      });

      $("#picture" + val).click(function() {
          $(this).parent().siblings(".pic_file").click()
      });

      $("#pic_file" + val).on("change", function() {
          if (this.files.length != 0) {
              var file = this.files[0];
              var imageType = /image.*/;
              var pic = $(this).siblings(".pic").children();
              if (file != null && file.type.match(imageType)) {
                  var reader = new FileReader();
                  reader.onload = function() {
                      $(pic).attr("src", reader.result);
                      var img = new Image();
                      img.src = reader.result;
                      img.onload = function() {
                          if (img.width > img.height) {
                              $(pic).css("padding", (img.width - img.height) / img.width * $(pic).width() / 2 + "px 0px");
                              $(pic).parent().height($(pic).parent().width());
                          } else {
                              $(pic).css("padding", "0px " + (img.height - img.width) / img.height * $(pic).width() / 2 + "px");
                              $(pic).parent().height($(pic).parent().width());
                          }
                      }

                  };
                  reader.readAsDataURL(file);
              } else {
                  alert("图片打开失败,请确认文件类型！");
              }
          }
      });
  }

  function binding() {
      $(".delete").click(function() {
          $(this).parent().parent().remove();
      });

      $(".showpic").click(function() {
          $(this).parent().siblings(".pic_file").click()
      });

      $(".pic_file").on("change", function() {
          console.log("change");
          if (this.files.length != 0) {
              var file = this.files[0];
              var imageType = /image.*/;
              var pic = $(this).siblings(".pic").children();
              if (file != null && file.type.match(imageType)) {
                  var reader = new FileReader();
                  reader.onload = function() {
                      $(pic).attr("src", reader.result);
                      var img = new Image();
                      img.src = reader.result;
                      img.onload = function() {
                          if (img.width > img.height) {
                              $(pic).css("padding", (img.width - img.height) / img.width * $(pic).width() / 2 + "px 0px");
                              $(pic).parent().height($(pic).parent().width());
                          } else {
                              $(pic).css("padding", "0px " + (img.height - img.width) / img.height * $(pic).width() / 2 + "px");
                              $(pic).parent().height($(pic).parent().width());
                          }
                      }

                  };
                  reader.readAsDataURL(file);
              } else {
                  alert("图片打开失败,请确认文件类型！");
              }
          }
      });
  }

  function checkTel(tel) {
      var mobile = /^1[3|5|8]\d{9}$/,
          phone = /^0\d{2,3}-?\d{7,8}$/;
      return mobile.test(tel) || phone.test(tel);
  }

  function checkPic(picture) {
      var flag = true
      HTMLCollection.prototype.toArray = function() {
          return [].slice.call(this);
      };
      picture.toArray().forEach(picc => {
          if (picc.value == "") {
              flag = false;
          }
      });
      if (flag) {
          return true;
      } else {
          return false;
      }
  }

  //   function bindSaveTap() {
  //       var name = document.getElementsByName("name");
  //       var phone = document.getElementsByName("phone");
  //       var picture = document.getElementsByClassName("pic_file");
  //       if (name[0].value == "") {
  //           alert('请输入您的名字!');
  //           return false;
  //       } else if (!checkTel(phone[0].value)) {
  //           alert('请输入正确电话号码!');
  //           return false;
  //       } else if (!checkPic(picture)) {
  //           alert('请保证所有图片选择框都已选择图片!');
  //           return false;
  //       }

  //       return true;
  //   }

  $(function() {
      var bar = $('.bar');
      var percent = $('.percent');
      var status = $('#status');
      $('#uploadform').ajaxForm({
          beforeSubmit: function() {
              var name = document.getElementsByName("name");
              var phone = document.getElementsByName("phone");
              var picture = document.getElementsByClassName("pic_file");
              if (name[0].value == "") {
                  alert('请输入您的名字!');
                  return false;
              } else if (!checkTel(phone[0].value)) {
                  alert('请输入正确电话号码!');
                  return false;
              } else if (!checkPic(picture)) {
                  alert('请保证所有图片选择框都已选择图片!');
                  return false;
              }

              $("#updatemodal").modal({
                  escapeClose: false,
                  clickClose: false,
                  showClose: false
              });

              return true;
          },
          beforeSend: function() {
              status.empty();
              var percentVal = '0%';
              bar.width(percentVal)
              percent.html(percentVal);
          },
          uploadProgress: function(event, position, total, percentComplete) { //上传的过程
              //position 已上传了多少
              //total 总大小
              //已上传的百分数
              var percentVal = percentComplete + '%';
              bar.width(percentVal)
              percent.html(percentVal);
              //console.log(percentVal, position, total);
          },
          success: function(data) { //成功
              var percentVal = '100%';
              bar.width(percentVal)
              percent.html(percentVal);
              alert(data);
              window.location.href = "/";
          },
          error: function(err) { //失败
              alert("上传失败，请重试！" + err.msg);
          }
      });
  });