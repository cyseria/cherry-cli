/**
 * @file json 文件操作相关, 主要是 config 的配置( ~/.cherry)
 * @author Cyseria <xcyseria@gmail.com> 
 * @created time: 2018-06-10 19:00:15
 */

const os = require('os');
const fsExtra = require('fs-extra')
const nps = require('path');

const configPath = nps.join(os.homedir(), '.cherry');
module.exports = {
    set(key, value) {
        fsExtra.ensureFileSync(configPath);

        const newObj = {};
        newObj[key] = value;

        let oldObj;
        const fileLength = fsExtra.readFileSync(configPath, 'utf8').length;
        if (fileLength === 0) {
            oldObj = {};
        } else {
            oldObj = fsExtra.readJsonSync(configPath);
        }
        const obj = Object.assign(oldObj, newObj);
        fsExtra.writeJsonSync(configPath, obj);
    },

    get(key) {
        fsExtra.ensureFileSync(configPath);
        const fileLength = fsExtra.readFileSync(configPath, 'utf8').length;
        if (fileLength === 0) {
            return;
        }
        const obj = fsExtra.readJsonSync(configPath);
        if (!obj[key]) {
            return;
        }
        return obj[key];
    },

    del(key) {
        const obj = fsExtra.readJsonSync(configPath);
        if (!!obj[key]) {
            delete obj.user;
            fsExtra.writeJsonSync(configPath, obj);
        }
    },

    list(key) {
        fsExtra.ensureFile(configPath);
        const obj = fsExtra.readJsonSync(configPath);
        return obj;
    }
}