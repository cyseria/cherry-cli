/**
 * @file 初始化文件，将 tmp 移动到自己 init 的项目中
 * @author Cyseria <xcyseria@gmail.com>
 * @created time: 2018-06-07 23:43:46
 * @last modified by: Cyseria
 * @last modified time: 2018-06-19 23:34:32
 */

const nps = require('path');
const { execSync, exec } = require('child_process');

const fs = require('fs');
const fsExtra = require('fs-extra');
const request = require('superagent');
const inquirer = require('inquirer');
const chalk = require('chalk');

const API = require('./config/api');
const pathOperate = require('./utils/pathOperate');

// 获取脚手架列表
async function getList() {
    try {
        console.log(chalk.gray('getting list from server...'));
        const res = await request.get(API.getSimpleList);
        const body = typeof res.body === 'string' ? JSON.parse(res.body) : res.body;
        return body;
    } catch (err) {
        console.log(chalk.red(err));
        process.exit(1);
    }
}

// 根据脚手架名称从 server 获取信息列表
async function getScaffoldInfo(name) {
    try {
        const res = await request.get(API.getList).query({ name: name });
        const body = typeof res.body === 'string' ? JSON.parse(res.body) : res.body;
        return body;
    } catch (err) {
        console.log(chalk.red(err));
        process.exit(1);
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

const cliBin = {
    'vue': {
        cmd: 'vue-cli',
        init: 'create'
    },
    // npx create-react-app my-app
    'create-react-app': {}
};
/**
 * 判断是否是命令式脚手架
 * @param {string} name 脚手架名称
 */
function isOfficialCli(name) {
    if (Object.keys(cliBin).indexOf(name) !== -1) {
        return true;
    }
    const hasVal = Object.values(cliBin).some(ele => {
        if (ele.cmd === name) {
            return true;
        }
    });

    return hasVal || false;
}

module.exports = async function (inputName, inputScaffold) {

    const { projectName, scaffoldName } = await getFinalData(inputName, inputScaffold);
    const path = projectName || process.cwd();

    // 文件夹存在且不为空
    // TODO: check if cover exists dir
    if (pathOperate.isDirectory(path)) {
        const dirContent = fs.readdirSync(path);
        if (dirContent.length > 0) {
            console.log(chalk.yellow(`The File ${chalk.red(path)} has already existed`));
            process.exit(1);
        }
    }

    // cli 脚手架
    if (isOfficialCli(scaffoldName)) {
        // 这里暂时使用 npx 做安装, 毕竟通常来说 node 带了 npm, 而 npm 5.2 之后就默认有 npx
        // 对于如果只使用 yarn 的用户, 可以考虑等 ypx 成熟一点或者自己有空写替代方案
        // https://github.com/yarnpkg/yarn/issues/3937

        const cmd = cliBin[scaffoldName].cmd || scaffoldName;
        const init = cliBin[scaffoldName].init || '';
        // console.log(cmd)
        const command = `npx ${cmd} ${init} ${path}`;
        console.log(`exec ${command}, please wait a min...`);
        var child = exec(command);

        child.stdout.on('data', function (data) {
            const log = data.replace(/\n/g, '');
            if (log !== ''){
                console.log(`[${cmd}] ${log}`);
            }
        });
        child.stderr.on('data', function (data) {
            console.log('err: ' + data);
        });
        child.on('close', function (code) {
            if (code === 0){
                console.log('success!')
            }
        });

        // process.exit(1);
        // console.log(chalk.cyan(`\n ${path} create success with ${scaffoldName}`));
        // console.log(chalk.cyan(' Thanks for you using cherry scaffold 🍒'));
        // process.exit(0);
    } else {
        // 市场存在的脚手架, 创建目录，copy data
        const data = await getScaffoldInfo(scaffoldName);
        const url = data.url;
        try {
            console.log(chalk.gray(`clone project from ${url}, please wait a min...`));
            execSync(`git clone ${url} ${projectName} `);
            // 移除 git 版本控制信息
            const destPath = nps.join(process.cwd(), projectName, '.git');
            fsExtra.removeSync(destPath);
            console.log(chalk.cyan(`\n ${path} create success with ${scaffoldName}`));
            console.log(chalk.cyan(' Thanks for you using cherry scaffold 🍒'));
        } catch (err) {
            console.log(chalk.red(err));
            process.exit(1);
        }
        process.exit(0);
    }
};
