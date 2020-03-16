## Angular2

### 接入webpack

由于 Angular2 应用采用 TypeScript 开发，构建和前面讲过的(3.2 使用 TypeScript 语言 类似，不同在于 tsconfig.json 配置。 由于 Angular2 项目中采用了注解的语法，而且 @angular/platform-browser 源码中有许多 DOM 操作，配置需要修改为如下：

```bash
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "sourceMap": true,
    // 开启对 注解 的支持
    "experimentalDecorators": true,
    // Angular2 依赖新的 JavaScript API 和 DOM 操作
    "lib": [
      "es2015",
      "dom"
    ]
  },
  "exclude": [
    "node_modules/*"
  ]
}
```