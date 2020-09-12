const http = require('http');
const chalk = require('chalk');
const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const json = require('koa-json');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('koa2-cors');
require("colors");

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(cors())

router.get('/', (ctx, next) => {
  ctx.body = 'Hello World';
}).get('/123', (ctx, next) => {
  ctx.body = 'Hello World!';
});
app.use(router.routes())
// 设置端口号3333
const port ='3333';
const server = http.createServer(app.callback());

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`.green);
})
// 监听端口号
server.listen(port, () => {
  console.log(`server start: ${chalk.green(`http://localhost:${port}/`)}`)
});