const router = require('koa-router')();
const controller = require('../controller');

router.get('/', async (ctx, next) => {
  ctx.body = "hello world!";
})
// 用户注册
.post("/api/user", controller.user.register)
// 用户登录
.post("/api/user/login", controller.user.login)
// 根据用户_id查询用户
.get('/api/user',controller.user.query)
// 查询用户列表
.get('/api/userList',controller.user.getUser)
// 验证码获取
.get('/api/other/checkcode', controller.other.checkcode)
// 添加留言
.post("/api/leave", controller.leave.addLeaver)
// 留言获取
.get("/api/leave", controller.leave.getLeaves)
// 删除留言
.delete("/api/leave/:id", controller.leave.deleteLeaver)

.post('/api/upload', controller.img.upload)
.get('/api/upload', controller.img.getFile)

module.exports = router;
