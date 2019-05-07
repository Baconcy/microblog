// var createError = require('http-errors');
// var express = require('express');  //用npm已经安装到本地了，可直接用require获取
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// var bodyParser = require("body-parser");
// var session = require('express-session');
// var mongoStore = require('connect-mongo')(session);
// var flash = require('connect-flash');
// var dbUrl = 'mongodb://localhost/express';

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// // 模板文件
// var partials = require('express-partials');
// //数据库
// var MongoStore = require('connect-mongo');
// var settings = require('./settings');
// var util = require('util');

// var app = express();

// // app.configure(function(){   
// //   app.set('views', __dirname + '/views');   
// //   app.set('view engine', 'ejs');   
// //   app.use(express.bodyParser());   
// //   app.use(express.methodOverride());   
// //   app.use(express.cookieParser());   //cookie解析中间件
// //   app.use(express.session({     //express.session() 则提供会话支持，设置它的 store 参数为 MongoStore 实例，把会话信息存储到数据库中，以避免丢失。 
// //     secret: settings.cookieSecret,     
// //     store: new MongoStore({       
// //       db: settings.db     
// //     })   
// //   }));   
// //   app.use(app.router);   
// //   app.use(express.static(__dirname + '/public')); 
// // });

// // view engine setup
// // 设置模板引擎(ejs)和页面模板的位置
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// app.use(partials());

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public'))); //将图片、css、js文件放在public目录下

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// //bacon添加
// // app.use(express.bodyParser()); 
// // 安装npm install body-parser,然后在app.js中加载body-parser模块var bodyParser = require('body-parser')，
// // 把app.use(express.bodyParser())替换成app.use(bodyParser.urlencoded({ extended: false }))，
// // 这样调试就没问题了。
// // app.use(require('body-parser').urlencoded({extended: true}));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


// // app.use(express.methodOverride());  
// // app.use(express.session({
// //     resave: false, //添加 resave 选项
// //     saveUninitialized: true, //添加 saveUninitialized 选项    
// //     secret: settings.cookieSecret,
// //     store: new MongoStore({
// //       db: settings.db
// //     })
// // }));
// // app.use(session({
// //   secret:'express',
// //   store: new mongoStore({
// //     url: dbUrl,
// //     collection: 'sessions'
// //   })
// // }));
// // app.use(session({
// //   resave: false, //添加 resave 选项
// //   saveUninitialized: true, //添加 saveUninitialized 选项
// //   secret: 'aF,.j)wBhq+E9n#aHHZ91Ba!VaoMfC', // 建议使用 128 个字符的随机字符串
// //   cookie: { maxAge: 60 * 1000 }
// // }));
// app.use(cookieParser('session')); app.use(session({
//   secret: 'session',//与cookieParser中的一致 
//   resave: true,
//   saveUninitialized: true
// }));

// // app.use(session({
// //   secret:settings.cookieSecret,            //用来防止篡改cookie
// //   key:settings.db,                        //cookie的名字
// //   cookie:{maxAge:1000*60*60*24*30},       //30天
// //   store: new MongoStore({
// //     db:settings.db,
// //     host:settings.host,
// //     port:settings.port,
// //     url: 'mongodb://localhost/blog'
// //   }),
// //   resave:true,
// //   saveUninitialized:false
// // }));

// //flash
// app.use(flash());
// // 设置flash
// app.use(function (req, res, next) {
//   res.locals.error = req.flash('error') || "";
//   res.locals.success = req.flash('success') || "";
//   next();
// });

// app.use(function (req, res, next) {
//   res.locals.user = req.session.user;
//   var err = req.flash('error');
//   var success = req.flash('success');
//   res.locals.error = err.length ? err : null;
//   res.locals.success = success.length ? success : null;
//   next();
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// app.listen(app.get('post'), function () {
//   console.log("Express server listening on port: " + 3000);
// });

// module.exports = app;




//app.js

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var settings = require('./settings');
var routes = require('./routes/index');
var users = require('./routes/users');
var flash = require('connect-flash');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var cluster = require('cluster'); 
var os = require('os');

