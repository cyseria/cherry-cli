# cherry scaffold

[![build status](https://img.shields.io/travis/cyseria/cherry-scaffold/master.svg?style=flat-square)](https://travis-ci.org/cyseria/cherry-scaffold)
[![Test coverage](https://img.shields.io/codecov/c/github/cyseria/cherry-scaffold.svg?style=flat-square)](https://codecov.io/github/cyseria/cherry-scaffold?branch=master)
[![NPM version](https://img.shields.io/npm/v/cherry-scaffold.svg?style=flat-square)](https://www.npmjs.com/package/cherry-scaffold)
[![NPM Downloads](https://img.shields.io/npm/dm/cherry-scaffold.svg?style=flat-square&maxAge=43200)](https://www.npmjs.com/package/cherry-scaffold)

一个脚手架市场命令行版，[default server demo](https://github.com/cyseria/cherry-scaffold-server), [default web demo](https://github.com/cyseria/cherry-scaffold-web)。

## Why Cherry
想着起这轮子的时候刚好在吃，而且觉得这单词很可爱呀 😀

## how to use
脚手架初始化（还没发布，暂时用 `node ./bin/cherry.js xxx` 替代）

### 安装
```
npm install cherry -g
```
### 初始化
```bash
# 初始化项目，支持创建多层级的文件夹 init demo/a/b/c
cherry init [path]
```

### 从市场上搜索脚手架
```bash
cherry search [tag]
```

### 配置信息
```bash
# 对接自己的服务器
cherry set serverAddress [path]
```

### 发布自己的脚手架
```bash
# 对接自己的服务器
cherry publish [path]
```

## web 相关
> 这里是脚手架市场可视化页面的一些东西。主要维护列表和样式修改等

### 💪 待集成进工作流中

首先为 脚手架 们生成一个 config（需要有 readme.md）
从远程拉数据 & 本地各都维护一份，只拉 readme 和 cherry.config.js
```
npm run gen
```

### 开发
```
npm run dev
```

### 构建
```
npm run build
```

## TODO
