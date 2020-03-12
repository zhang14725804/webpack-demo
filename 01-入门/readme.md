### 项目来源

[深入浅出webpack](https://webpack.wuhaolin.cn/)

[阮一峰webpack-demo](https://github.com/ruanyf/webpack-demos)
### 0-1 前端的发展

- 模块化（jQuery，Zepto）
- CommonJS（nodejs）
- AMD（requirejs）
- ES6模块化
- 样式中的模块化

- 三大框架（React,Vue,Angular）
- ES6
- TypeScript

### 0-2 常见的构建工具

构建要做的事：

    代码转换：TypeScript 编译成 JavaScript、SCSS 编译成 CSS 等。
    文件优化：压缩 JavaScript、CSS、HTML 代码，压缩合并图片等。
    代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载。
    模块合并：在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类合并成一个文件。
    自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器。
    代码校验：在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过。
    自动发布：更新完代码后，自动构建出线上发布代码并传输给发布系统。

常见构建工具

- npm script
- Grunt
- Gulp
- Fis3
- webpack
- Rollup
- make（Makefile），也可以

### 1、开始

    新建目录 
    npm init
    npm i -D webpack webpack-cli

package.json增加如下代码

    "scripts": {
        "build": "webpack"
    }

运行 npm run-script build（npm run build）

多出一个dist目录和bundle.js文件，初步完成大业！！！

### 2、使用Loader

Loader 可以看作具有文件转换功能的翻译员，配置里的 module.rules 数组配置了一组规则，告诉 Webpack 在遇到哪些文件时使用哪些 Loader 去加载和转换。 如上配置告诉 Webpack 在遇到以 .css 结尾的文件时先使用 css-loader 读取 CSS 文件，再交给 style-loader 把 CSS 内容注入到 JavaScript 里。 在配置 Loader 时需要注意的是：

- use 属性的值需要是一个由 Loader 名称组成的数组，Loader 的执行顺序是由后到前的；

- 每一个 Loader 都可以通过 URL querystring 的方式传入参数，例如 css-loader?minimize 中的 minimize 告诉 css-loader 要开启 CSS 压缩。

除了在 webpack.config.js 配置文件中配置 Loader 外，还可以在源码中指定用什么 Loader 去处理文件。(还有这这种骚操作)

    require('style-loader!css-loader?minimize!./main.css');

npm i -D style-loader css-loader

bundle.js 文件被更新了，里面注入了在 main.css 中写的 CSS，而不是会额外生成一个 CSS 文件


### 3、使用Plugin

    npm i -D extract-text-webpack-plugin

通过 Plugin 把注入到 bundle.js 文件里的 CSS 提取到单独的文件中


插件按版本问题导致错误（extract-text-webpack-plugin目前版本不支持webpack4）：：
    
    DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead extract-text-webpack-plugin

安装最新版本

    npm install extract-text-webpack-plugin@next

还是报错：：

    Path variable [contenthash:8] not implemented in this context: [name]_[contenthash:8].css

webpack4中，使用mini-css-extract-plugin代替extract-text-webpack-plugin

    cnpm i mini-css-extract-plugin -D

### 4、使用 DevServer

    （1）提供 HTTP 服务而不是使用本地文件预览（实时预览）,问题来了（todos：：为什么css样式不热更新）；
    （2）监听文件的变化并自动刷新网页，做到实时预览（热更新）；
    （3）支持 Source Map，以方便调试（生成源码以供调试）。

    npm i -D webpack-dev-server

### 5、webpack核心概念

- Entry：入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
- Module：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
- Chunk：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。
- Loader：模块转换器，用于把模块原内容按照需求转换成新内容。
- Plugin：扩展插件，在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情。
- Output：输出结果，在 Webpack 经过一系列处理并得出最终想要的代码后输出结果。

webpack整个流程：

Webpack 启动后会从 Entry 里配置的 Module 开始递归解析 Entry 依赖的所有 Module。 

每找到一个 Module， 就会根据配置的 Loader 去找出对应的转换规则，对 Module 进行转换后，再解析出当前 Module 依赖的 Module。 

这些模块会以 Entry 为单位进行分组，一个 Entry 和其所有依赖的 Module 被分到一个组也就是一个 Chunk。

最后 Webpack 会把所有 Chunk 转换成文件输出。 在整个流程中 Webpack 会在恰当的时机执行 Plugin 里定义的逻辑。
