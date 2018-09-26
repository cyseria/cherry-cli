/**
 * @file search
 * @author Cyseria <xcyseria@gmail.com>
 * @created time: 2018-06-10 13:57:47
 */

const Table = require('cli-table3');

const logInfo = ['name', 'owner', 'description', 'url', 'tags'];
const table = new Table({
    head: logInfo,
    colWidths: [15, 10, 20, 20, 20],
    style: { head: ['cyan'] }
});
