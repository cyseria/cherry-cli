# CHERRY-CHERRY

[![build status](https://img.shields.io/travis/cyseria/cherry-scaffold/master.svg?style=flat-square)](https://travis-ci.org/cyseria/cherry-scaffold)
[![Test coverage](https://img.shields.io/codecov/c/github/cyseria/cherry-scaffold.svg?style=flat-square)](https://codecov.io/github/cyseria/cherry-scaffold?branch=master)
[![NPM version](https://img.shields.io/npm/v/cherry-scaffold.svg?style=flat-square)](https://www.npmjs.com/package/cherry-scaffold)
[![NPM Downloads](https://img.shields.io/npm/dm/cherry-scaffold.svg?style=flat-square&maxAge=43200)](https://www.npmjs.com/package/cherry-scaffold)

一个脚手架市场命令行版:

全家桶:
- [default server demo](https://github.com/cyseria/cherry-default-server): 一个基于 koa 起的本地服务, 暂时没有上数据库
- [default web demo](https://github.com/cyseria/cherry-default-web): 一个可视化的 web 页面
- server in leanCloud: 基于 leancloud 部署的测试服务

## Why cherry-cherry
想着起这轮子的时候刚好在吃，觉得这单词很可爱 😀

然而 npm 上的 cherry 已经被人占坑的, 为了方便记忆(懒得想名), 就变成了 `cherry-cherry`

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

### 配置项目基础信息
```bash
cherry config set <key> <value>
cherry config list
cherry config delete <key>
```

通常我们需要配置的是 `github token`, 和 `server` 地址信息

```bash
cherry config set token <your github token>
cherry config set server <your server address>
```

eg. `cherry config set server 'http://localhost:3000/cherry'`

### 查看所有脚手架
```bash
cherry list
```

### 发布自己的脚手架
```bash
cherry publish <url>
```

默认发布到默认 server 地址上, 如果使用自己搭建的 server, 需要实现以下几个接口

- 获取简单列表
    `${baseUrl}/simple-list`,返回脚手架列表里的标题信息, 数组对象
    例如 `['vue-vuex', 'react-mobx', 'riot-simple']`
- 获取列表详情
    `${baseUrl}/` 当参数为空时返回所有信息, 根据参数字段进行搜索匹配
    例如 `?name=react`
- 发布数据
    `${baseUrl}/publish`, publish 时调用

## FEATURE

- `cherry unpublish <url>`
- `cherry login`
- `cherry search <tag>`
