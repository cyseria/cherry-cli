/*
 * @Author: Cyseria
 * @Date: 2018-06-08 10:44:57
 * @LastEditors: Cyseria
 * @LastEditTime: 2018-06-08 14:21:21
 * @Description: webpack 配置
 */
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlWebpackPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});

console.log(path.resolve(__dirname, './src/utils/renderMdTag.js'))
module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.md$/,
                loader: path.resolve(__dirname, './src/utils/renderMdTag.js')
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        htmlWebpackPlugin
    ]
};