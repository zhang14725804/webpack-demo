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


### 使用Plugin

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