/**
 * @file 获取列表信息
 * @author Cyseria <xcyseria@gmail.com>
 * @created time: 2018-06-10 10:23:42
 * @last modified by: Cyseria
 * @last modified time: 2018-06-14 10:54:31
 */

const request = require('superagent');
const chalk = require('chalk');
const API = require('./utils/api');
const each = require('./utils/each');

module.exports = async function (path, source) {
    try {
        const res = await request.get(API.getList);
        const body = typeof res.body === 'string' ? JSON.parse(res.body) : res.body;
        if (Object.keys(body).length === 0) { // 结果为空
            console.log(chalk.blue(' empty list, publish one?'));
        } else {
            each(body, val => {
                const { name, owner, description, url, tags } = val;
                console.log(`\n ${chalk.blue('*' + name)}${chalk.gray(`(${owner})`)}: ${description}`);
                console.log(`   tags: ${tags}`);
                console.log(`   url: ${url}`);
            });
        }
    } catch (err) {
        console.log(chalk.red(err));
        process.exit(1);
    }
};