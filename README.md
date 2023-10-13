
# Moon Web Start

<p align="center">
  <a href="https://github.com/jic999/sprout-admin-api">
    <img alt="Sprout Admin" width="200" src="./public/favicon_neutral.svg">
  </a>
</p>
<p align="center">
  <a href="./LICENSE"><img alt="MIT License" src="https://badgen.net/github/license/jic999/moon-web-start"/></a>
  <a href="https://github.com/antfu/eslint-config"><img alt="MIT License" src="https://antfu.me/badge-code-style.svg"/></a>
</p>
<p align="center">
  <a href="https://moon-start.netlify.app/">在线体验</a>
</p>

## 介绍

一个简约风格的网址导航页，基于 [MIT](./LICENSE) 协议开源。你可以直接使用它，也可以在此基础上客制化自己的网址导航😊。

![Snipaste_2023-05-08_09-15-08](https://cdn.jsdelivr.net/gh/jic999/images/blog/Snip_2023-09-20_21-25-04.png)

## 特性

- ⚡ 高效导航 - 极简样式，快速访问

- 🍎 从心所欲 - 完全自由地增删改网站，支持自定义网站图标

- 🛫 拖拽排序 - 快速调整网站顺序

- 🔍 搜索词联想 - 支持必应、谷歌、百度等多个搜索引擎

- 📱 响应式布局 - 可在任意尺寸的设备上正常显示

- 🎨 主题切换 - 内置多种主题样式，可自由切换

- 🌙 夜间模式 - 爱护你的双眼

- 📤 导入/导出数据 - 在不同设备间同步数据

- 📦 浏览器插件 - 新建标签页时打开 [Moon](https://moon-start.netlify.app/)


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

## 浏览器插件

插件适用于谷歌浏览器，可以在新建标签页时自动进入[Moon](https://moon-start.netlify.app/)。

该插件暂未在Chrome应用商店发布，若要使用，请按照以下步骤：

1. 解压本项目下`extension/moon-chrome-extension.zip'`。

2. 在谷歌浏览器的扩展程序界面，打开右上角的`开发者模式`。

3. 点击左上角`加载已解压的扩展程序`。

4. 选择刚刚解压的`moon-chrome-extension`目录。

## 感谢

- [一为API](https://api.iowen.cn/)，提供了免费获取网站favicon的开放接口。

- [0x3](https://0x3.com/)，带给我灵感。