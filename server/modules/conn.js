var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;
var ObjectId = mongodb.ObjectID;

//链接到数据库
var url = "mongodb://localhost:27017/";

module.exports = function (callback) {
    //操作数据库的代码
    MongoClient.connect(url, function (err, database) {
        callback(database, ObjectId);

        //关闭数据库
        database.close();	
    });
}

//开启mongodb服务
//cmd命令框里面输入  mongod --dbpath  路径