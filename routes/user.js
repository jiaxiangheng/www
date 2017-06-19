let express=require('express');
let router=express.Router();
let User=require('../model').User;
let utils=require('../utils');
let multer=require('multer');
let upload=multer({dest:'./public/uploads'});  //在node服务器中，文件路径是相对于启动的server文件
let middleware=require('../middleware');

router.get('/signup',middleware.checkNotLogin,function(req,res){   //如果客户端访问的是 /user/signup 路径的时候，会交由此路由来进行处理
    res.render('user/signup',{title:'用户注册'})
});

//用户注册                   upload.single('avatar')返回一个中间件函数
router.post('/signup',middleware.checkNotLogin,upload.single('avatar'),function(req,res){
    //1.得到客户端提交过来的请求体
    let user=req.body;
    let avatar=req.file;
    user.avatar=`/uploads/${req.file.filename}`;
    user.password=utils.encry(user.password);
    //2. 先查询用户名是否已存在
    User.findOne({username:user.username},function(err,oldUser){
        if(err){
            res.redirect('back');
        }else{
            if(oldUser){
                req.flash('error','此用户名已经被占用！');
                res.redirect('back');
            }else{
                User.create(user,function(err,doc){
                    if(err){
                        //如果error有值，就表示注册失败，返回注册页面继续填写
                        res.redirect('back');
                    }else{
                        req.flash('success','注册成功请登录！');
                        res.redirect('/user/signin');
                    }
                });
            }
        }
    });
});

//用户登录
router.get('/signin',middleware.checkNotLogin,function(req,res){
    res.render('user/signin',{title:'用户登录'})
});

router.post('/signin',middleware.checkNotLogin,function(req,res){
    let user=req.body;
    user.password=utils.encry(user.password);
    User.findOne(user,function(err,doc){
        if(err){
            res.redirect('back')
        }else {
            if(doc){
                req.flash('success','登录成功');
                // req.session.success='登录成功';
                req.session.user=doc;  //把当前登录成功后的用户对象放置到session对象中
                res.redirect('/')
            }else{
                req.flash('error','登录失败');
                // req.session.error='登录失败';
                res.redirect('back')
            }
        }
    })
});

router.get('/signout',middleware.checkLogin,function(req,res){
    req.session.user=null;
    res.redirect('/user/signin');
});


module.exports=router;