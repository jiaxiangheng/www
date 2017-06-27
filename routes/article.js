let express = require('express');
let router=express.Router();   //返回router的一个实例
let Article=require('../model').Article;
let Category=require('../model').Category;
let Comment=require('../model').Comment;
let middleware=require('../middleware');

router.get('/add',middleware.checkLogin,function(req,res){
    Category.find({},function(err,categories){
        if(err){
            res.redirect('back');
        }else{
            res.render('article/add',{title:'发表文章',categories,article:{}})
        }
    });
});

router.post('/add',middleware.checkLogin,function(req,res){
    let article=req.body;
    article.user=req.session.user._id;
    Article.create(article,function(err,doc){
        if(err){
            res.redirect('back');
        }else{
            res.redirect('/');
        }
    })
});

router.get('/detail/:_id',function(req,res){
    Article.update({_id:req.params._id},{$inc:{pageView:1}},function(err,result){
        Article.findById(req.params._id)
            .populate('user')   //把用户id转成用户对象
            .populate('category')  //把分类id转成分类对象
            .exec(function (err, article) {
                Comment.find({article:req.params._id}).sort({createAt:-1}).populate('user').exec((err,comments)=>{
                    let idPidArr={};
                    let commentArr={};
                    comments.forEach(function(comment){
                        commentArr[comment._id]=comment;
                        if(comment.commentId===undefined){
                            idPidArr[comment._id]=0;
                        }else{
                            idPidArr[comment._id]=comment.commentId;
                        }
                    });
                    // console.log(comments);
                    res.render('article/detail',{title:'文章详情',article,comments,idPidArr,commentArr});
                });
        })
    });
});

router.get('/update/:_id',function(req,res){
    Article.findById(req.params._id).exec(function(err,article){
        if(err){
            res.redirect('back');
        }else{
            Category.find({},function(err,categories){
                if(err){
                    res.redirect('back');
                }else{
                    res.render('article/add',{title:'修改文章',article,categories})
                }
            });
        }
    })
});

router.post('/update/:_id',function(req,res){
    let _id=req.params._id;
    let article=req.body;
    Article.update({_id},article,function(err,result){
        if(err){
            res.redirect('back')
        }else{
            res.redirect(`/article/detail/${_id}`)
        }
    })
});

router.get('/delete/:_id',middleware.checkLogin,function(req,res){
    Article.remove({_id:req.params._id},function(err,doc){
        if(err){
            res.redirect('back');
        }else{
            res.redirect('/');
        }
    })
});

module.exports=router;