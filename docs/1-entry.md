## 第二章 配置

### 1、entry
- （1）entry

entry是配置模块的入口，可抽象成输入，Webpack 执行构建的第一步将从入口开始搜寻及递归解析出所有入口依赖的模块。

- （2）context

Webpack 在寻找相对路径的文件时会以 context 为根目录，context 默认为执行启动 Webpack 时所在的当前工作目录。

注意， context 必须是一个绝对路径的字符串。 除此之外，还可以通过在启动 Webpack 时带上参数 webpack --context 来设置 context。

Entry 的路径和其依赖的模块的路径可能采用相对于 context 的路径来描述，context 会影响到这些相对路径所指向的真实文件。

问题：配置context之后出现ERROR in Entry module not found: Error: Can't resolve './src' in 'E:\webpack-demo',需要配置package.json

```bash
    "scripts": {
		"build": "webpack-dev-server --hot --devtool source-map --config config/webpack.dev.config.js"
	}
```

- （3）entry类型

string，array，object

- （4）chunk名称

chunk名称和entry配置类型有关

- （5）配置动态entry

假如项目里有多个页面需要为每个页面的入口配置一个 Entry ，但这些页面的数量可能会不断增长，则这时 Entry 的配置会受到到其他因素的影响导致不能写成静态的值。其解决方法是把 Entry 设置成一个函数去动态返回上面所说的配置

