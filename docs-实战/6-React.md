## React

目前 Babel 和 TypeScript 都提供了对 React 语法的支持，下面分别来介绍如何在使用 Babel 或 TypeScript 的项目中接入 React 框架。

### React与Babel

加入 React 所依赖的 Presets babel-preset-react。 接下来通过修改前面讲过的3-1 使用 ES6 语言中的项目，为其接入 React 框架

    # 安装 React 基础依赖
    npm i -D react react-dom
    # 安装 babel 完成语法转换所需依赖
    npm i -D babel-preset-react

安装新的依赖后，再修改 .babelrc 配置文件加入 React Presets

    "presets": [
        "react"
    ]


### React与TypeScript

TypeScript 相比于 Babel 的优点在于它原生支持 JSX 语法，你不需要重新安装新的依赖，只需修改一行配置。 但 TypeScript 的不同在于：

- 使用了 JSX 语法的文件后缀必须是 tsx。
- 由于 React 不是采用 TypeScript 编写的，需要安装 react 和 react-dom 对应的 TypeScript 接口描述模块 @types/react 和 @types/react-dom 后才能通过编译。

接下来通过修改3-2 使用 TypeScript 语言中讲过的的项目，为其接入 React 框架。 修改 TypeScript 编译器配置文件 tsconfig.json 增加对 JSX 语法的支持

    {
        "compilerOptions": {
            "jsx": "react" // 开启 jsx ，支持 React
        }
    }

webpack配置如下

```bash
const path = require('path');

module.exports = {
  // TS 执行入口文件
  entry: './main',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    // 先尝试 ts，tsx 后缀的 TypeScript 源码文件 
    extensions: ['.ts', '.tsx', '.js',] 
  },
  module: {
    rules: [
      {
        // 同时匹配 ts，tsx 后缀的 TypeScript 源码文件 
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  devtool: 'source-map',// 输出 Source Map 方便在浏览器里调试 TypeScript 代码
};
```

    npm i react react-dom @types/react @types/react-dom