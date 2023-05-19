
一个简约风格的网址导航页，借鉴了[0x3](https://0x3.com/)。

![Snipaste_2023-05-08_09-15-08](https://static.bchend.cn/blog/Snipaste_2023-05-08_09-15-08.png)

<p align='center'>
<a href="https://moon-start.netlify.app/">在线演示</a>
</p>

## TODO

- 搜索词联想

- 设置项完善

- 移动端适配

- 后端服务

  - 获取 favicon

  - 同步数据

- 更多...

## 说明

当前项目暂未开发后端服务模块，获取网站favicon的接口调用了[一为API](https://api.iowen.cn/)。

## 运行

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

该插件适用于谷歌浏览器，可以在新建标签页时自动进入[Moon](https://moon-start.netlify.app/)。

该插件暂未在Chrome应用商店发布，若要使用，请按照以下步骤：

1. 解压本项目下`extension/moon-chrome-extension.zip'`。

2. 在谷歌浏览器的扩展程序界面，打开右上角的`开发者模式`。

3. 点击左上角`加载已解压的扩展程序`。

4. 选择刚刚解压的`moon-chrome-extension`目录。
