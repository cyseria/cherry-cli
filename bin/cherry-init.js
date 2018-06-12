/**
 * @file 初始化文件，将 tmp 移动到自己 init 的项目中
 * @author Cyseria <xcyseria@gmail.com>
 * @created time: 2018-06-07 23:43:46
 * @last modified by: Cyseria
 * @last modified time: 2018-06-12 00:24:18
 */

const nps = require('path');
const child = require('child_process');

const fsExtra = require('fs-extra');
const request = require('superagent');
const inquirer = require('inquirer');
const chalk = require('chalk');

const API = require('./utils/api');

async function getList() {
    try {
        console.log(chalk.gray('getting list from server...'));
        const res = await request.get(API.getSimpleList);
        const body = typeof res.body === 'string' ? JSON.parse(res.body) : res.body;
        return body;
    } catch (err) {
        console.log(chalk.red(err));
        process.exit();
    }
}

async function getScaffoldInfo(name) {
    try {
        const res = await request.get(API.getList).query({ name: name });
        const body = typeof res.body === 'string' ? JSON.parse(res.body) : res.body;
        return body;
    } catch (err) {
        console.log(chalk.red(err));
    }
}

// 获取用户输入的信息, 以及一些验证确保正确输入了 项目名称 和 使用的脚手架信息
async function getFinalData(inputName, inputScaffold) {
    const list = await getList();
    const userInput = await inquirer.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: 'project name: ',
            when() {
                return !inputName;
            },
            validate(value) {
                return value.length > 0 ? true : 'Please enter your project name';
            }
        },
        {
            type: 'list',
            name: 'scaffoldName',
            message: 'choose a scaffold: ',
            choices: list,
            when() {
                return !inputScaffold;
            }
        }
    ]);
    const projectName = inputName || userInput.projectName;
    const scaffoldName = inputScaffold || userInput.scaffoldName;
    return { projectName, scaffoldName };
}

module.exports = async function (inputName, inputScaffold) {
    const { projectName, scaffoldName } = await getFinalData(inputName, inputScaffold);
    const path = projectName || process.cwd();

    // 文件存在 TODO: 里面没有内容的跳过
    if (fsExtra.existsSync(path)) {
        const dir = nps.relative(process.cwd(), path);
        console.log(chalk.yellow(`The File ${chalk.yellow(dir)} has already existed`));
        process.exit(1);
    }

    // 文件不存在，创建目录，copy data
    const url = await getScaffoldInfo(scaffoldName).url;
    try {
        console.log(chalk.gray(`clone project from ${url}, please wait a min...`));
        
        child.execSync(`git clone ${url} ${projectName} `);
        // 移除 git 版本控制信息
        const destPath = nps.join(process.cwd(), projectName, '.git');
        fsExtra.removeSync(destPath);
        console.log(chalk.cyan(`\n ${path} create success with ${scaffoldName}`));
        console.log(chalk.cyan(' Thanks for you using cherry scaffold 🍒'));
    } catch (err) {
        console.log(chalk.red(err));
    }
    process.exit();
};
