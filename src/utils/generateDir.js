/*
 * @Author: Cyseria
 * @Date: 2018-06-08 14:05:40
 * @LastEditors: Cyseria
 * @LastEditTime: 2018-06-08 15:32:24
 * @Description: 用于生成目录的脚本
 */

const fs = require("fs");
const path = require("path");
const util = require('util');

const readdir = util.promisify(fs.readdir);

// 获取目录，便于生成列表

const galleryList = [];
const galleryDir = path.resolve(process.cwd(), './src/gallery');

readdir(galleryDir)
    .then((files) => {
        files.forEach(function (filename) {
            const fullname = path.join(galleryDir, filename);
            const stats = fs.statSync(fullname);
            if (stats.isDirectory()) {
                galleryList.push(filename)
            }
        });
        // 这里生成
        fs.writeFile(path.resolve(process.cwd(), './src/gallery/config.js'), `
        module.exports = ${JSON.stringify(galleryList)}
        `, function (err) {
            if (err) throw err;
            console.log('文件写入成功');
        });
    }).catch((error) => {
        console.log(err);
        return;
    });
