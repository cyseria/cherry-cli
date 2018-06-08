/*
 * @Author: Cyseria
 * @Date: 2018-06-08 14:05:28
 * @LastEditors: Cyseria
 * @LastEditTime: 2018-06-08 15:07:45
 * @Description: 解析 md 的 loader
 */
const grayMatter = require('gray-matter');
const MarkdownIt = require('markdown-it');

// TODO: 解析 md
module.exports = function (source) {
    // 渲染 md 里面的标签等信息
    const matter = grayMatter(source);
    const md = new MarkdownIt()
    matter.content = md.render(matter.content);

    return `export default ${JSON.stringify(matter)}`;
};