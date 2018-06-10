/**
 * @file 获取列表信息
 * @author Cyseria <xcyseria@gmail.com> 
 * @created time: 2018-06-10 10:23:42 
 * @last modified by: Cyseria
 * @last modified time: 2018-06-10 14:40:40
 */

const request = require('superagent');
const chalk = require('chalk');
const API = require('./utils/api');

module.exports = async function (path, source) {
    try {
        const res = await request.get(API.getList);
        const body = typeof res.body === 'string' ? JSON.parse(res.body) : res.body;
        body.forEach(ele => {
            const { name, owner, description, url, tags } = ele;
            console.log(` * ${chalk.blue(name)}${chalk.gray(`(${owner})`)}: ${description}`);
            console.log(`   tags: [${tags.join(', ')}]`);
            console.log(`   url: ${url}`);
        });
    } catch (err) {
        console.log(chalk.red(err));
    }
}