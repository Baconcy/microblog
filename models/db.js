
var settings = require('../settings'); 
var Db = require('mongodb').Db; 
var Connection = require('mongodb').Connection; 
var Server = require('mongodb').Server; 
 
 // DEFAULT_PORT Connection.DEFAULT_PORT  修改默认端口
module.exports = new Db(settings.db, new Server(settings.host, 27017, {}), {safe:true});
// module.exports = new Db(settings.db, new Server(settings.host, Connection.DEFAULT_PORT, {}), {safe: true});