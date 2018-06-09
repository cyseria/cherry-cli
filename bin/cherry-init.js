/**
 * @file 初始化文件，将 tmp 移动到自己 init 的项目中
 * @author Cyseria <xcyseria@gmail.com> 
 * @created time: 2018-06-07 23:43:46
 * @last modified by: Cyseria
 * @last modified time: 2018-06-09 21:35:24
 */

const nps = require('path');
const chalk = require('chalk');
const fsExtra = require('fs-extra');

module.exports = function (path, source) {
    path = path || process.cwd();

    // 文件存在 @TODO: 里面没有内容的跳过
    if (fsExtra.existsSync(path)) {
        const dir = nps.relative(process.cwd(), path);
        console.log(chalk.yellow(`The File ${chalk.yellow(dir)} has already existed`));
        process.exit(1);
    }

    // 文件不存在，创建目录，copy data
    const srcPath = nps.join(__dirname, '../src/gallery', source);
    const destPath = nps.join(process.cwd(), path);
    try {
        fsExtra.ensureDirSync(path);
        fsExtra.copySync(srcPath, destPath);
        console.log(chalk.cyan(`
            ${path} create success with ${source}.
            Thanks for you using cherry scaffold 🍒
        `));
    } catch (err) {
        console.log(chalk.red(err));
    }
    process.exit();
};