var app = express();

// app.use(express.logger({stream: accessLogfile})); 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var partials = require('express-partials');
app.use(partials());
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(session({
//   secret: settings.cookie_secret,
//   store: newMongoStore({
//     db: settings.db,
//   })
// }));
app.use(logger('dev'));
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: settings.cookieSecret,
  name: 'testapp',
  cookie: { maxAge: 80000 },
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    host: 'localhost',
    port: 27017,
    db: settings.db,
    url: 'mongodb://localhost/microblog'
  })
}));

// var sessionStore = new MongoStore({
//   db: settings.db
// }, function () {
//   console.log('connect mongodb success...');
// });
// mongoose.connect('mongodb://localhost/blog')     //连接本地数据库blog 
// var db = mongoose.connection;
// // 连接成功
// db.on('open', function(){
//     console.log('MongoDB Connection Successed');
// });
// // 连接失败
// db.on('error', function(){
//     console.log('MongoDB Connection Error');
// });

app.use(function (req, res, next) {
  console.log("app.usr local");
  res.locals.user = req.session.user;
  res.locals.post = req.session.post;
  var error = req.flash('error');
  res.locals.error = error.length ? error : null;
  var success = req.flash('success');
  res.locals.success = success.length ? success : null;
  next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/post', routes);
app.use('/reg', routes);
app.use('/login', routes);
app.use('/logout', routes);
app.use('/u/:users', routes);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
//访问日志中间件，只需指定stream 参数为一个输出流即可将访问日 志写入文件
// var fs = require('fs');
// var accessLogfile = fs.createWriteStream('access.log', { flags: 'a' });
// var errorLogfile = fs.createWriteStream('error.log', { flags: 'a' });
// // app.use(logger({stream: accessLogfile})); 
// app.use(logger('short', { stream: accessLogStream }));
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
var errorLogfile = fs.createWriteStream(path.join(__dirname, 'error.log'), { flags: 'a' });
app.use(logger('short', { stream: accessLogStream }));
app.use(function (req, res, next) {
  res.send('ok');
});

// 错误日志处理
// error handler 
app.use(function (err, req, res, next) {
  var now = new Date();
  var time = now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate() + ' '
    + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
  var meta = '[' + time + '] ' + req.method + ' ' + req.url + '\r\n';
  errorLogfile.write(meta + err.stack + '\r\n\r\n\r\n');
  next();
  // set locals, only providing error in development 
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page 
  res.status(err.status || 500); res.render('error');
});

// app.configure('production', function () { 
//   app.error(function (err, req, res, next) { 
//     var meta = '[' + new Date() + '] ' + req.url + '\n'; 
//     errorLogfile.write(meta + err.stack + '\n'); 
//     next(); 
//   }); 
// });

// cluster
// 获取CPU 的数量 
// var numCPUs = os.cpus().length; 
// var workers = {}; if (cluster.isMaster) { 
//   // 主进程分支 
//   cluster.on('death', function (worker) { 
//     // 当一个工作进程结束时，重启工作进程 
//     delete workers[worker.pid]; 
//     worker = cluster.fork(); 
//     workers[worker.pid] = worker; 
//   }); 
//   // 初始开启与CPU 数量相同的工作进程 
//   for (var i = 0; i < numCPUs; i++) { 
//     var worker = cluster.fork(); 
//     workers[worker.pid] = worker; 
//   } 
// } else { 
//   // 工作进程分支，启动服务器 
//   var app = require('./app'); 
//   // app.listen(3000); 
// } 
// // 当主进程被终止时，关闭所有工作进程 
// process.on('SIGTERM', function () { 
//   for (var pid in workers) { 
//     process.kill(pid); 
//   } 
//   process.exit(0); 
// });

// if (!module.parent) { 
//   // app.listen(3000); 
//   app.listen(app.get('post'), function () {
//   console.log("Express server listening on port: " + 3000);
// });
//   console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env); 
// } 
app.listen(app.get('post'), function () {
  console.log("Express server listening on port: " + 3000);
});

module.exports = app;