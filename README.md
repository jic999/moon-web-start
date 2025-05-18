
# Moon Web Start

<p align="center">
  <a href="https://github.com/jic999/sprout-admin-api">
    <img alt="Moon Web Start" width="200" src="./public/favicon_neutral.svg">
  </a>
</p>
<p align="center">
  <a href="./LICENSE"><img alt="MIT License" src="https://badgen.net/github/license/jic999/moon-web-start"/></a>
  <a href="https://github.com/antfu/eslint-config"><img alt="MIT License" src="https://antfu.me/badge-code-style.svg"/></a>
</p>
<p align="center">
  <a href="https://start.heroism.me/">在线体验</a>
</p>
<p align="center">
  <span>简体中文</span> |
  <a href="./README.en.md">English</a>
</p>

## 2024-11-10

大概一两周前，原来用的 Favicon 接口挂了。好吧，我早料到有这么一天，所以提前想好了方案。

后端项目在 server 目录下，使用 koa 编写。主要包括获取 favicon 和同步数据两个功能，我尝试尽可能让一切保持简单。

获取网站 favicon 一般有两种方式，自己爬取，或调第三方接口。

为了节约资源 + 偷懒（🤣），本项目目前使用了 google 的开放接口：

```bash
https://www.google.com/s2/favicons?domain=${domain}&sz=${size}
```
该接口在国内无法访问，需要自己配代理，或使用香港或海外服务器部署。由于跨域限制，该接口无法直接在前端调用。

当然，后面也会实现自动爬取 favicon 的方案。

顺便提一下，[0x3]((https://0x3.com/)) 的接口可以在国内访问，也没有跨域限制。条件不允许的同学可以先在后端项目中把接口换成这个，这样第一次获取时会从 0x3 获取，后面会走自己的服务，不建议在前端直接调。

```bash
https://0x3.com/icon?host=${domain}
```
### 部署

```
cd moon-web-start

npm i -g pnpm pm2

pnpm prod
```

## 介绍

一个简约风格的网址导航页，基于 [MIT](./LICENSE) 协议开源。你可以直接使用它，也可以在此基础上客制化自己的网址导航😊。

![](https://cdn.jsdelivr.net/gh/jic999/images/blog/20231016102939.png)

## 特性

- ⚡ 高效导航 - 极简样式，快速访问

- 🍎 从心所欲 - 完全自由地增删改网站，支持自定义网站图标

- 🛫 拖拽排序 - 快速调整网站顺序

- 🔍 搜索词联想 - 支持必应、谷歌、百度等多个搜索引擎

- 📱 响应式布局 - 可在任意尺寸的设备上正常显示

- 🎨 主题切换 - 内置多种主题样式，可自由切换

- 🌙 夜间模式 - 爱护你的双眼

- 🌍 I18n - 支持简体中文、英文和日文

- 📤 导入/导出数据 - 在不同设备间同步数据

- 📦 浏览器插件 - 新建标签页时打开 [Moon](https://start.heroism.me/)

- 🚀 容器化部署 - 支持 Docker 一键部署


## TODO

- 后端服务

  - 获取 favicon

  - 同步数据

- 更多...

## 快速开始

克隆仓库
```bash
git clone https://github.com/jic999/moon-web-start.git
```

进入目录
```bash
cd moon-web-start
```

安装依赖
```bash
pnpm install
```

启动项目
```bash
pnpm dev
```

## Docker 部署

获取 favicon 默认调用 `google` 接口，国内环境可以将 `FAVICON_API` 环境变量设置为 `0x3`。这样第一次会从 [0x3](https://0x3.com/) 获取，后面会走自己的服务。

```bash
docker run -d --name moon-web-start \
  -p 1890:1890 \
  -e FAVICON_API=0x3 \
  jic999/moon-web-start:latest
```

## 浏览器插件

插件适用于谷歌浏览器，可以在新建标签页时自动进入[Moon](https://start.heroism.me/)。

该插件暂未在Chrome应用商店发布，若要使用，请按照以下步骤：

1. 解压本项目下`extension/moon-chrome-extension.zip'`。

2. 在谷歌浏览器的扩展程序界面，打开右上角的`开发者模式`。

3. 点击左上角`加载已解压的扩展程序`。

4. 选择刚刚解压的`moon-chrome-extension`目录。

## 感谢

- [一为API](https://api.iowen.cn/)，提供了免费获取网站favicon的开放接口。

- [0x3](https://0x3.com/)，带给我灵感。
