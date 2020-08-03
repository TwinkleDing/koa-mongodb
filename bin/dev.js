const args = require('minimist')(process.argv.slice(2));
console.log(args.name)

const chalk = require('chalk');
console.log(chalk.yellow.bgBlue('你好'));

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

