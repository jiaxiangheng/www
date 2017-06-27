## 创建项目
```
mkdir nodejsblog
cd nodejsblog
npm init -y
```
## 安装依赖的模块
```
npm install express ejs body-parser debug express-session connect-mongo mongoose connect-flash multer bootstrap -S
```

## 配置路由
```
/ 首页
/user/signup  用户注册
/user/signin  登录
/user/signout 退出登录
/article/add 发表文章
/category/add 增加分类
```

## 实现用户注册

## 实现用户登录

## 实现上传头像的功能
1. 增加一个type=file的上传字段
2. 给form增加一个 enctype="multipart/form-data"
3. 在后台增加一个处理上传文件的中间件 `multer`
```
let multer = require('multer');
let upload = multer({dest:'./public/uploads'});
```
4. 在路由中使用此中间件
```
router.post('/signup',upload.single('avatar'),function(req,res)
```
5. 给用户添加avatar属性
```
  user.avatar = `/uploads/${req.file.filename}`;
```
6. 给UserSchema增加一个属性叫 avatar

7. 添加静态文件中间件
```
app.use(express.static(path.resolve('public')));
```
##开发计划

###2017.6 v1.0发布

- 支持注册、登录、上传头像、发表博文、管理删除文章、评价回复

主要应用技术
`node.js+express`处理后台业务逻辑
`ejs+bootstrap`数据绑定和页面渲染
`mongodb`数据存储和修改删除

###v2.0 开发计划

- 实现注册用户之间通信，
- 基于WebSocket实现实时聊天，
- 并增设管理员账号，可对所有用户及其文章进行管理操作