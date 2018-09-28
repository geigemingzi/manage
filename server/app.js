const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
//跨域请求
app.all('*', function (req, res, next) {
    res.setHeader("Content-Type", "text/html;charset=utf-8");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8080");

    next();
})
// 引入模块
// const con = require('./modules/dbhelper.js');
// const con = require('./modules/mongondb.js');
const con = require('./modules/conn.js');
// 后端的路由
// 用户登录
app.get('/login', function(req, res){
    var strname = req.query.username;
    var strpass = req.query.password;
    // var strname = "22";
    // var strpass = "22";
    con(function(database){
        var db = database.db('management');
        // 查询
        var where = {
            username: strname,
            password: strpass
        };

        db.collection('users').find(where).toArray(function(err,result){
            if(result.length == 0){
                res.end('登录失败');
            }else{
                // 返回用户信息
                res.end(JSON.stringify(result[0]));
            }
        });
    });
});
// 查找数据
app.get('/goods', function(req, res){
    con(function(database){
        var db = database.db('management');
        db.collection('goods').find().toArray(function(err,result){
            if (result.length == 0) {
                res.end('获取失败');
            } else {
                // 返回用户信息
                res.send(result)
                // res.end(JSON.stringify(result[0]));
            }
        })
    })
})

// 数据插入
app.get('/insert',function(req, res){
    // 获取数据
    var _id = req.query.id;
    var _category = req.query.category;
    var _imgurl = req.query.imgurl;
    var _price = req.query.price;
    var _oldprice = req.query.oldprice;
    var _name = req.query.name;

    con(function (database) {
        var db = database.db('management');

        // 插入的数据
        var content = {
            id: _id,
            category: _category,
            imgurl: _imgurl,
            price: _price,
            oldprice: _oldprice,
            name: _name
        }
        db.collection('goods').insertOne(content, function(err,result){
            if(err){
                res.send('添加数据失败')
            }else{
                res.send('添加数据成功')
            }
        })
    })
})

// 修改数据
app.get('/updata', function(req, res){
    // 数据
    var _id = req.query.id;
    var _category = req.query.category;
    var _imgurl = req.query.imgurl;
    var _price = req.query.price;
    var _oldprice = req.query.oldprice;
    var _name = req.query.name;
    con(function(database){
        var db = database.db('management');
        // 条件对应的ID数据
        var oldwhere = {id:_id}
        // 更改的内容
        var upwhere = {$set:{
            id: _id,
            category: _category,
            imgurl: _imgurl,
            price: _price,
            oldprice: _oldprice,
            name: _name
        }}
        // 修改
        db.collection('goods').updata(oldwhere, upwhere, function(err, result){
            if(err){
                res.end('修改失败')
            }else{
                res.send('修改成功')
            }
        })
    })
})

app.get('/delete', function(req, res){
    var _id = req.query.id;
    con(function(database){
        var db = database.db('management');
        // 条件
        var where = {id : _id};
        db.collection('goods').deleteOne(where, function(err, result){
            if(err){
                res.end('删除失败')
            }else{
                res.end('删除成功')
            }
        })
    })
})

app.listen(6688)