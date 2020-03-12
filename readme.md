### 项目来源

[深入浅出webpack](https://webpack.wuhaolin.cn/)

[阮一峰webpack-demo](https://github.com/ruanyf/webpack-demos)

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
