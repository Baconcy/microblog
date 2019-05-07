// /*
//   index.js为路由文件，相当于控制器，在此文件中配置各个路由
// */
// var express = require('express');
// // var flash = require('connect-flash');
// var router = express.Router();
// //crypto 是 Node.js 的一个核心模块，功能是加密并生成各种散列
// var crypto = require('crypto');

// var User = require('../models/user.js');


// /* GET home page. */ //微博主页
// router.get('/', function (req, res, next) {
//   // res.render 的功能是调用模板引擎，并将其产生的页面直接返回给客户端
//   res.render('index', {  //指定要进行渲染的页面
//     title: 'Express 首页',
//   });
// });
// // router.get('/', function (req, res, next) {
// //   Post.get(null, function (err, posts) {
// //     if (err) {
// //       posts = [];
// //     }
// //     res.render('index', {
// //       title: '首頁',
// //       posts: posts,
// //     });
// //   });
// // });

// router.get('/test', function (req, res, next) {  // 创建路由
//   res.send('test路径已经存在');
// });

// //定义一个用户个人页面 路径规则 /user/:username 会被自动编译为正则表达式，类似于 \/user\/([^\/]+)\/?这样的形式。路径参数可以在响应函数中通过 req.params 的属性访问
// router.get('/user/:username', function (req, res, next) {  // 配置带参数的动态路由
//   res.send('user：' + req.params.username + ' bacon');     // req.params.参数名
// });

// router.get('/bacon_get', function (req, res, next) {  // 配置带参数的动态路由
//   var response = {
//     //json格式数据
//     'first_name': req.query.first_name,
//     'last_name': req.query.last_name
//   }
//   console.log(response);
//   res.end(JSON.stringify(response));
// });

// // 路由示例
// // router.get(path , callback) 
// // router.post(path , callback)
// // router.put(path , callback)
// // router.delete(path , callback)

// // router.all('/test', function (req, res, next) {
// //   console.log('执行 all 请求方法的函数')
// //   next();       // 两个函数执行方法冲突，默认执行第一个。使用next()  则跳过该函数，执行下一个回调函数，即get
// // })

// // router.get('/test', function (req, res, next) {
// //   res.end('执行 get 请求方法的函数')
// // })

// // 微博页面 
// // 用户页面
// router.get('/u/:user', function (req, res, next) {
//   res.send('user路径已经存在');
// });
// // 发表文章
// router.post('/post', function (req, res, next) {
//   res.render('post', {
//     title: '发表文章',
//   });
// });
// // 用户注册页面
// router.get('/reg', function (req, res, next) {
//   res.render('reg', {
//     title: '用户注册',
//   })
// });

// router.post('/reg', function (req, res, next) {   //检验用户两次输入的口令是否一致   
//   if (req.body['password-repeat'] != req.body['password']) {
//     req.flash('error', '两次输入的口令不一致');  //是 Express 提供的一个奇妙的工具，通过它保存的变量只会在用户当前 和下一次的请求中被访问，之后会被清除，
//     //通过它我们可以很方便地实现页面的通知 和错误信息显示功能
//     return res.redirect('/reg');
//   }
//   //生成口令的散列值   
//   var md5 = crypto.createHash('md5');
//   var password = md5.update(req.body.password).digest('base64');
//   var newUser = new User({
//     name: req.body.username,
//     password: password,
//   });
//   //检查用户名是否已经存在   
//   User.get(newUser.name, function (err, user) {
//     if (user)
//       err = 'Username already exists.';
//     if (err) {
//       req.flash('error', err);
//       return res.redirect('/reg');
//     }
//     //如果不存在则新增用户     
//     newUser.save(function (err) {
//       if (err) {
//         req.flash('error', err);
//         return res.redirect('/reg');
//       }
//       req.session.user = newUser;
//       req.flash('success', '注册成功');
//       res.redirect('/');
//     });
//   });
// });
// // 是否注册
// router.post('/doReg', function (req, res, next) {
//   res.send('doReg路径已经存在');
// });
// // 登录
// router.get('/login', function (req, res, next) {
//   res.render('login', {
//     title: '登录'
//   });
//   // res.send('login路径已经存在');
// });
// // 是否登录
// router.post('/doLogin', function (req, res, next) {
//   res.send('doLogin路径已经存在');
// });
// // 登出
// router.get('/logout', function (req, res, next) {
//   res.send('logout路径已经存在');
// });

