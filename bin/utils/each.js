/**
 * @file 
 * @author Cyseria <xcyseria@gmail.com> 
 * @created time: 2018-06-10 15:20:59
 */

module.exports = function (data, cb) {
    if (Array.isArray(data)) {
        data.forEach((val, i, all) => cb(val, i, i, all))
    }
    else {
        Object.keys(data).forEach((key, i) => cb(data[key], key, i, data))
    }
}