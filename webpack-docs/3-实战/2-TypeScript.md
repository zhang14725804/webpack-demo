## 使用TypeScript语言

TypeScript 是 JavaScript 的一个超集，主要提供了类型检查系统和对 ES6 语法的支持，但不支持新的 API。 目前没有任何环境支持运行原生的 TypeScript 代码，必须通过构建把它转换成 JavaScript 代码后才能运行。

TypeScript 官方提供了能把 TypeScript 转换成 JavaScript 的编译器。 你需要在当前项目根目录下新建一个用于配置编译选项的 tsconfig.json 文件，编译器默认会读取和使用这个文件，配置文件内容大致如下：

```bash
{
  "compilerOptions": {
    "module": "commonjs", // 编译出的代码采用的模块规范
    "target": "es5", // 编译出的代码采用 ES 的哪个版本
    "sourceMap": true // 输出 Source Map 方便调试
  },
  "exclude": [ // 不编译这些目录里的文件
    "node_modules"
  ]
}
```

通过 npm install -g typescript 安装编译器到全局后，你可以通过 tsc hello.ts 命令编译出 hello.js 和 hello.js.map 文件。

### 减少代码冗余

TypeScript 编译器会有和在 3-1 使用ES6语言中 Babel 一样的问题：在把 ES6 语法转换成 ES5 语法时需要注入辅助函数， 为了不让同样的辅助函数重复的出现在多个文件中，可以开启 TypeScript 编译器的 importHelpers 选项，修改 tsconfig.json 文件如下：

    {
        "compilerOptions": {
            "importHelpers": true
        }
    }

### 集成webpack

要让 Webpack 支持 TypeScript，需要解决以下2个问题：

- 通过 Loader 把 TypeScript 转换成 JavaScript。
- Webpack 在寻找模块对应的文件时需要尝试 ts 后缀。

对于问题1，社区已经出现了几个可用的 Loader，推荐速度更快的 awesome-typescript-loader。 对于问题2，根据2-4 Resolve 中的 extensions 我们需要修改默认的 resolve.extensions 配置项。

```bash
const path = require('path');

module.exports = {
  // 执行入口文件
  entry: './main',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    // 先尝试 ts 后缀的 TypeScript 源码文件
    extensions: ['.ts', '.js'] 
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  devtool: 'source-map',// 输出 Source Map 方便在浏览器里调试 TypeScript 代码
};
```

在运行构建前需要安装上面用到的依赖：npm i -D typescript awesome-typescript-loader

安装成功后重新执行构建，你将会在 dist 目录看到输出的 JavaScript 文件 bundle.js，和对应的 Source Map 文件 bundle.js.map。 在浏览器里打开 index.html 页面后，来开发工具里可以看到和调试用 TypeScript 编写的源码。