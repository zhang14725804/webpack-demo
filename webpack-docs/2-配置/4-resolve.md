## resolve

Webpack 在启动后会从配置的入口模块出发找出所有依赖的模块，Resolve 配置 Webpack 如何寻找模块所对应的文件。 Webpack 内置 JavaScript 模块化语法解析功能，默认会采用模块化标准里约定好的规则去寻找，但你也可以根据自己的需要修改默认的规则。

- 1、alias

resolve.alias 配置项通过别名来把原导入路径映射成一个新的导入路径。
```bash
// Webpack alias 配置
resolve:{
  alias:{
    components: './src/components/'
  }
}
```
alias 还支持 $ 符号来缩小范围到只命中以关键字结尾的导入语句
```bash
resolve:{
  alias:{
    'react$': '/path/to/react.min.js'
  }
}
```
react$ 只会命中以 react 结尾的导入语句，即只会把 import 'react' 关键字替换成 import '/path/to/react.min.js'

- 2、mainFields

有一些第三方模块会针对不同环境提供几分代码。 例如分别提供采用 ES5 和 ES6 的2份代码，这2份代码的位置写在 package.json 文件里
```bash
{
  "jsnext:main": "es/index.js",// 采用 ES6 语法的代码入口文件
  "main": "lib/index.js" // 采用 ES5 语法的代码入口文件
}
```
Webpack 会根据 mainFields 的配置去决定优先采用那份代码，mainFields 默认如下
```bash
mainFields: ['browser', 'main']
```
Webpack 会按照数组里的顺序去package.json 文件里寻找，只会使用找到的第一个。

假如你想优先采用 ES6 的那份代码，可以这样配置
```bash
mainFields: ['jsnext:main', 'browser', 'main']
```

- 3、extensions（处理默认后缀名）

在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在。 resolve.extensions 用于配置在尝试过程中用到的后缀列表，默认是：
```bash
extensions: ['.js', '.json']
```
也就是说当遇到 require('./data') 这样的导入语句时，Webpack 会先去寻找 ./data.js 文件，如果该文件不存在就去寻找 ./data.json 文件， 如果还是找不到就报错。

假如你想让 Webpack 优先使用目录下的 TypeScript 文件，可以这样配置：
```bash
extensions: ['.ts', '.js', '.json']
```

- 4、modules（处理第三方模块）

resolve.modules 配置 Webpack 去哪些目录下寻找第三方模块，默认是只会去 node_modules 目录下寻找。 有时你的项目里会有一些模块会大量被其它模块依赖和导入，由于其它模块的位置分布不定，针对不同的文件都要去计算被导入模块文件的相对路径， 这个路径有时候会很长，就像这样 import '../../../components/button' 这时你可以利用 modules 配置项优化，假如那些被大量导入的模块都在 ./src/components 目录下，把 modules 配置成后，你可以简单通过 import 'button' 导入
```bash
modules:['./src/components','node_modules']
```

- 5、descriptionFiles

resolve.descriptionFiles 配置描述第三方模块的文件名称，也就是 package.json 文件。默认如下：
```bash
descriptionFiles: ['package.json']
```

- 6、enforceExtension（必须带后缀名）

resolve.enforceExtension 如果配置为 true 所有导入语句都必须要带文件后缀， 例如开启前 import './foo' 能正常工作，开启后就必须写成 import './foo.js'。

- 7、enforceModuleExtension（第三方模块后缀名问题）

enforceModuleExtension 和 enforceExtension 作用类似，但 enforceModuleExtension 只对 node_modules 下的模块生效。 enforceModuleExtension 通常搭配 enforceExtension 使用，在 enforceExtension:true 时，因为安装的第三方模块中大多数导入语句没带文件后缀， 所以这时通过配置 enforceModuleExtension:false 来兼容第三方模块。