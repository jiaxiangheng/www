let express=require('express');
let router=express.Router();
let Article=require('../model').Article;
let Comment=require('../model').Comment;

router.post('/add',(req,res)=>{
    let comment=req.body;
    comment.user=req.session.user._id;
    Comment.create(comment,(err,doc)=>{
        if(err){
            res.redirect('back')
        }else{
            Article.update({_id:comment.article},{$inc:{commentCnt:1}},(err,result)=>{
                res.redirect(`/article/detail/${comment.article}`)
            })
        }
    })
});

router.post('/reply',(req,res)=>{
    let comment=req.body;
    comment.user=req.session.user._id;
    Comment.create(comment,(err,doc)=>{
        if(err){
            res.redirect('back')
        }else{
            Article.update({_id:comment.article},{$inc:{commentCnt:1}},(err,result)=>{
                res.redirect(`/article/detail/${comment.article}`)
            })
        }
    })
});

module.exports=router;
