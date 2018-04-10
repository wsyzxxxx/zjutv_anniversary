var express = require('express');
var router = express.Router();
var adminModel = require('../models/AdminModel');

/* GET home page. */
router.get('/', function(req, res, next) {
    adminModel.showPictures(req, res);
});

router.get('/gallery', function(req, res, next) {
    adminModel.showPictures(req, res);
});

module.exports = router;