/*
 * @Author: Cyseria
 * @Date: 2018-06-07 22:37:25
 * @LastEditors: Cyseria
 * @LastEditTime: 2018-06-08 15:28:37
 * @Description: 入口文件
 */

const program = require('commander');
const inquirer = require('inquirer');
const pkg = require('../package.json');
const scaffoldPath = require('../src/gallery/config');

// 版本信息
program
    .version(pkg.version)

// 项目初始化
program
    .command('init [path]')
    .description('init project with scaffold')
    .action(function (path) {
        // TODO 获取脚手架信息
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'scaffold',
                    message: '选择一个你想用的脚手架吧 💪 : ',
                    choices: scaffoldPath,
                    filter: function (val) {
                        return val.toLowerCase();
                    }
                }
            ])
            .then(answers => {
                const {scaffold} = answers;
                require('./cherry-init')(path, scaffold)
            });
    })

program.parse(process.argv);