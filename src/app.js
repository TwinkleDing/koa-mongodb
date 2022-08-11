const Koa = require('koa');
const KoaStatic = require('koa-static');
const json = require('koa-json');
const onerror = require('koa-onerror');
const koaBody = require('koa-body');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('koa2-cors');
const http = require('http');
const chalk = require('chalk');
const debug = require('debug')('demo:server');
const path = require('path');
const {
  check_token
} = require('./utils/token');
const app = new Koa();

const {
  normalizePort,
  onError,
  getIpAddress,
} = require('./utils/app.js');

// 错误处理
onerror(app);

// /** 添加中间件 */
// // 添加post请求处理
// app.use(bodyparser({
//   enableTypes: ['json', 'form', 'text']
// }))
app.use(koaBody({
  multipart: true,
  formidable: {
    //上传文件存储目录
    uploadDir: path.join(__dirname, `../public/images`),
    //允许保留后缀名
    keepExtensions: true,
    multipart: true,
  }
}))
app.use(json()) // 添加json处理
app.use(logger()) // 添加日志
app.use(KoaStatic(path.join(__dirname, '../public')), {
  index: false, // 默认为true 访问的文件为index.html 可以修改为别的文件名或者false
  hidden: false, // 是否同意传输隐藏文件
  defer: true, // 如果为true，则在返回next()之后进行服务，从而允许后续中间件先进行响应
}) // 添加静态资源处理
app.use(cors()) // 添加cors跨域访问
app.use(check_token); // 添加token 验证中间件

// 访问日志
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(chalk.green(`${ctx.method} ${ctx.url} - ${ms}ms`))
})

/** 添加url路由 */
const index = require('./routes/index');
app.use(index.routes(), index.allowedMethods());

// 错误提示
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

/**服务器 */
// 设置端口号
process.env.PORT = process.env.PORT || "3333"
const port = normalizePort(process.env.PORT);
const server = http.createServer(app.callback());

function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string' ?
    'pipe ' + addr :
    'port ' + addr.port;
  debug('Listening on ' + bind);
}

// 监听端口号
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
const url = `http://${getIpAddress()}:${port}`;

console.log(chalk.yellowBright.bgBlue('启动地址：') + '  ' + url);

module.exports = app;