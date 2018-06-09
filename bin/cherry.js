/**
 * @file 命令行入口文件
 * @author Cyseria <xcyseria@gmail.com> 
 * @created time: 2018-06-07 22:37:25
 * @last modified by: Cyseria
 * @last modified time: 2018-06-09 22:18:42
 */

const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const log = console.log;

const pkg = require('../package.json');
const scaffoldPath = require('../src/gallery/config');

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
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'projectName',
                    message: "project name: ",
                    when: function () {
                        return !inputName;
                    }
                },
                {
                    type: 'list',
                    name: 'scaffold',
                    message: 'choose a scaffold: ',
                    choices: scaffoldPath,
                    when: function () {
                        return !inputScaffold;
                    }
                }
            ])
            .then(answers => {
                const name = inputName || answers.projectName;
                const scaffold = inputScaffold || answers.scaffold;
                require('./cherry-init')(name, scaffold)
            });
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

program.parse(process.argv);