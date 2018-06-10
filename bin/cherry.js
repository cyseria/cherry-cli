/**
 * @file 命令行入口文件
 * @author Cyseria <xcyseria@gmail.com> 
 * @created time: 2018-06-07 22:37:25
 * @last modified by: Cyseria
 * @last modified time: 2018-06-10 14:28:32
 */

const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');

const pkg = require('../package.json');
const log = console.log;

// 版本信息
program
    .version(pkg.version)

// 项目初始化
program
    .command('init [conf...]')
    .description('init project with scaffold')
    .action(function (conf) {
        const inputName = conf[0];
        const inputScaffold = conf[1];
        require('./cherry-init')(inputName, inputScaffold);
    })

// 发布脚手架
program
    .command('publish [url]')
    .description('publish your scffold 😄 ')
    .action(function (url) {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'url',
                    message: "repo url(github || gitlab || iCode): ",
                    when: function () {
                        return !url;
                    }
                }
            ])
            .then(answers => {
                const scaffoldRemoteUrl = url || answers.url;
                require('./cherry-publish')(scaffoldRemoteUrl);
            });
        // 检查 url 信息
    })

program
    .command('list')
    .description('find all scaffolds in market')
    .action(function () {
        require('./cherry-list')();
    })
program.parse(process.argv);