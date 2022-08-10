const path = require('path');
const router = require('koa-router')();
const controller = require('../controller');
const fs = require('../utils/file');

router.get('/', async (ctx, next) => {
    ctx.body = "hello world!";
  })
  /** 增删改查接口 BEGIN */

  // 用户注册
  .post("/api/user/register", controller.user.register)
  // 用户登录
  .post("/api/user/login", controller.user.login)
  // 更新用户
  .post("/api/user/update", controller.user.update)
  // 根据用户_id查询用户
  .get('/api/user', controller.user.query)
  // 查询用户列表
  .get('/api/userList', controller.user.getUser)
  // 验证码获取
  .get('/api/other/checkcode', controller.other.checkcode)
  // 添加留言
  .post("/api/leave", controller.leave.addLeaver)
  // 留言获取
  .get("/api/leave", controller.leave.getLeaves)
  // 删除留言
  .delete("/api/leave", controller.leave.deleteLeaver)

  .post('/api/upload', controller.img.upload)
  .get('/api/upload', controller.img.getFile)

/** 增删改查接口 FINISH */

/** 文件操作接口 begin */

router.get('/api/file/list', (ctx, next) => {
    ctx.body = fs.getDir(ctx.query.dirName)
  })
  .get('/api/file/path', (ctx, next) => {
    ctx.body = path.resolve(ctx.query.dirName)
  })
  .post('/api/file/stat', (ctx, next) => {
    let content = fs.statFile(ctx.request.body.file, 'sync')
    ctx.body = content;
  })
  .post('/api/file/info', (ctx, next) => {
    let content = fs.readFile(ctx.request.body.file, 'sync')
    ctx.body = content;
  })
  .post('/api/file/add', (ctx, next) => {
    let file = ctx.request.body.file;
    let data = ctx.request.body.content;
    let content = fs.writeFile(file, data);
    ctx.body = content;
  })
  .post('/api/file/del', (ctx, next) => {
    let content = fs.delFile(ctx.request.body.file, 'sync')
    ctx.body = content;
  })
  .post('/api/file/mkdir', (ctx, next) => {
    let content = fs.mkDir(ctx.request.body.dir, 'sync')
    ctx.body = content;
  })
  .post('/api/file/rmdir', (ctx, next) => {
    let content = fs.rmlDir(ctx.request.body.dir, 'sync')
    ctx.body = content;
  })

/** 文件操作接口 FINISH */

module.exports = router;