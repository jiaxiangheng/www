let express = require('express');
let router=express.Router();   //返回router的一个实例
let Category=require('../model').Category;
let middleware=require('../middleware');


//增加分类
router.get('/add',middleware.checkLogin,function(req,res){
    res.render('category/add',{title:'增加分类'})
});
router.post('/add',function(req,res){
    let category=req.body;
    Category.create(category,function(err,doc){
        if(err){
            res.redirect('back');
        }else{
            req.flash('success','分类添加成功！');
            res.redirect('/category/list');
        }
    });
});

//管理分类
router.get('/list',middleware.checkLogin,function(req,res){
    Category.find({},function(err,categories){
        res.render('category/list',{title:'分类管理',categories})
    });
});

router.get('/delete/:_id',middleware.checkLogin,function(req,res){
    Category.remove({_id:req.params._id},function(err,doc){
        if(err){
            res.redirect('back');
        }else{
            res.redirect('back');
        }
    });
});

module.exports=router;