var express = require('express');
var router = express.Router();
var adminModel = require('../models/AdminModel');

/* GET home page. */
router.get('/', function(req, res, next) {
    adminModel.showPictures(req, res);
});

router.all('/logout', function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    })
});

router.get('/gallery', function(req, res, next) {
    adminModel.showPictures(req, res);
});

router.get('/RyLLB83WFX.txt', function(req, res, next) {
	res.sendFile("/public/RyLLB83WFX.txt");
});

module.exports = router;
