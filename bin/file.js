const fs = require('fs');
const path = require('path');

// const statFile = require('./utils').statFile;
// statFile('input.js', 'r').then(res => {
//   console.log(res.isFile()) // 是否是文件文件
//   console.log(res.isDirectory()) // 目录
//   console.log(res.isSymbolicLink()) // 符号链接
//   console.log(res.size) // 文件大小 字节
// })

// 绝对路径
const folderPath = '/notes/node/koa-mongodb/bin';

// fs.existsSync(folderPath); // 检查是否有文件夹
// fs.mkdirSync(folderPath); // 新建文件夹
// fs.readdirSync(folderPath); // 查看文件夹内容
// fs.lstatSync(fileName)； // stats数组对象
// fs.rename(oldPath, newPath, [callback(err)]) // 重命名文件夹
// fs.rmdir()或fs.rmdirSync()删除文件夹
// const fse = require('fs-extra')
// fse.remove(path, err => err)

// fse.remove(folder)
//   .then(() => {
//     //done
//   })
//   .catch(err => {
//     console.error(err)
//   })