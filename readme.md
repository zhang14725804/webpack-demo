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

修改webpack.config.js

    module.exports = {
    // JavaScript 执行入口文件
    entry: './main.js',
    output: {
        // 把所有依赖的模块合并输出到一个 bundle.js 文件
        filename: 'bundle.js',
        // 输出文件都放到 dist 目录下
        path: path.resolve(__dirname, './dist'),
    },
    module: {
        rules: [
        {
            // 用正则去匹配要用该 loader 转换的 CSS 文件
            test: /\.css$/,
            // 'css-loader?minimize' 这么写会报错
            use: ['style-loader', 'css-loader'],
        }
        ]
    }
    };