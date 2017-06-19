let express = require('express');
let router=express.Router();

router.get('/jxh',function(req,res){
    res.render('resume/jxh/index',{title:'贾向恒简历'})
});

module.exports=router;