let express=require('express');
let path=require('path');
let bodyParser = require('body-parser');
let session=require('express-session');
let MongoStore=require('connect-mongo')(session);  //把会话的数据保存到数据库中
let app=express();
let config=require('./config');  //引入数据库地址配置文件
let flash=require('connect-flash');  //消息提示模块  依靠会话 一次销毁


//设置模板引擎
app.set('view engine','html');  //设置模板文件类型为HTML
app.set('views', path.resolve('views')); //设置模板存放目录
app.engine('html',require('ejs').__express);  //如果模板后缀是HTML的话，使用ejs模板引擎的方法进行渲染

//设置中间件
app.use(express.static(path.resolve('node_modules')));  //设置静态文件中间件
app.use(express.static(path.resolve('public')));   //第二个静态文件中间件
app.use(express.static(path.resolve('views/resume')));   //设置简历静态文件中间件
app.use(bodyParser.urlencoded({extended:true}));  //使用bodyParser中间件
app.use(session({  //设置会话中间件
    secret:'zfpx',
    resave:true,  //每次都重新保存
    saveUninitialized:true,   //保存未初始化的session
    store:new MongoStore({   //session数据默认保存在服务器端内存里
        url:config.dbUrl
    })
}));
app.use(flash());  //消息提示中间件，使用此中间件会添加 req.flash  方法
app.use(function(req,res,next){   //设置全局变量，会话保存
    res.locals.success=req.flash('success').toString();
    res.locals.error=req.flash('error').toString();
    res.locals.user=req.session.user;
    res.locals.keyword='';
    next();
});


//设置路由
let index=require('./routes/index');   //返回一个路由中间件
let user = require('./routes/user');
let article = require('./routes/article');
let category = require('./routes/category');
let resume=require('./routes/resume');
let comment=require('./routes/comment');
let middleware=require('./middleware');

app.use('/',index);  //如果客户端请求的路径是以 / 开头的话，才会交由index路由中间件来处理
app.use('/user',user);
app.use('/article',article);
app.use('/category',middleware.checkLogin,category);
app.use('/comment',middleware.checkLogin,comment);
app.use('/resume',resume);
app.use(function(req,res,next){
    res.render('404',{title:'您的页面走丢了'})
});

app.listen(81);