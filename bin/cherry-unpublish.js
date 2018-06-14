/**
 * @file 取消发布脚手架
 * @author Cyseria <xcyseria@gmail.com>
 * @created time: 2018-06-09 21:49:31
 * @last modified by: Cyseria
 * @last modified time: 2018-06-14 10:57:21
 */

const chalk = require('chalk');
const request = require('superagent');
const inquirer = require('inquirer');

const API = require('./utils/api');

// 获取 unpublish repo's name 信息
async function getUserInputName(name) {
    const errorStr = 'Please enter a legal name';
    const userInput = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'repo name: ',
            when() {
                return !name;
            },
            validate(value) {
                return value.length > 0;
            }
        }
    ]);
    return name || userInput.name;
}

module.exports = async function (name) {
    const userInputName = await getUserInputName(name);
    unPublishData(userInputName);
};


function unPublishData(name) {
    request
        .del(API.unpublish)
        .send({name: name})
        .end((err, res) => {
            if (err) {
                console.log(chalk.red(err));
                process.exit(1);
            }
            console.log(chalk.green(`unpublish ${name} success!`));
        });
}
