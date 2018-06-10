/**
 * @file 初始化文件，将 tmp 移动到自己 init 的项目中
 * @author Cyseria <xcyseria@gmail.com> 
 * @created time: 2018-06-07 23:43:46
 * @last modified by: Cyseria
 * @last modified time: 2018-06-10 16:34:11
 */

const nps = require('path');
const child = require('child_process')

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

async function getScaffoldInfo(name) {
    try {
        const res = await request
            .get(API.getList)
            .query({ name: name });
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
                    name: 'scaffoldName',
                    message: 'choose a scaffold: ',
                    choices: list,
                    when: function () {
                        return !inputScaffold;
                    }
                }
            ])
            .then(answers => {
                const projectName = inputName || answers.projectName;
                const scaffoldName = inputScaffold || answers.scaffoldName;
                resolve({ projectName, scaffoldName });
            });
    })
}

module.exports = async function (inputName, inputScaffold) {

    const { projectName, scaffoldName } = await checkInput(inputName, inputScaffold);
    path = projectName || process.cwd();

    // 文件存在 TODO: 里面没有内容的跳过
    if (fsExtra.existsSync(path)) {
        const dir = nps.relative(process.cwd(), path);
        console.log(chalk.yellow(`The File ${chalk.yellow(dir)} has already existed`));
        process.exit(1);
    }

    // 文件不存在，创建目录，copy data
    const { url } = await getScaffoldInfo(scaffoldName);
    
    try {
        console.log(chalk.gray(`clone project from ${url}, please wait a min...`));
        await child.execSync(`git clone ${url} ${projectName} `);
        const destPath = nps.join(process.cwd(), projectName, '.git');
        // FIXME: 这里只是在 linux 中有效, 需要改成 node 命令
        fsExtra.removeSync(destPath)
        console.log(chalk.cyan(`
            ${path} create success with ${scaffoldName}.
            Thanks for you using cherry scaffold 🍒
        `));
    } catch (err) {
        console.log(chalk.red(err));
    }
    process.exit();
};
