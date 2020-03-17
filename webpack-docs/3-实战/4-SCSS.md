## 使用SCSS

SCSS 又叫 SASS，区别在于 SASS 语法类似 Ruby，而 SCSS 语法类似 CSS，对于熟悉 CSS 的前端工程师来说会更喜欢 SCSS。

SCSS 官方提供了多种语言实现的编译器，由于本书更倾向于前端工程师使用的技术栈，所以主要来介绍下 node-sass。

node-sass 核心模块是由 C++ 编写，再用 Node.js 封装了一层，以供给其它 Node.js 调用。 node-sass 还支持通过命令行调用，先安装它到全局：

    npm i -g node-sass
    # 把 main.scss 源文件编译成 main.css
    node-sass main.scss main.css

### 接入webpack

由于需要把 SCSS 源代码转换成 CSS 代码，在1-4 使用Loader中曾介绍过转换文件最适合的方式是使用 **Loader**，Webpack 官方提供了对应的 sass-loader。

Webpack 接入 sass-loader 相关配置如下：

```bash
module.exports = {
  module: {
    rules: [
      {
        // 增加对 SCSS 文件的支持
        test: /\.scss$/,
        // SCSS 文件的处理顺序为先 sass-loader 再 css-loader 再 style-loader
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ]
  },
};
```

以上配置通过正则 /\.scss$/ 匹配所有以 .scss 为后缀的 SCSS 文件，再分别使用3个 Loader 去处理。具体处理流程如下：

- 通过 sass-loader 把 SCSS 源码转换为 CSS 代码，再把 CSS 代码交给 css-loader 去处理。
- css-loader 会找出 CSS 代码中的 @import 和 url() 这样的导入语句，告诉 Webpack 依赖这些资源。同时还支持 CSS Modules、压缩 CSS 等功能。处理完后再把结果交给 style-loader 去处理。
- style-loader 会把 CSS 代码转换成字符串后，注入到 JavaScript 代码中去，通过 JavaScript 去给 DOM 增加样式。如果你想把 CSS 代码提取到一个单独的文件而不是和 JavaScript 混在一起，可以使用1-5 使用Plugin 中介绍过的 ExtractTextPlugin。

由于接入 sass-loader，项目需要安装这些新的依赖：

    # 安装 Webpack Loader 依赖
    npm i -D  sass-loader css-loader style-loader
    # sass-loader 依赖 node-sass
    npm i -D node-sass