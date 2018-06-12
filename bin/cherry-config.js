/**
 * @file 一些配置相关
 * @author Cyseria <xcyseria@gmail.com> 
 * @created time: 2018-06-11 21:33:00 
 * @last modified by: Cyseria
 * @last modified time: 2018-06-12 00:34:48
 */


const chalk = require('chalk');
const jsonFileOperate = require('./utils/jsonFileOperate');

module.exports = function (conf) {
    const operate = conf[0];
    switch (operate) {
        case 'set':
            if (!conf[1] || !conf[2]) {
                console.log(chalk.require(`${chalk.bold('cherry')} ${chalk.red('ERR!')} set <key> <value>`));
            }
            jsonFileOperate.set(conf[1], conf[2]);
            break;
        case 'get':
            console.log(jsonFileOperate.get(conf[1]));
            break;
        case 'del':
        case 'delete':
            jsonFileOperate.del(conf[1]);
            break;
        case 'ls':
        case 'list':
            console.log(jsonFileOperate.list());
            break;
        default:
            break;
    }
};