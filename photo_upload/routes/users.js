var express = require('express');
var router = express.Router();
var formidable = require('formidable'),
    fs = require('fs'),
    UPLOAD_FOLDER = "/upload",
    domain = "http:";
var uploadModel = require('../models/UploadModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render("upload");
});

router.all('/photo_from_microapp', function(req, res, next) {
    console.log("something happened!!!");
})

router.post('/upload', function(req, res, next) {
    var form = new formidable.IncomingForm();
    var formData; //表单数据，用来传入formData
    var photoPath; //照片路径，用来传入uploadModel
    form.encoding = 'utf-8'; //设置编辑
    form.uploadDir = 'public' + UPLOAD_FOLDER; //设置上传目录
    form.keepExtensions = true; //保留后缀
    form.parse(req, function(err, fields, files) {
        if (err) {
            res.locals.error = err;
            return;
        }
        var extName = ''; //后缀名
        switch (files.photo.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }
        console.log(fields);
        console.log(files);
        if (extName.length == 0) {
            res.locals.error = '只支持png和jpg格式图片';
            console.log("不好意思，上传只支持png和jpg格式照片")
                //res.send("不好意思，上传只支持png和jpg格式照片");
            return;
        }

        formData = fields;
        photoPath = files.photo.path;
        console.log(fields);
        console.log(files.photo.path);
    });

    form.on('progress', function(bytesReceived, bytesExpected) {
        console.log("当前进度" + bytesReceived + ";" + bytesExpected);
    });

    form.on('end', function() {
        uploadModel.uploadPhoto(req, res, formData, photoPath);
        //res.send("上传成功！");
    });
})
module.exports = router;