// // exports.index = function (req, res) {
// //   res.render('index', { title: 'Express' });
// // };
// // exports.user = function (req, res) {
// // };
// // exports.post = function (req, res) {
// // };
// // exports.reg = function (req, res) {
// // };
// // exports.doReg = function (req, res) {
// // };
// // exports.login = function (req, res) {
// // };
// // exports.doLogin = function (req, res) {
// // };
// // exports.logout = function (req, res) {
// // };

// module.exports = router;


var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user.js');
var Post = require('../models/post.js');
// var User = require('../node_modules/user.js');
// var Post = require('../node_modules/post.js');
/* GET home page. */
router.get('/', function (req, res, next) {
  // throw new Error('An error for test purposes.'); 
  Post.get(null, function (err, posts) {
    if (err) {
      posts = [];
    }
    res.render('index', {
      title: '首頁',
      posts: posts,
    });
  });
});
router.get('/reg', checkNotLogin); //检查用户名是否已经存在
router.get('/reg', function (req, res, next) {
  res.render('reg', { 
    title: '用户注册' 
  });
});
router.post('/reg', checkNotLogin);
router.post('/reg', function (req, res, next) {
  //检验用户两次输入的口令是否一致 
  if (req.body['password-repeat'] != req.body['password']) {
    req.flash('error', '两次输入的口令不一致');
    return res.redirect('/reg');
  }
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');
  var newUser = new User({
    name: req.body.username,
    password: password,
  });
   //检查用户名是否已经存在 
  User.get(newUser.name, function (err, user) {
    if (user)
      err = 'Username already exists.';
    if (err) {
      req.flash('error', err);
      return res.redirect('/reg');
    }
    //如果不存在则新增用户 
    newUser.save(function (err) {
      if (err) {
        req.flash('error', err);
        return res.redirect('/reg');
      }
      req.session.user = newUser;
      req.flash('success', '注册成功');
      res.redirect('/');
    });
  });
});
router.get('/login', checkNotLogin);
router.get('/login', function (req, res) {
  res.render('login', { 
    title: '用户登入' 
  });
});
router.post('/login', checkNotLogin);
 //生成口令的散列值 
router.post('/login', function (req, res, next) {
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');
  User.get(req.body.username, function (err, user) {
    if (!user) {
      req.flash('error', '用户不存在');
      return res.redirect('/login');
    }
    if (user.password != password) {
      req.flash('error', '用户口令错误');
      return res.redirect('/login');
    }
    req.session.user = user;
    req.flash('success', '登入成功');
    res.redirect('/');
  });
});
router.get('/logout', checkLogin);
router.get('/logout', function (req, res, next) {
  req.session.user = null;  // 登入和登出仅仅是 req.session.user 变量的标记
  req.flash('success', '登出成功');
  res.redirect('/');
});
router.post('/post', checkLogin);
router.post('/post', function (req, res, next) {
  var currentUser = req.session.user;
  var post = new Post(currentUser.name, req.body.post);
  post.save(function (err) {
    if (err) {
      req.flash('error', err);
      return res.redirect('/');
    }
    req.flash('success', '发表成功');
    res.redirect('/u/' + currentUser.name);
  });
});
router.get('/u/:user', function (req, res, next) {
  User.get(req.params.user, function (err, user) {
    if (!user) {
      req.flash('error', '用户不存在');
      return res.redirect('/');
    }
    Post.get(user.name, function (err, posts) {
      if (err) {
        req.flash('error', err);
        return res.redirect('/');
      }
      res.render('user', {
        title: user.name,
        posts: posts,
      });
    });
  });
});

// 日志
// router.use(express.logger({stream: accessLogfile}))

function checkLogin(req, res, next) {
  if (!req.session.user) {
    req.flash('error', '未登入');
    return res.redirect('/login');
  }
  next();
}
function checkNotLogin(req, res, next) {
  if (req.session.user) {
    req.flash('error', '已登入');
    return res.redirect('/');
  }
  next();
}
module.exports = router;