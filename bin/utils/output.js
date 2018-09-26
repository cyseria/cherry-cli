/**
 * @file 一些输出统一处理模块
 * @author Cyseria <xcyseria@gmail.com>
 * @created time: 2018-06-20 10:45:13
 */

const chalk = require('chalk');

module.exports = {
    handleErr(err) {
        console.log(chalk.red(err));
        process.exit(1);
    },
    handleCreateSuccess(path, scaffoldName) {
        console.log(chalk.cyan(`\n ${path} create success with ${scaffoldName}`));
        console.log(chalk.cyan(' Thanks for you using cherry scaffold 🍒'));
        process.exit(0);
    }
};
