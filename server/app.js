const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
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
// app.get('/login', function(req, res){
//     var strname = req.query.username;
//     var strpass = req.query.password;
//     // var strname = "22";
//     // var strpass = "22";
//     con(function(database){
//         var db = database.db('management');
//         // 查询
//         var where = {
//             username: strname,
//             password: strpass
//         };

//         db.collection('users').find(where).toArray(function(err,result){
//             if(result.length == 0){
//                 res.end('登录失败');
//             }else{
//                 // 返回用户信息
//                 res.end(JSON.stringify(result[0]));
//             }
//         });
//     });
// });
app.post('/login', function(req, res){
    // 获取post请求的参数
    var strname = req.body.username;
    var strpass = req.body.password;
    con(function(database){
        var db = database.db('management');
        // 查询
        var where = {
            username: strname,
            password: strpass
        };

        db.collection('users').find(where).toArray(function(err,result){
            if(err){
                res.send(err);
            }else{
                // 返回用户信息
                var connent = {
                   data: result,
                   success: true
                }
                res.send(connent);
            }
        });
    });
});
// 用户修改信息
app.post('/amend', function(req, res){
    // 获取前端传来的信息
    var data = req.body.data;
    con(function(database){
        var db = database.db('management');
        var where = {
            username: data.username
        }
        // 先查找原来的数据
        db.collection('users').find(where).toArray(function(err,result){
            // 返回的是查找到的对象 result = [{}]
            // var olddata = result[0];
            var olddata = { password: '123'}
            console.log(olddata)
            // var updata = {$set: data}
            var updata ={$set:{password: '321'}} 
            console.log(updata);
            // 修改数据
            db.collection('users').updateMany(olddata, updata, (err,result)=>{
                if(err){
                    res.send(err);
                    console.log(err)
                }else{
                    res.send(result);
                }
            })
        })
    })
})




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

// 分页
app.post('/paging', function(req, res){
    // 获取第几页
    var page = req.body.page;
    var count = 10;//查询个数
    var start = (page - 1)*count;
    con(function(database){
        var db = database.db('management');
        var where = {}
        //异步请求
        //分页
        var promise1 = new Promise(function(resolve){
            db.collection('goods').find(where).skip(start).limit(count).toArray((err, result) => {
                resolve(result);
                // res.end(JSON.stringify(result));
            })
        })
        //总页数
        var promise2 = new Promise(function(resolve){

            //回调函数只有一个参数
            db.collection('goods').find(where).count().then(result=>{
                // 返回 总页数
                resolve(Math.ceil(result/count))
            })
        })

        // 等待上面两个异步执行完成后 再执行
        Promise.all([promise1, promise2]).then(function(result){
            var data = {
                goodslist : result[0],
                maxpage : result[1]
            }
            res.send(data);
        })
    })

})



// 数据插入
app.post('/insert',function(req, res){
    // 获取数据
    var _goods = req.body.goods
    con(function (database) {
        var db = database.db('management');
        db.collection('goods').insertOne( _goods, function(err,result){
            if(err){
                res.send('添加数据失败')
            }else{
                res.send('添加数据成功')
            }
        })
    })
})

// 修改数据
app.post('/updata', function(req, res){
    // 数据
    var addgoods = req.body.addgoods;
    con(function(database){
        var db = database.db('management');
        // 对应商品的id
        var idwhere = {id: addgoods.id}
        // 条件对应的ID数据
        db.collection('goods').find(idwhere).toArray(function(err, result){
            var oldwhere = result[0]
            var upwhere = {$set:addgoods}
            // var oldwhere = {price: '69'};
            // var upwhere = {$ser:{price: '333'}}
            // 修改
            db.collection('goods').updateOne(oldwhere, upwhere, function(err, result){
                console.log(err);
            })
        })
    })
})
// 删除数据
app.post('/delete', function(req, res){
    var _id = req.body.id;
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