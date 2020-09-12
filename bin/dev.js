// 命令行接收参数
const args = require('minimist')(process.argv.slice(2));
console.log(process.argv.slice(2))
console.log(args)

// 设置命令行输出颜色
const chalk = require('chalk');
console.log(chalk.yellow.bgBlue('你好'));

// 输出到命令行进度条
const ProgressBar = require('progress');
const bar = new ProgressBar(':bar', { total: 10 });
const timer = setInterval(() => {
  bar.tick();
  if (bar.complete) {
    clearInterval(timer);
    console.log(chalk.yellowBright.bgBlue('完成'));
    iinput();
  }
}, 200);

// 从命令行接受输入
const inquirer = require('inquirer');
// type: list, rawlist, expand, checkbox, confirm, input, number, password, editor
var questions = [
  {
    type: 'input',
    name: 'name',
    message: '你叫什么名字?',
    default: 'twinkleding'
  },
  {
    type: 'list',
    name: 'sex',
    message: '是男是女?',
    choices: ['男', '女'] // 选项列表
  }
];
function iinput () {
  inquirer.prompt(questions).then(answers => {
    console.log(`${chalk.yellowBright('你好')} ${answers['name']}!`);
    console.log(`${chalk.yellowBright.bgBlueBright('性别')} ${answers['sex']}!`);
  });
}

// 事件触发器
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

// once()：添加一次性监听器
// removeListener()/ off()：从事件中删除事件监听器
// removeAllListeners()：删除事件的所有侦听器
eventEmitter.on('start', (start, end) => {
  let tit = setInterval(() => {
    if(start < end) {
      console.log(`started from ${start} to ${end}`);
      start++;
    }else {
      clearInterval(tit)
    }
  }, 200);
});
eventEmitter.emit('start', 1, 10);