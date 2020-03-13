const path = require('path');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    context:path.resolve(__dirname, '../'),
    // JavaScript 执行入口文件
    entry: './main.js',
    output: {
        // 把所有依赖的模块合并输出到一个 bundle.js 文件
        filename: 'bundle.js',
        // 输出文件都放到 dist 目录下
        path: path.resolve(__dirname, './dist'),
    },
    module:{
        // 告诉 Webpack 在遇到哪些文件时使用哪些 Loader 去加载和转换。
        rules: [
            {
                // 用正则去匹配要用该 loader 转换的 CSS 文件
                test: /\.css$/,
                use: [
                    miniCssExtractPlugin.loader,
                    // 转换 .css 文件需要使用的 Loader
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new miniCssExtractPlugin({
            // 从 .js 文件中提取出来的 .css 文件的名称
            filename: `[name]_[contenthash:8].css`,
        }),
    ]
};