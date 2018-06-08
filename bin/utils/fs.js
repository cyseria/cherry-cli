/*
 * @Author: Cyseria
 * @Date: 2018-06-07 22:57:14
 * @LastEditors: Cyseria
 * @LastEditTime: 2018-06-07 23:07:16
 * @Description: 文件处理相关
 */

const fs = require('fs')

fs.copySync = function (src, dest) {
    return fs.writeFileSync(dest, fs.readFileSync(src));
}

fs.isDirectory = function (path) {
    return fs.existsSync(path) && fs.statSync(path).isDirectory();
}
fs.isFile = function (path) {
    return fs.existsSync(path) && fs.statSync(path).isFile();
}

module.exports = fs;