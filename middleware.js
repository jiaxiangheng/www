//检查用户必须登录，只有登录后才能继续访问，未登录不能继续访问
exports.checkLogin=function(req,res,next){
    if(req.session.user){ //如果登录
        next();
    }else {
        req.flash('error','您尚未登录，请登录后再访问此页面');
        res.redirect('/user/signin');
    }
};

//要求用户未登录才能访问
exports.checkNotLogin=function(req,res,next){
    if(req.session.user){
        req.flash('error','您已经登录，请不要进行重复操作');
        res.redirect('/')
    }else{
        next();
    }
};