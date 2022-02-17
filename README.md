
# 安装和启动项目

安装依赖
```html
npm install 
```
打包
```html
npm run build
```
启动项目
```html
npm run serve
```

# 实现步骤

1.使用 koa 渲染一段最基本的服务端渲染

- 渲染一段 html
- 在 html 中引入一个 script 表示执行端打包的文件

2.打包客户端文件

- 新建客户端的入口文件
- 新建 shared 下 App.tsx 用来同构
- 配置 webpack 打包客户端的文件，打包生成 bundle.js
    - 配置文件扩展名
    - extensions: ['.tsx', '.ts', '.js', '.json'] 
    - 配置 babel-loader
        - @babel/code
        - @babel/preset-react
        - @babel/preset-typeScript
        - @babel/plugin-proposal-class-properties（可选）
    - 配置 npm run build:client 打包客户端
    
3.配置一个静态资源服务器

- 使用 koa-static
- 配置到 public 文件夹

4.配置 server 端的打包

- 类似于客户端的 webpack 的配置
- 注意 target:node
- webpack-node-externals 避免打包 nodejs api
- 配置 npm run build:server 打包服务端
- 配置 npm-run-all build:* --parallel 批量打包客户端和服务端
- 配置 npm run serve: "cd dist && nodemon ./app.js"

执行 npm run build，执行 npm run serve，既看到页面内容，服务端渲染

5.真正的服务端渲染

- 在 server 端，引入 react-dom/server 下的 renderToString 渲染 app 组件
- 渲染完成之后，放入 id=root 的 div 内容，实现服务器渲染
- 客户端改写 render 为 hydrate 消除警告

--------------

6.前后端路由绑定

- 仿照 react-router 官网，在 App.tsx 创建一个基本的路由
- 安装 react-router-dom
- 直接运行会报错，因为服务器端没有 dom 的，需要进行路由拆分。
- 拆分前端路由 BrowserRouter，后端路由 staticRouter，并分别绑定
- 请求数据之前，需要对路由进行 js 配置
    - 使用 react-router-config 改写路由，使用 renderRoutes 渲染路由
    - 在 app.tsx 中，使用 renderRoutes 去渲染路由
    
7.数据请求

- 安装 @koa/router 将之前的中间件改成对应的路由
- 在服务端新增一个 getData 的接口
- 客户端使用 axios 在 componentDidMount 中请求接口的数据之后渲染页面

7.1 如何不使用 ajax， 让服务端直接将数据绑定好？？？

查看 react-router 官方， 可以看到 server render 的方法

- 再定义的 js 对象路由上，新增一个 loadData 方法，用来提供数据加载
- 在对应的组件上，实现 loadData 方法，去请求数据，并返回Promise
- 后端使用 matchRoutes 匹配到对应的路由，然后判断是否有 loadData
- 后端执行请求即可获得数据，然后将数据渲染到 window 对象上
- 前端在 componentDidMount 里面获取数据即可

7.2 如果一个路由匹配到了多个页面，那么如何进行多级路由匹配到当前的页面

需要借助于 redux

- 安装 redux react-redux
- 新建一个 store/index.tsx
- 定义 reducer，initStore，并调用 createStore 创建 store
- 客户端和服务器端分别提供 createClientStore/createServerStore对应端的数据
- 在两端分别绑定 Provider 传入 store 即可
- 在组件中通过 mapStateToProps 获取 store 中的数据进行渲染

8.改写的后端数据请求

- 在调用组件的 loadData 方法时，将 store 传入
- 在 loadData 执行完之后去触发 store.dispatch 去修改组件
- 在 window 中注入的对象改为 store.getState() 就可以了
- 在客户端 createClientStore 中需要引入 store 的默认项为 window 即可

9.最后一个问题，路由切换的时候数据怎么获取？

- 编写数据为空判断，如果是路由切换，使用ajax渲染即可
- ajax 请求到的数据之后，调用 mapDispatch 方法 改一下 store 即可重新渲染








