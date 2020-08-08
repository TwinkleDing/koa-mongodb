// const statFile = require('./utils').statFile;

// statFile('input.js', 'r').then(res => {
//   console.log(res.isFile()) // 文件
//   console.log(res.isDirectory()) // 目录
//   console.log(res.isSymbolicLink()) // 符号链接
//   console.log(res.size) // 文件大小 字节
// })

const path = require('path');
const notes = '/src/app.js';
console.log(path.dirname(notes)); // 路径
console.log(path.basename(notes)); // 文件名
console.log(path.extname(notes)); // 后缀
console.log(path.basename(notes, path.extname(notes))); // 不带后缀的文件名