const app = require('../src/app');
const debug = require('debug')('demo:server');
const http = require('http');

// 设置端口号3333
const port = normalizePort( process.env.PORT || "3333");
const server = http.createServer(app.callback());

// 监听端口号
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val){
  let port = parseInt(val,10);
  if(isNaN(port)) return port;
  if(port >= 0) return port;
  return false;
}

function onError(error){
  if( error.syscall !== 'listen') throw error;

  let bind = typeof port == 'string'?'Pipe ' + port: 'port ' + port;
  
  switch(error.code){
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}