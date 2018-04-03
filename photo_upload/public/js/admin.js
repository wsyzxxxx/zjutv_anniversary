$(window).ready(function() {
  adjust();

  $(".pic").click(function(){
     $("#oriPic img").attr("src", $(this).attr("src"));
  })

});

function adjust() {
  $(".card .pic").each(function(){
      $(this).ready(function(){
        if ( $(this).width() > $(this).height()) {
          $(this).css("padding", ($(this).width() - $(this).height()) / $(this).width() * $(this).parent().width() / 2 + "px 15px");
        } 
        else {
          $(this).css("padding", "15px " + ($(this).height() - $(this).width()) / $(this).height() * $(this).parent().width() / 2 + "px");
        }
      });
    });
}