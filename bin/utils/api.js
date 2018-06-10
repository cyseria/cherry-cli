/**
 * @file server 的一些 api 路径信息
 * @author Cyseria <xcyseria@gmail.com> 
 * @created time: 2018-06-10 10:33:17 
 * @last modified by: Cyseria
 * @last modified time: 2018-06-10 10:42:16
 */

const baseUrl = 'http://localhost:3000/cherry'
module.exports = {
    getSimpleList: `${baseUrl}/simple-list`, // 获取简单的列表信息,只包含名称的数组, like ['vue-vuex', 'react-mobx', 'riot-simple']
    getList: `${baseUrl}/`, // 获取列表的所有信息, param 可选
};