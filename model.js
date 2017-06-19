//1. 引入mongoose 模块
let mongoose=require('mongoose');
mongoose.Promise=Promise;  //用ES6自带的promise替代掉mongoose自带的promise库
let config=require('./config');
let ObjectId=mongoose.Schema.Types.ObjectId;
//2. 链接数据库
mongoose.connect(config.dbUrl);
//3. 定义Schema  定义文档属性名和属性的类型
let UserSchema=new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    avatar:String
});
//4. 定义模型
let User = mongoose.model('User',UserSchema);
exports.User=User;

//分类的模型
let CategorySchema=new mongoose.Schema({
    name:String
});
let Category=mongoose.model('Category',CategorySchema);
exports.Category=Category;

let ArticleSchema=new mongoose.Schema({
    title:String,
    content:String,
    category:{type:ObjectId,ref:'Category'},
    createAt:{type:Date,default:Date.now},
    pageView:{type:Number,default:0},  //浏览量
    user:{type:ObjectId,ref:'User'}  //成为一个外键，ref表示此外键引用的是User集合的主键
});

let Article=mongoose.model('Article',ArticleSchema);
exports.Article=Article;