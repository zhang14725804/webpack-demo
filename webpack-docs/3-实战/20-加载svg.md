## 加载svg

可以直接把 SVG 文件当成一张图片来使用，方法和使用图片时完全一样。 所以在 3-19 加载图片 中介绍的两种方法 **使用 file-loader** 和 **使用 url-loader** 对 SVG 来说同样有效，只需要把 Loader test 配置中的文件后缀改成 .svg，代码如下：
```bash
module.exports = {
  module: {
    rules: [
      {
        test: /\.svg/,
        use: ['file-loader']
      }
    ]
  },
};
```

### 使用raw-loader

raw-loader 可以把文本文件的内容读取出来，注入到 JavaScript 或 CSS 中去

使用 raw-loader 时相关的 Webpack 配置如下：
```bash
module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['raw-loader']
      }
    ]
  }
};
```
    由于 raw-loader 会直接返回 SVG 的文本内容，并且无法通过 CSS 去展示 SVG 的文本内容，因此采用本方法后无法在 CSS 中导入 SVG。 也就是说在 CSS 中不可以出现 background-image: url(./svgs/activity.svg) 这样的代码，因为 background-image: url(<svg>...</svg>) 是不合法的。

### 使用 svg-inline-loader

svg-inline-loader 和上面提到的 raw-loader 非常相似， 不同在于 svg-inline-loader 会分析 SVG 的内容，去除其中不必要的部分代码，以减少 SVG 的文件大小。

在使用画图工具如 Adobe Illustrator、Sketch 制作 SVG 后，在导出时这些工具会生成对网页运行来说不必要的代码。 

也就是说 svg-inline-loader 增加了对 SVG 的压缩功能。使用 svg-inline-loader 时相关的 Webpack 配置如下：
```bash
module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['svg-inline-loader']
      }
    ]
  }
};
```