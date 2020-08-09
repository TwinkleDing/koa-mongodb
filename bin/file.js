// const statFile = require('./utils').statFile;

// statFile('input.js', 'r').then(res => {
//   console.log(res.isFile()) // 文件
//   console.log(res.isDirectory()) // 目录
//   console.log(res.isSymbolicLink()) // 符号链接
//   console.log(res.size) // 文件大小 字节
// })


const fs = require('fs');
const path = require('path')
// 绝对路径
const folderPath = '/notes/node/koa-mongodb/bin';

// try {
//   if(!fs.existsSync(folderPath)) { // 检查是否有文件夹
//     fs.mkdirSync(folderPath); // 新建文件夹
//   }else {
//     console.log('has driectory!');
//   }
// } catch(error) {
//   console.log(error);
// }

// console.log(fs.readdirSync(folderPath)) // 文件夹内容

// 获取完成路径
// fs.readdirSync(folderPath).map(fileName => {
//   console.log(path.join(folderPath, fileName));
//   return path.join(folderPath, fileName);
// })

// 排除文件夹
// const isFile = fileName => {
//   return fs.lstatSync(fileName).isFile()
// }
// fs.readdirSync(folderPath).map(fileName => {
//   return path.join(folderPath, fileName)
// })
// .filter(isFile)

// 重命名文件夹
// fs.rename('/Users/joe', '/Users/roger', err => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   //done
// })

// 删除文件夹 使用fs.rmdir()或fs.rmdirSync()删除文件夹。
// const fse = require('fs-extra')
// const folder = '/Users/joe'
// fse.remove(folder, err => {
//   console.error(err)
// })

// fse.remove(folder)
//   .then(() => {
//     //done
//   })
//   .catch(err => {
//     console.error(err)
//   })