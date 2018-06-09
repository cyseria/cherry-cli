/**
 * @file 文件处理相关
 * @author Cyseria <xcyseria@gmail.com> 
 * @created time: 2018-06-09 21:35:34 
 * @last modified by: Cyseria
 * @last modified time: 2018-06-09 21:35:45
 */

const fs = require('fs')

exports.copySync = (src, dest) => {
    return fs.writeFileSync(dest, fs.readFileSync(src));
}
exports.isDirectory = path => {
    return fs.existsSync(path) && fs.statSync(path).isDirectory();
}
exports.isFile = path => {
    return fs.existsSync(path) && fs.statSync(path).isFile();
}