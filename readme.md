# cherry scaffold

一个有评审的内部脚手架市场。

## Why Cherry
想着起这轮子的时候刚好在吃，而且觉得这单词很可爱呀 😀

## how to use
脚手架初始化（还没发布，暂时用 `node ./bin/cherry.js init [path]` 替代）

```
npm install cherry -g
cherry init [path]
```
## 脚本相关
> cherry 的一些相关命令说明

```bash
# 初始化项目，支持创建多层级的文件夹 init demo/a/b/c
cherry init [path]
# 发布自己的项目
cherry publish [url]
eg. cherry publish http://xxx
拉项目的 .cherry.config 信息 或者 readme 的头部（一定规范）
# 查找
cherry search [tag]

# 使用主题
cherry set theme
# server?
部署到自己的服务器
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
