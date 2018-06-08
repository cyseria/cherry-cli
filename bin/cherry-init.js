/*
 * @Author: Cyseria
 * @Date: 2018-06-07 23:43:46
 * @LastEditors: Cyseria
 * @LastEditTime: 2018-06-08 15:31:33
 * @Description: 初始化文件，将 tmp 移动到自己 init 的项目中
 */

var nps = require('path')
var child = require('child_process')
var chalk = require('chalk');
const fse = require('fs-extra')
var fs = require('./utils/fs');

module.exports = function (path, source) {
    path = path || process.cwd();
    // TODO: init demo 如果没写 path 报错
    if (fs.existsSync(path)) {
        console.log(`The File ${chalk.yellow(nps.relative(process.cwd(), path))} has already existed`)
        process.exit(1)
    }
    // 文件不存在，创建目录
    fse.ensureDirSync(path);

    // console.log('  running: ', chalk.yellow.bold('npm init -y'));
    // child.execSync('npm init -y', { cwd: path });

    // copy data
    var srcPath = nps.join(__dirname, '../src/gallery', source);
    var destPath = nps.join(process.cwd(), path);
    try {
        fse.copySync(srcPath, destPath)
        console.log(chalk.cyan(`
            ${path} create success with ${source}.
            Thanks for you using cherry scaffold 🍒
        `));
    } catch (err) {
        console.error(err)
    }

    process.exit()
}