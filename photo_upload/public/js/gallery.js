$(window).ready(function() {
    adjust();
    $("#gallery .box div").click(function() {
        $("#oriPic img").attr("src", $(this).prev().attr("src"));
    })
});

/*$(window).resize(function() {
	try{
		if(resizeTimer == undefined || resizeTimer)clearTimeout(resizeTimer);
	}catch(e){}
    resizeTimer = setTimeout(function() {
        adjust();
    }, 500);
});*/

function adjust() {
    $("#gallery .box div").hide();
    var boxes = $("#gallery .box");
    var recent_num = 0;
    var recent_width = 0;
    for (var index = 0; index < boxes.length; index++) {
        recent_width += $(boxes[index]).width();
        if (recent_width >= $("#gallery").width() - $(boxes[index]).height() / 2) {
            var new_height = $("#gallery").width() * $(boxes[index]).height() / (recent_width + recent_num * 16) - 8;
            for (var i = 0; i <= recent_num; i++) {
                $(boxes[index - i]).find("img").height(new_height);
                $(boxes[index - i]).find("div").height(new_height);
                $(boxes[index - i]).find("div").width($(boxes[index - i]).width());
                var picIntro = $("<div class = 'single-line pic-intro'></div>").text("<%= row.name %>");
                $(boxes[index - i]).find("div").append(picIntro);
            }
            recent_num = 0;
            recent_width = 0;
        } else
            recent_num += 1;
    }

    $("#gallery .box div").hover(function() {
            var picTitle = $("<div class = 'pic-title'></div>").text("<%= row.name %>");
            var picContent = $("<div class = 'pic-content'></div>").text("<%= row.description %>");
            $(this).empty();
            $(this).append(picTitle, picContent);
        },
        function() {
            var picIntro = $("<div class = 'single-line pic-intro'></div>").text("<%= row.name %>");
            $(this).empty();
            $(this).append(picIntro);
        }
    );
    $("#gallery .box div").show();
}