/**
 * @file 发布脚手架
 * @author Cyseria <xcyseria@gmail.com>
 * @created time: 2018-06-09 21:49:31
 * @last modified by: Cyseria
 * @last modified time: 2018-06-14 08:29:58
 */

const url = require('url');
const chalk = require('chalk');
const request = require('superagent');
const inquirer = require('inquirer');
const GitHub = require('github-api');

const API = require('./utils/api');
const jsonFileOperate = require('./utils/jsonFileOperate');

const isUrlExp = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;

function trimSlash(path) {
    return path.charAt(0) === '/' ? path.slice(1) : path;
}

// 获取 publish 的 url 信息
async function getUserInputUrl(url) {
    const errorStr = 'Please enter a legal url from github or gitlab or iCode';
    if (!!url && !isUrlExp.test(url)) {
        console.log(chalk.red(errorStr));
        url = '';
    }
    const userInput = await inquirer.prompt([
        {
            type: 'input',
            name: 'url',
            message: 'repo url(github or gitlab or iCode): ',
            when() {
                return !url;
            },
            validate(value) {
                return isUrlExp.test(value) ? true : errorStr;
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
    const token = jsonFileOperate.get('token');
    console.log('token', token)
    if (!token) {
        console.log(chalk.red('please add token first: \n cherry config set token <your github token>'));
        process.exit(1);
    }
    const gh = new GitHub({
        token: token
    });

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

function getRepoInfoFromUrl(userInputUrl) {
    const urlObj = url.parse(userInputUrl);
    const pathname = trimSlash(urlObj.pathname);
    const pathArr = pathname.split('/').filter(Boolean);
    return {
        name: pathArr[1],
        owner: pathArr[0]
    }
}

module.exports = async function (input) {
    const repoData = {
        name: '', // 项目名称
        owner: '', // 作者
        description: '', // 项目描述
        url: '', // 项目链接
        tags: ''
    };

    const userInputUrl = await getUserInputUrl(input);

    if (userInputUrl.indexOf("github") > 0) { // github
        console.log(chalk.gray(`get data from ${userInputUrl}, please wait a min...`));

        // 设置用户名和作者信息
        const { name, owner } = getRepoInfoFromUrl(userInputUrl);
        repoData.name = name;
        repoData.owner = owner;

        // 获取 github repo 的基础信息
        const repoDetail = await getRepoDetail(repoData.owner, repoData.name);
        repoData.url = repoDetail.html_url;
        repoData.description = repoDetail.description;
    } else if (userInputUrl.indexOf("gitlab") > 0) {
        const { name, owner } = getRepoInfoFromUrl(userInputUrl);
        repoData.url = userInputUrl;
        repoData.name = name;
        repoData.owner = owner;

    } else if (userInputUrl.indexOf("icode") > 0) {
        const urlObj = url.parse(userInputUrl);
        const pathname = trimSlash(urlObj.pathname);
        const pathArr = pathname.split('/').filter(Boolean);

        repoData.name = pathArr[3];
        repoData.url = userInputUrl;
    } else {
        console.log(chalk.red('暂时只支持 github, gitlab, icode 三个地方项目的发布, 你的链接不在此范围 :('));
        process.exit(1);
    }
    // 用户核对 repo 信息
    const userCheckedData = await getUserCheckedData(repoData);
    publishData(userCheckedData);

};


function publishData(data) {
    request
        .post(API.publish)
        .send(data)
        .end((err, res) => {
            console.log(res)
            if (err) {
                console.log(chalk.red(err));
                process.exit(1);
            }
            console.log(chalk.green(`publish ${data.name} success!`));
        });
}
