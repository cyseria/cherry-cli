# 🍒 CHERRY-CHERRY

[![build status](https://img.shields.io/travis/cyseria/cherry-cherry/master.svg?style=flat-square)](https://travis-ci.org/cyseria/cherry-cherry)
[![Test coverage](https://img.shields.io/codecov/c/github/cyseria/cherry-cherry.svg?style=flat-square)](https://codecov.io/github/cyseria/cherry-cherry?branch=master)
[![NPM version](https://img.shields.io/npm/v/cherry-cherry.svg?style=flat-square)](https://www.npmjs.com/package/cherry-cherry)
[![NPM Downloads](https://img.shields.io/npm/dm/cherry-cherry.svg?style=flat-square&maxAge=43200)](https://www.npmjs.com/package/cherry-cherry)

一个脚手架市场命令行版:
- 集成主流的脚手架, 例如 `vue-cli`, `create-react-app` 等, 直接使用而无需全局安装, 可进行快速测试避免污染环境
- 所有人都可以将自己得意的作品发布到市场中, 无论是 `github` 还是 `gitlab` 或 `iCode` 都能一键上传

全家桶:
- [default server demo](https://github.com/cyseria/cherry-default-server): 一个基于 koa 起的本地服务, 暂时没有上数据库
- [default web demo](https://github.com/cyseria/cherry-default-web): 一个可视化的 web 页面
- server in leanCloud: 基于 leancloud 部署的测试服务

## how to use
脚手架初始化

### 安装
```
sudo npm install cherry -g
```

### 配置项目基础信息
```bash
cherry config set <key> <value>
cherry config list
cherry config delete <key>
```

⚠️ 使用之前需要配置 `github token`, 和 `server` 地址信息

```bash
cherry config set token <your github token>
cherry config set server <your server address>
```

eg. `cherry config set server 'http://localhost:8008/cherry'`


### 初始化

从市场上的脚手架初始化一个项目
```bash
# 初始化项目，支持创建多层级的文件夹 init demo/a/b/c
cherry init [path] [template]
```

对于非内容型脚手架, 我们就不重复造轮子直接使用人家的
例如使用 vue-cli 新建一个项目, 如果本地有 vue-cli 就会走本地, 没有会先在项目目录里面新建一个(嗯不用污染全局)

```bash
# eg. cherry init demo vue
cherry init [path] [cli]
```

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

### 删除自己的脚手架
```bash
cherry unpublish <name>
```

### 推荐官方的脚手架
对于一些官方已经集成的脚手架, 为了避免重复造轮子, cherry 只是维护一份 list 做了个转发功能, 目前有的 list

-[x] [vue-cli](https://github.com/vuejs/vue-cli/tree/master)  (`cherry init [projenct-name] vue`)
-[x] [create-react-app](https://github.com/facebook/create-react-app) (`cherry init [projenct-name] create-react-app`)
-[ ] [edam](https://imcuttle.github.io/edam/index_zh)

## FEATURE

- `cherry login`
- `cherry search <tag>`
- `cherry server switch`

## 十万个为什么

### 为什么要叫 cherry-cherry?
想着起这轮子的时候刚好在吃，觉得这单词很可爱 😀

然而 `npm` 上的 `cherry` 已经被人占坑的, 为了方便记忆(懒得想名), 就变成了 `cherry-cherry`

### 为什么要造这么一个东西?

对于大多自己做的简易业务, 我们可能直接用一些官方的脚手架, 例如 `vue-cli`, `create-react-app` 等就可以, 但是对于一些复杂点的或者公司定制需求的业务, 可能需要改一些配置才能开工. 例如使用 `less` 还是 `sass`, 使用单个入口还是多个入口, 打包成一个页面还是多个页面, 产出是否要区分 `QA/RD/ONLINE` 等环境, 总有一些原因现有的和想要的并不一样.

一种解决方案就是提供一个大而全的脚手架, 写各种配置甚至提供可视化编辑配置项的工具, 再根据配置生成一个模版. 这样子新手基本可以拆箱即用, 碰到问题有经验人士则去更新维护脚手架.

但是很多时候我们到底需要什么, 有多少特殊的场景, 随着需求变更时代变化谁也不清楚.

再有各种不同的方案, `vue` 我们会维护一套, `react` 会维护一套, 内部还有用 `riot` 的, 还有启简单应用用 `parcel`... 如果脚手架出问题, 造轮子的人不一定有空, 这时候谁来修复又是一个问题.

以及每个人多多少少都有自己不同的习惯, 例如有些人喜欢用 `mobx`, 有些人喜欢用 `redux`, 团队可以又规范, 但是对于自己折腾的项目, 少部分人会从 0 开始搭建, 大部分可能也是从 `github` 等地方找个 `xxx-todo-demo` 复制粘贴, 但是由于代码质量参差不齐, 项目架构多少也不一样, 通常需要一定的尝试才能找到自己心动的一款. 那么下一次, 下一个人, 可能又要重复这个工作.

所以一种退而求次的方案, 把大家认可的开源的项目, 自己内部造的好用的脚手架甚至推荐的项目都存储起来, 下次直接使用或者参考使用, 而不是全靠手动复制粘贴改改改. 对于想尝试学习新东西的人, 也能稍微有一定可参考的地方.

最佳实践要有, 但是最佳实践做出来了, 如何让其他人知道并使用. 经常碰到一个人辛辛苦苦写了一堆跟大家推荐一番, 也没人仔细听或者听过也忘了. 过了几个月碰到相似的需求又自己查了一堆资料写了一个相似的东西, 甚至根本不记得旁边的同事就写过可以去吸取点经验.

这时候就很需要一个平台去帮忙收集整理我们认可的推荐的产物, 方便自己下一次或者其他人第一次使用.

最后, 希望大家都有 **造轮子的能力和不造轮子的觉悟**.

### 为什么要使用 cherry 而不是市面上常见的脚手架例如 vue-cli, create-react-app 等?
有时候我们可能不一定要全局安装 `xxx-cli`, 或者某些情况下我们没有办法进行全局的安装或者不想全局安装, 所以采用这种方式比运行 `./node_modules/.bin/xxx init` 会稍微快一点.

### 为什么要配置 github token 和 server
github token 是用于获取 github 项目信息的, 主要是在 publish github 项目的时候使用, 未来可以考虑建立一个公用只读 token.

server 主要是用来获取服务端数据, 履行 cli 单一职责的任务. 至于 web 和 server 是否拆分又是另外一个话题了 :)



