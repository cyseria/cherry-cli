/**
 * @file 发布脚手架
 * @author Cyseria <xcyseria@gmail.com>
 * @created time: 2018-06-09 21:49:31
 * @last modified by: Cyseria
 * @last modified time: 2018-06-10 21:39:54
 */

const url = require('url');
const chalk = require('chalk');
const request = require('superagent');
const inquirer = require('inquirer');
const GitHub = require('github-api');

const token = require('./utils/token');
const API = require('./utils/api');
const gh = new GitHub({
    token: token
});

function trimSlash(path) {
    return path.charAt(0) === '/' ? path.slice(1) : path;
}

// 获取 publish 的 url 信息
async function getUserInputUrl(url) {
    const userInput = await inquirer.prompt([
        {
            type: 'input',
            name: 'url',
            message: 'repo url(github or gitlab or iCode): ',
            when() {
                return !url;
            }
        }
    ]);
    return url || userInput.url;
}

// 用于确认拉取的数据是否正确
async function getUserCheckedData(data) {
    console.log('请确认仓库的信息: ');
    const userInput = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'repo name:',
            default: data.name
        },
        {
            type: 'input',
            name: 'owner',
            message: 'author:',
            default: data.owner
        },
        {
            type: 'input',
            name: 'description',
            message: 'description:',
            default: data.description
        },
        {
            type: 'input',
            name: 'url',
            message: 'repo url:',
            default: data.url
        },
        {
            type: 'input',
            name: 'tags',
            message: 'tags，逗号分割:',
            default: ''
        }
    ]);
    return userInput;
}

/**
 * github api 采用传统 cb 形式, 统一起见手工包装下
 * @param {string} owner 项目作者
 * @param {string} name 项目名称
 * @return {Promise} 接口获取到的数据
 */
function getRepoDetail(owner, name) {
    const repo = gh.getRepo(owner, name);
    return new Promise((resolve, reject) => {
        repo.getDetails((err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}

// TODO: 支持 iCode 和 gitlab
module.exports = async function (input) {
    const repoData = {
        name: '', // 项目名称
        owner: '', // 作者
        description: '', // 项目描述
        url: '', // 项目链接
        tags: ''
    };

    const userInputUrl = await getUserInputUrl(input);
    // TODO: 验证 url
    console.log(chalk.gray(`get data from ${userInputUrl}, please wait a min...`));

    // 设置用户名和作者信息
    const urlObj = url.parse(userInputUrl);
    const pathname = trimSlash(urlObj.pathname);
    const pathArr = pathname.split('/').filter(Boolean);
    repoData.name = pathArr[1];
    repoData.owner = pathArr[0];

    // 获取 github repo 的基础信息
    const repoDetail = await getRepoDetail(repoData.owner, repoData.name);
    repoData.url = repoDetail.html_url;
    repoData.description = repoDetail.description;

    // 用户核对 github repo 信息
    const userCheckedData = await getUserCheckedData(repoData);
    publishData(userCheckedData);
};


function publishData(data) {
    request
        .post(API.publish)
        .send(data)
        .end((err, res) => {
            if (err) {
                console.log(chalk.red(err));
            }
            console.log(chalk.green(`publish ${data.name} success!`));
        });
}
