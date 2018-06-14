#! /usr/bin/env node

/**
 * @file 命令行入口文件
 * @author Cyseria <xcyseria@gmail.com>
 * @created time: 2018-06-07 22:37:25
 * @last modified by: Cyseria
 * @last modified time: 2018-06-14 14:54:38
 */

const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');

const pkg = require('../package.json');

// 版本信息
program.version(pkg.version);

// 项目初始化
program
    .command('init [conf...]')
    .description('init project with scaffold')
    .action(function (conf) {
        const inputName = conf[0];
        const inputScaffold = conf[1];
        require('./cherry-init')(inputName, inputScaffold);
    });

// 获取全部列表
program
    .command('list')
    .description('find all scaffolds in market')
    .action(function () {
        require('./cherry-list')();
    });

// 发布脚手架
program
    .command('publish [url]')
    .description('publish your scffold 😄 ')
    .action(function (url) {
        require('./cherry-publish')(url);
    });

program
    .command('unpublish [name]')
    .description('unpublish your scffold 😄 ')
    .action(function (name) {
        require('./cherry-unpublish')(name);
    });
// 配置信息
program
    .command('config [conf...]')
    .description('config operate 😄 ')
    .action(function (conf) {
        if (conf.length === 0) {
            const prefix = `${chalk.bold('cherry')} ${chalk.red('ERR!')}`;
            console.log([
                `${prefix} Usage:`,
                `${prefix} cherry config set <key> <value>:`,
                `${prefix} cherry config get <key>:`,
                `${prefix} cherry config delete <key>:`,
                `${prefix} cherry config list:`,
            ].join('\n'));
        }
        require('./cherry-config')(conf);
    });
program.parse(process.argv);


