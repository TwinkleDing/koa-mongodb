const path = require('path');
const notes = '/src/app.js';

console.log(path.dirname(notes)); // 父文件夹
console.log(path.basename(notes)); // 文件名
console.log(path.extname(notes)); // 后缀
console.log(path.basename(notes, path.extname(notes))); // 不带后缀的文件名
console.log(path.join('/', 'users', name, 'notes.txt') ); // 链接路径的俩个或多个部分
console.log(path.resolve('joe.txt')); // 获取相对路径的结对路径
console.log(path.normalize('/users/joe/..//test.txt') ///users/test.txt); // 尝试计算实际路径

// path.isAbsolute() 是否是绝对路径， 是true
// path.parse() = {root,dir,base,name,ext}分析对象的路径{根,从根开始的文件夹,文件名+扩展名,文件名,扩展名}
// path.relative(a,b)  根据当前工作目录返回从第一个路径到第二个路径的相对路径。
