//1. 引入mongoose 模块
let mongoose=require('mongoose');
mongoose.Promise=Promise;  //用ES6自带的promise替代掉mongoose自带的promise库
let config=require('./config');
let ObjectId=mongoose.Schema.Types.ObjectId;
//2. 链接数据库
mongoose.connect(config.dbUrl,{useMongoClient: true});
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

//文章模型
let ArticleSchema=new mongoose.Schema({
    title:String,
    content:String,
    category:{type:ObjectId,ref:'Category'},
    createAt:{type:Date,default:Date.now},
    pageView:{type:Number,default:0},  //浏览量
    commentCnt:{type:Number,default:0},
    user:{type:ObjectId,ref:'User'}  //成为一个外键，ref表示此外键引用的是User集合的主键
});

let Article=mongoose.model('Article',ArticleSchema);
exports.Article=Article;

//文章评论模型
let CommentSchema=new mongoose.Schema({
    content:String,
    article:{type:ObjectId,ref:'Article'},   //外键，获取评论的文章
    commentId:{type:ObjectId,ref:'Comment'},  // 回复评论id，默认为0表示评论的是文章
    createAt:{type:Date,default:Date.now},
    user:{type:ObjectId,ref:'User'}   //外键，获取当前评论或者回复的用户
});
let Comment=mongoose.model('Comment',CommentSchema);
exports.Comment=Comment;