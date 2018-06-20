/**
 * @file cli 配置相关信息
 * @author Cyseria <xcyseria@gmail.com>
 * @created time: 2018-06-19 21:41:32
 * @last modified by: Cyseria
 * @last modified time: 2018-06-20 15:09:40
 */

 // TODO: 根据 remote 拉 tplList
module.exports = {
    // vue-cli 2.x: vue init tpl projectname
    // vue-cli 3.x (alpha): vue create projectname (support feature if stable)
    'vue': {
        cmd: 'vue-cli',
        remote: '',
        tplList: ['webpack', 'webpack-simple', 'browserify', 'browserify-simple', 'pwa', 'simple'],
        initArvgs(path, tplName) {
            return ['vue-cli', 'init', tplName, path];
        },
    },
    // npx create-react-app my-app
    'create-react-app': {
        initArvgs(path, tplName) {
            return ['create-react-app', 'init', path]
        }
    },
    'matriks2': {
        remote: '',
        initArvgs(path, tplName) {
            return ['matriks2', 'init', path, '-t', tplName];
        },
        tplList: ['preact-mobx-v2', 'react-mobx', 'react-mobx-mit-v3', 'react-mobx-v2', 'react-mobx-vm', 'react-mobx-with-knex']
    }
};