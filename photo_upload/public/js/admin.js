$(window).ready(function() {
    adjust();

    $(".pic").click(function() {
        $("#oriPic img").attr("src", $(this).attr("src"));
    })

});

function adjust() {
    $(".card").each(function() {
        $(this).ready(function() {
            $(this).height($(this).width());
        });
    });
    $(".card img").each(function() {
        $(this).ready(function() {
            //alert("surprise!" + $(this).width() + " " + $(this).height());
            if ($(this).width() > $(this).height()) {
                $(this).css("padding", ($(this).width() - $(this).height()) / $(this).width() * $(this).parent().width() / 2 + "px 15px");
            } else {
                $(this).css("padding", "15px " + ($(this).height() - $(this).width()) / $(this).height() * $(this).parent().width() / 2 + "px");
            }
        });
    });
}

function checkStatus(value) {
    console.log(value);
    if (value == 1) {
        try {
            document.getElementById("allstatus").value = 1;
        } finally {
            try {
                document.getElementById("passstatus").value = 1;
            } finally {
                document.getElementById("rejectstatus").value = 1;
            }
        }
    } else {
        try {
            document.getElementById("allstatus").value = 0;
        } finally {
            try {
                document.getElementById("passstatus").value = 0;
            } finally {
                document.getElementById("rejectstatus").value = 0;
            }
        }
    }
}

// function checkSubmit() {
//     alert(document.getElementById("allstatus").value);
//     return false;
// }