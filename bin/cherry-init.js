/**
 * @file 初始化文件，将 tmp 移动到自己 init 的项目中
 * @author Cyseria <xcyseria@gmail.com>
 * @created time: 2018-06-07 23:43:46
 */

const nps = require('path');
const fs = require('fs');

const execa = require('execa');
const fsExtra = require('fs-extra');
const request = require('superagent');
const inquirer = require('inquirer');
const chalk = require('chalk');

const API = require('./config/api');
const cliInfo = require('./config/cliInfo');
const pathOperate = require('./utils/pathOperate');
const output = require('./utils/output');

// 获取脚手架列表
async function getList() {
    try {
        console.log(chalk.gray('getting list from server...'));
        const res = await request.get(API.getSimpleList);
        const body = typeof res.body === 'string' ? JSON.parse(res.body) : res.body;
        if (!Array.isArray(body)) {
            process.exit(1);
        }
        if (body.length === 0) {
            console.log(chalk.yellow('the list is empty, use "cherry publish <url>" to publish something first'));
            process.exit(1);
        }
        return body;
    } catch (err) {
        output.handleErr(err);
    }
}

// 根据脚手架名称从 server 获取信息列表
async function getScaffoldInfo(name) {
    try {
        const res = await request.get(API.getList).query({ name: name });
        const body = typeof res.body === 'string' ? JSON.parse(res.body) : res.body;
        return body;
    } catch (err) {
        output.handleErr(err);
    }
}

// 获取用户输入的信息, 以及一些验证确保正确输入了 项目名称 和 使用的脚手架信息
async function getInputInitData(inputName, inputScaffold) {
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


async function getInputTemplateList(name, list) {
    const userInput = await inquirer.prompt([
        {
            type: 'list',
            name: 'template',
            message: `use ${name}, choose an official templates: `,
            choices: list
        }
    ]);
    return userInput.template;
}

/**
 * 判断是否是命令式脚手架
 * @param {string} name 脚手架名称
 * @return {boolean} 是否是命令式脚手架
 */
function isOfficialCli(name) {
    if (cliInfo.hasOwnProperty(name)) {
        return true;
    }
    const hasVal = Object.values(cliInfo).some(ele => {
        if (ele.cmd === name) {
            return true;
        }
    });
    return hasVal || false;
}

module.exports = async function (inputName, inputScaffold) {
    const { projectName, scaffoldName } = await getInputInitData(inputName, inputScaffold);
    const path = projectName || process.cwd();

    // 文件夹存在且不为空, TODO: check if cover exists dir
    if (pathOperate.isDirectory(path)) {
        const dirContent = fs.readdirSync(path);
        if (dirContent.length > 0) {
            console.log(chalk.yellow(`The File ${chalk.red(path)} has already existed`));
            process.exit(1);
        }
    }

    // cli 脚手架, 暂时直接扔去官方的处理方式, 也可以考虑自己 copy
    if (isOfficialCli(scaffoldName)) {
        // 这里暂时使用 npx 做安装, 毕竟通常来说 node 带了 npm, 而 npm 5.2 之后就默认有 npx
        // 对于如果只使用 yarn 的用户, 可以考虑 "ypx" 成熟一点或者自己有空写替代方案 :)
        let item;
        if (cliInfo.hasOwnProperty(scaffoldName)) {
            item = cliInfo[scaffoldName];
        } else {
            item = Object.values(cliInfo).find(ele => {
                return ele.cmd === scaffoldName;
            });
        }

        let tplName = '';
        if (!!item.tplList) {
            tplName = await getInputTemplateList(item.cmd, item.tplList);
        }
        const cliName = item.cmd || scaffoldName;
        const arvgs = item.initArvgs(cliName, tplName);
        await execa('npx', arvgs, { stdio: 'inherit' });
        output.handleCreateSuccess(path, scaffoldName);
    }

    // 市场存在的脚手架, 创建目录，copy data
    else {
        const data = await getScaffoldInfo(scaffoldName);
        const url = data.url;
        try {
            await execa('git', ['clone', url, projectName], { stdio: 'inherit' });

            // 移除 git 版本控制信息
            const destPath = nps.join(process.cwd(), projectName, '.git');
            fsExtra.removeSync(destPath);
            output.handleCreateSuccess(path, scaffoldName);
        } catch (err) {
            console.log(chalk.red(err));
            process.exit(1);
        }
    }
};
