/**
 * @file cli 配置相关信息
 * @author Cyseria <xcyseria@gmail.com>
 * @created time: 2018-06-19 21:41:32
 * @last modified by: Cyseria
 * @last modified time: 2018-06-20 13:04:02
 */

module.exports = {
    // vue-cli 2.x: vue init tpl projectname
    // vue-cli 3.x (alpha): vue create projectname (support feature if stable)
    'vue': {
        cmd: 'vue-cli',
        init: 'init',
        tplList: ['webpack', 'webpack-simple', 'browserify', 'browserify-simple', 'pwa', 'simple']
    },
    // npx create-react-app my-app
    'create-react-app': {}
};