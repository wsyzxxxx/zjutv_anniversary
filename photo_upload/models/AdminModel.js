var connPool = require("./ConnPool");
var adminLoginBean = require('../jsbean/adminLoginBean');
var async = require('async');

function stripPath(obj) {
    //此函数用于裁剪查询结果的path，使图片正常显示在页面上
    for (var i = 0; i < obj.length; i++) {
        var index = obj[i].source.indexOf('/');
        obj[i].source = obj[i].source.substring(index, obj[i].source.length);
    }
    return obj;
}
module.exports = {
    adminLogin: function(req, res) {
        pool = connPool();
        pool.getConnection(function(err, conn) {
            if (err) {
                res.send("Get database link failed. The error is: " + err.message);
            }
            var loginSql = "select * from admin where password=?";
            conn.query(loginSql, req.body['identity_code'], function(err, result) {
                if (err) {
                    res.send("Database error! " + err.message);
                }
                if (result.length > 0) {
                    loginbean = new adminLoginBean();
                    loginbean.identity = 1;
                    req.session.loginbean = loginbean;
                    res.redirect('/admin');
                } else {
                    res.send("<script>alert('密码错误!');window.location.href='/admin';</script>");
                }
            });
            conn.release();
        })
    },

    adminInfo: function(req, res, loginbean) {
        pool = connPool();
        pool.getConnection(function(err, conn) {
            if (err) {
                res.send("Get database link failed. The error is: " + err.message);
            }
            var allSql = "select * from photo join users on photo.user_id=users.id where photo.status=0 order by photo.photo_id desc";
            var passSql = "select * from photo join users on photo.user_id=users.id where photo.status=1 order by photo.photo_id desc";
            var rejectSql = "select * from photo join users on photo.user_id=users.id where photo.status=2 order by photo.photo_id desc";

            async.series({
                one: function(callback) {
                    conn.query(allSql, function(err, allResult) {
                        if (err) {
                            res.send("Database error!:" + err.message);
                            return;
                        }
                        callback(null, allResult);
                    })
                },
                two: function(callback) {
                    conn.query(passSql, function(err, passResult) {
                        if (err) {
                            res.send("Database error!:" + err.message);
                            return;
                        }
                        callback(null, passResult);
                    })
                },
                three: function(callback, rejectResult) {
                    conn.query(rejectSql, function(err, rejectResult) {
                        if (err) {
                            res.send("Database error!:" + err.message);
                            return;
                        }
                        callback(null, rejectResult);
                    })
                }
            }, function(err, results) {
                results['one'] = stripPath(results['one']);
                results['two'] = stripPath(results['two']);
                results['three'] = stripPath(results['three']);
                res.render('admin', {
                    loginbean: loginbean,
                    all: results['one'],
                    pass: results['two'],
                    reject: results['three']
                })
            })
            conn.release();
        })
    },

    checkPass: function(req, res) {
        pool = connPool();
        pool.getConnection(function(err, conn) {
            if (err) {
                res.send("Get database link failed. The error is: " + err.message);
            }
            var updateSql = "update photo set status=1 where photo_id=" + req.body['photo_id'];
            conn.query(updateSql, function(err, result) {
                if (err) {
                    res.send("Database error! " + err.message);
                }
                res.send("<script>alert('更新成功!');window.location.href='/admin';</script>");
            });
            conn.release();
        })
    },

    rejectApply: function(req, res) {
        pool = connPool();
        pool.getConnection(function(err, conn) {
            if (err) {
                res.send("Get database link failed. The error is: " + err.message);
            }
            var updateSql = "update photo set status=2 where photo_id=" + req.body['photo_id'];
            conn.query(updateSql, function(err, result) {
                if (err) {
                    res.send("Database error! " + err.message);
                }
                res.send("<script>alert('拒绝成功!');window.location.href='/admin';</script>");
            });
            conn.release();
        })
    },

    showPictures: function(req, res) {
        pool = connPool();
        pool.getConnection(function(err, conn) {
            if (err) {
                res.send("Get database link failed. The error is: " + err.message);
            }
            var passSql = "select * from photo join users on photo.user_id=users.id where photo.status=1 order by photo.photo_id desc";

            conn.query(passSql, function(err, passResult) {
                if (err) {
                    res.send("Database error!:" + err.message);
                    return;
                }
                res.render('gallery', {
                    pass: stripPath(passResult)
                });
            });

            conn.release();
        });
    }
}