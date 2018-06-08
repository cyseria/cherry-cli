/*
 * @Author: Cyseria
 * @Date: 2018-06-07 22:37:25
 * @LastEditors: Cyseria
 * @LastEditTime: 2018-06-07 22:55:37
 * @Description: 入口文件
 */

var program = require('commander');
var pkg = require('../package.json')

// 版本信息
program
    .version(pkg.version)

// 项目初始化
program
    .command('init [path]')
    .description('init project with scaffold')
    .action(function (path) {
        // TODO 获取脚手架信息
        require('./cherry-init')(path, 'react-mobx')
    })

program.parse(process.argv);