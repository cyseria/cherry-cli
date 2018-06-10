/**
 * @file 初始化文件，将 tmp 移动到自己 init 的项目中
 * @author Cyseria <xcyseria@gmail.com> 
 * @created time: 2018-06-07 23:43:46
 * @last modified by: Cyseria
 * @last modified time: 2018-06-10 15:10:09
 */

const nps = require('path');
const fsExtra = require('fs-extra');
const request = require('superagent');
const inquirer = require('inquirer');
const chalk = require('chalk');

const API = require('./utils/api');

async function getList() {
    try {
        console.log(chalk.gray('getting list from server...'))
        const res = await request.get(API.getSimpleList);
        const body = typeof res.body === 'string' ? JSON.parse(res.body) : res.body;
        return new Promise((resolve, reject) => {
            resolve(body);
        });
    } catch (err) {
        console.log(chalk.red(err));
        reject(err);
    }
}

async function checkInput(inputName, inputScaffold) {
    const list = await getList();
    return new Promise((resolve, reject) => {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'projectName',
                    message: "project name: ",
                    when: function () {
                        return !inputName;
                    },
                    validate: function (value) {
                        return value.length > 0 ? true : 'Please enter your project name';
                    }
                },
                {
                    type: 'list',
                    name: 'scaffold',
                    message: 'choose a scaffold: ',
                    choices: list,
                    when: function () {
                        return !inputScaffold;
                    }
                }
            ])
            .then(answers => {
                const name = inputName || answers.projectName;
                const scaffold = inputScaffold || answers.scaffold;
                resolve({ name, scaffold });
            });
    })
}

module.exports = async function (inputName, inputScaffold) {
    const { name, scaffold } = await checkInput(inputName, inputScaffold);
    path = name || process.cwd();

    // 文件存在 @TODO: 里面没有内容的跳过
    if (fsExtra.existsSync(path)) {
        const dir = nps.relative(process.cwd(), path);
        console.log(chalk.yellow(`The File ${chalk.yellow(dir)} has already existed`));
        process.exit(1);
    }

    // 文件不存在，创建目录，copy data
    const srcPath = nps.join(__dirname, '../src/gallery', scaffold);
    const destPath = nps.join(process.cwd(), path);
    try {
        fsExtra.ensureDirSync(path);
        fsExtra.copySync(srcPath, destPath);
        console.log(chalk.cyan(`
            ${path} create success with ${scaffold}.
            Thanks for you using cherry scaffold 🍒
        `));
    } catch (err) {
        console.log(chalk.red(err));
    }
    process.exit();
};
