var connPool = require("./ConnPool");
var async = require('async');

function uploadWithUser(req, res, formData, photoPath, user_id) {
    pool = connPool();
    pool.getConnection(function(err, conn) {
        if (err) {
            res.send("Get database link failed. The error is: " + err.message);
        }
        var insertSql = "insert into photo(description,status,source,user_id) values ?";
        //var insertParam = [formData['description'], photoPath, user_id];
        var insertParam = [];
        //添加多条数据到insertParam[i];达到批量添加的效果
        for (var i = 0; i < photoPath.length; i++) {
            insertParam[i] = [formData["description" + String(i + 1)], 0, photoPath[i], user_id];
        }
        conn.query(insertSql, [insertParam], function(err, result) {
            if (err) {
                res.send("Database error! " + err.message);
                return;
            }
            res.send("上传成功，请等待管理员审核!");
        });
        conn.release();
    })
}

function uploadWithoutUser(req, res, formData, photoPath) {
    pool = connPool();
    pool.getConnection(function(err, conn) {
        if (err) {
            res.send("Get database link failed. The error is: " + err.message);
        }
        var insertSql = "insert into users(wechat, name, cellphone, grade, user_status) values('',?,?,?,0)";
        var insertParam = [formData['name'], formData['phone'], formData['grade']];
        var selectSql = "select * from users where name=? and cellphone=?";
        var selectParam = [formData['name'], formData['phone']];
        var insertPhotoSql = "insert into photo(description,status,source,user_id) values ?";
        async.waterfall([
            function(callback) {
                conn.query(insertSql, insertParam, function(err, insertResult) {
                    if (err) {
                        res.send("Database error!:" + err.message);
                        return;
                    }
                    callback(null, insertResult);
                })
            },
            function(arg1, callback) {
                //now agr1 equals insertResult
                conn.query(selectSql, selectParam, function(err, userResult) {
                    if (err) {
                        res.send("Database error!:" + err.message);
                        return;
                    }
                    callback(null, userResult);
                })
            },
            function(arg1, callback) {
                //var photoParam = [formData['description'], photoPath, arg1[0].id];
                var photoParam = [];
                //添加多条数据到insertParam[i];达到批量添加的效果
                for (var i = 0; i < photoPath.length; i++) {
                    photoParam[i] = [formData["description" + String(i + 1)], 0, photoPath[i], arg1[0].id];
                }
                conn.query(insertPhotoSql, [photoParam], function(err, photoResult) {
                    if (err) {
                        res.send("Database error!:" + err.message);
                        return;
                    }
                    callback(null, photoResult);
                })
            }
        ], function(err, result) {
            res.send("上传成功，请等待管理员审核!");
        })

        conn.release();
    })
}
module.exports = {
    uploadPhoto: function(req, res, formData, photoPath) {
        pool = connPool();
        pool.getConnection(function(err, conn) {
            if (err) {
                res.send("Get database link failed. The error is: " + err.message);
            }
            var searchSql = "select * from users where name=? and cellphone=?";
            var searchParam = [formData['name'], formData['phone']];
            conn.query(searchSql, searchParam, function(err, result) {
                if (err) {
                    res.send("Database error! " + err.message);
                    return;
                }
                if (result.length > 0) {
                    //当用户信息不存在时的上传
                    var user_id = result[0].id; //用来识别用户id，插入到photo表中
                    uploadWithUser(req, res, formData, photoPath, user_id);
                } else {
                    //当用户信息存在时的上传
                    uploadWithoutUser(req, res, formData, photoPath);
                }
            });
            conn.release();
        })
    }
}