/**
 * @file 获取列表信息
 * @author Cyseria <xcyseria@gmail.com> 
 * @created time: 2018-06-10 10:23:42 
 * @last modified by: Cyseria
 * @last modified time: 2018-06-10 15:26:53
 */

const request = require('superagent');
const chalk = require('chalk');
const API = require('./utils/api');
const each = require('./utils/each');

module.exports = async function (path, source) {
    try {
        const res = await request.get(API.getList);
        const body = typeof res.body === 'string' ? JSON.parse(res.body) : res.body;
        each(body, val => {
            const { name, owner, description, url, tags } = val;
            console.log(` * ${chalk.blue(name)}${chalk.gray(`(${owner})`)}: ${description}`);
            console.log(`   tags: [${tags.join(', ')}]`);
            console.log(`   url: ${url}`);
        })
    } catch (err) {
        console.log(chalk.red(err));
    }
}