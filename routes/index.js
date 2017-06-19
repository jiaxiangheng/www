let express = require('express');
let router=express.Router();   //返回router的一个实例
let Article=require('../model').Article;

router.get('/',function(req,res){
    let {keyword,pageNum,pageSize}=req.query;
    pageNum=isNaN(pageNum)?1:parseInt(pageNum);
    pageSize=isNaN(pageSize)?10:parseInt(pageSize);
    let query={};
    if(keyword){
        // query.title=new RegExp(keyword);
        //搜索标题或者内容包含关键字
        let reg=new RegExp(keyword);
        query['$or']=[{title:reg},{content:reg}]
    }
    Article.count(query,function(err,count){
        Article.find(query).sort({createAt:-1}).skip((pageNum-1)*pageSize).limit(pageSize).populate('user').exec(function(err,articles){
                res.render('index',{
                    title:'珠峰博客首页',
                    totalPages:Math.ceil(count/pageSize),
                    pageNum,
                    pageSize,
                    keyword,
                    articles
                })
        })
    })
});

module.exports=router;