/**
 * @file 文件路径相关模块
 * @author Cyseria <xcyseria@gmail.com>
 * @created time: 2018-06-19 18:54:53
 */

const fs = require('fs');
const { execSync } = require('child_process');

module.exports = {
    /**
     * 判断是否为全局变量(用于 cli 初始化)
     * @param {string} v 变量名称
     * @return {boolean} 全局变量是否存在
     */
    isGlobalVariable(v) {
        // TODO: Windows use 'where xxx'
        try {
            const globalDir = execSync(`which ${v}`, {
                encoding: 'utf-8'
            });
            console.log(globalDir);
            return true;
        } catch (err) {
            return false;
        }
    },
    isDirectory(path) {
        return fs.existsSync(path) && fs.statSync(path).isDirectory();
    }
}