// //用户
// var mongodb = require('./db'); 

// function User(user) {   
//     this.name = user.name;   
//     this.password = user.password; 
// }; 
// module.exports = User; 

// // 对象实例方法，用于将用户的数据保存到数据库中 
// User.prototype.save = function save(callback) {   
//     // 存入 Mongodb 的文档   
//     var user = {     
//         name: this.name,     
//         password: this.password,   
//     };   
//     mongodb.open(function(err, db) {     
//         if (err) {       
//             return callback(err);     
//         }     
//         // 读取 users 集合    
//          db.collection('users', function(err, collection) {       
//              if (err) {        
//                 mongodb.close();         
//                 return callback(err);       
//             }       
//             // 为 name 属性添加索引       
//             collection.ensureIndex('name', {unique: true});       
//             // 写入 user 文档       
//             collection.insert(user, {safe: true}, function(err, user) {         
//                 mongodb.close();         
//                 callback(err, user);       
//             });     
//         }); 
//   }); 
// }; 
// // 对象构造函数方法，用于从数据库中查找指定的用户
// User.get = function get(username, callback) {   
//     mongodb.open(function(err, db) {     
//         if (err) {       
//             return callback(err);     
//         }     
//         // 读取 users 集合     
//         db.collection('users', function(err, collection) {       
//             if (err) {         
//                 mongodb.close();         
//                 return callback(err);       
//             }       
//             // 查找 name 属性为 username 的文档       
//             collection.findOne({name: username}, function(err, doc) {         
//                 mongodb.close();         
//                 if (doc) {           
//                     // 封装文档为 User 对象           
//                     var user = new User(doc);           
//                     callback(err, user);         
//                 } else {           
//                     callback(err, null);         
//                 }       
//             });     
//         });   
//     }); 
// }; 


//user.js

MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/microblog';
function User(user) {
    this.name = user.name;
    this.password = user.password;
};
module.exports = User;
// 对象实例方法，用于将用户的数据保存到数据库中 
User.prototype.save = function save(callback) {
    var user = {
        name: this.name,
        password: this.password,
    };
    MongoClient.connect(url, function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('users', function (err, collection) {
            if (err) {
                db.close();
                return callback(err);
            }
            collection.ensureIndex('name', { unique: true });
            collection.insert(user, { safe: true }, function (err, user) {
                db.close();
                callback(err, user);
            });
        });
    });
};
// 对象构造函数方法，用于从数据库中查找指定的用户
User.get = function get(username, callback) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            return callback(err);
        }
        // 读取 users 集合
        db.collection('users', function (err, collection) {
            if (err) {
                db.close();
                return callback(err);
            }
            // 查找 name 属性为 username 的文档
            collection.findOne({ name: username }, function (err, doc) {
                db.close();
                if (doc) {
                    // 封装文档为 User 对象
                    var user = new User(doc);
                    callback(err, user);
                } else {
                    callback(err, null);
                }
            });
        });
    });
};
