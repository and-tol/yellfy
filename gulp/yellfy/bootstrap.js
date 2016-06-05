'use strict';

const exit = process.exit;
const chalk = require('chalk');
const tasks = require('./tasks');
const register = require('./register');
require('./use');

const listOfTask = tasks.getTasks();
if (listOfTask.invalid.length) {
  const invalid = listOfTask.invalid.map((task) => task.name).join(', ');
  console.log(chalk.red('>>') + ` Invalid tasks: ${invalid}`);
  exit(1);
}

if (!listOfTask.valid) {
  console.log(chalk.red('>>') + ' All tasks are not valid.');
  exit(1);
}

if (global.needDeps.length) {
  console.log(chalk.red('>>') + ` Use 'npm i -D ${global.needDeps.join(' ')}'`);
  exit(1);
}

listOfTask.valid.forEach((task) => {
  register.task(task);
});
