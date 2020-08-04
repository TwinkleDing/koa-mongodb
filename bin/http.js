// // 搭建HTTP服务器
// const http = require('http')

// const port = process.env.PORT
// console.log(process.env)
// const server = http.createServer((req, res) => {
//   res.statusCode = 200
//   res.setHeader('Content-Type', 'text/html')
//   res.end('<h1>Hello, World!</h1>')
// })

// server.listen(port, () => {
//   console.log(`Server running at port ${port}`)
// })



// 使用Node.js发送请求

/* 发送get请求 */
// AppKey：db770397961dcef1b61daa5b61538815
const https = require('https')
const fs = require("fs")
const options = {
  hostname: 'v.juhe.cn',
  path: '/toutiao/index?type=top&key=db770397961dcef1b61daa5b61538815',
  method: 'GET',
}
const req = https.request(options, res => {
    let a = 0
    res.on('data', d => {
    a++
    console.log(a)
    // process.stdout.write(d)
    // fs.writeFile('input.js', d,  function(err) {
    //   if (err) {
    //       return console.error(err);
    //   }
    //   console.log("数据写入成功！");
    //   console.log("--------我是分割线-------------")
    //   console.log("读取写入的数据！");
    //   fs.readFile('input.js', function (err, data) {
    //      if (err) {
    //         return console.error(err);
    //      }
    //      console.log("异步读取文件数据: " + data.toString());
    //   });
    // });
  })
})
req.on('error', error => {
  console.error(error)
})
req.end()


/* 发送post请求 */
// const https = require('https')
// const data = JSON.stringify({
//   todo: 'Buy the milk'
// })
// const options = {
//   hostname: 'whatever.com',
//   port: 443,
//   path: '/todos',
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Content-Length': data.length
//   }
// }

// const req = https.request(options, res => {
//   console.log(`statusCode: ${res.statusCode}`)
//   res.on('data', d => {
//     process.stdout.write(d)
//   })
// })

// req.on('error', error => {
//   console.error(error)
// })

// req.write(data)
// req.end()


/* 发送post请求 */
// const axios = require('axios')
// axios
//   .post('https://whatever.com/todos', {
//     todo: 'Buy the milk'
//   })
//   .then(res => {
//     console.log(`statusCode: ${res.statusCode}`)
//     console.log(res)
//   })
//   .catch(error => {
//     console.error(error)
//   })