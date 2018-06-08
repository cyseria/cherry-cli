# cherry scaffold

一个有评审的内部脚手架市场。

根据 gallery 里面的 md 生成 html

## how to use
脚手架初始化（还没发布，暂时用 `node ./bin/cherry.js init [path]` 替代）

```
npm install cherry -g
cherry init [path]
```

## how to develop

### 💪 待集成进工作流中

首先为 脚手架 们生成一个 config（需要有 readme.md）
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

## 😄
- 支持创建多层级的文件夹
init demo/a/b/c