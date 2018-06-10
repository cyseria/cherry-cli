/**
 * @file 发布脚手架
 * @author Cyseria <xcyseria@gmail.com> 
 * @created time: 2018-06-09 21:49:31 
 * @last modified by: Cyseria
 * @last modified time: 2018-06-10 00:35:46
 */

const url = require('url');
const chalk = require('chalk');
const inquirer = require('inquirer');
const GitHub = require('github-api');

const token = require('./utils/token');
var gh = new GitHub({
    token: token
});

function trimSlash(path) {
    return path.charAt(0) === '/' ? path.slice(1) : path;
}

module.exports = function (inputUrl) {
    const data = {
        name: '', // 项目名称
        owner: '', // 作者
        description: '', // 项目描述
        url: '', // 项目链接
        tags: ''
    };

    inquirer
        .prompt([
            {
                type: 'input',
                name: 'inputUrl',
                message: "repo url: ",
                when: function () {
                    return !inputUrl;
                }
            }
        ])
        .then(answers => {
            const urlRes = inputUrl || answers.inputUrl;
            // TODO: 验证 url
            console.log(chalk.gray(`get data from ${urlRes}, please wait a min...`));

            const urlObj = url.parse(urlRes);
            const pathname = trimSlash(urlObj.pathname);
            const pathArr = pathname.split('/').filter(Boolean);

            data.name = pathArr[1];
            data.owner = pathArr[0];

            const repo = gh.getRepo(data.owner, data.name);
            repo.getDetails(function (err, repo) {
                if (err) {
                    console.log(chalk.red(err));
                    process.exit();
                }
                const { description, html_url } = repo;
                data.url = html_url;
                data.description = description;

                console.log(`check info:`);
                checkInfo(data)
            });
        });
};

function checkInfo(data) {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: `repo name:`,
                default: data.name
            },
            {
                type: 'input',
                name: 'owner',
                message: `author:`,
                default: data.owner
            },
            {
                type: 'input',
                name: 'description',
                message: `description:`,
                default: data.description
            },
            {
                type: 'input',
                name: 'url',
                message: `repo url:`,
                default: data.url
            },
            {
                type: 'input',
                name: 'tags',
                message: `tags，逗号分割:`,
                default: ''
            }
        ])
        .then(answers => {
            if (answers.tags.length > 0) {
                answers.tags = answers.tags.split(',');
            }

            console.log(answers)
            // TODO: 数据发送到 server
            process.exit();
        })
        .catch(err => {
            console.log(err);
            process.exit();
        })
}
