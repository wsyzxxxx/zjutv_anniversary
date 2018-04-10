var express = require('express');
var router = express.Router();
var adminModel = require('../models/AdminModel');

router.all('/', function(req, res, next) {
    loginbean = req.session.loginbean;
    if (loginbean) {
        if (loginbean.identity == 1)
        /*res.render('admin',{
			    loginbean:loginbean
		})*/
            adminModel.adminInfo(req, res, loginbean);
    } else
        res.render('verification');

})

router.post('/verification', function(req, res, next) {
    adminModel.adminLogin(req, res);
})

router.post('/pass', function(req, res, next) {
    if (req.body['status'] == 1)
        adminModel.checkPass(req, res);
    else
        adminModel.rejectApply(req, res);
})

router.post('/reject', function(req, res, next) {
    adminModel.rejectApply(req, res);
})

module.exports = router;