---
title: "在VSCode設定yarn的debug環景"
category: "網頁開發"
cover: coding.jpg
tags: ["網頁開發", "NodeJs", "config"]
author: Horst Leung
---
![Coding](./coding.jpg)

上次在[React Native setup](/React-native-project-setup/)中寫過有關VSCode中**Debug**的設定，今次簡單的寫一寫Node js 的Debug設定。

###沒有Project的小伙伴可以先創一個`index.js`
```javascript
var http = require('http')

http.createServer(onRequest).listen(8888);
console.log('Server has started');

function onRequest(request, response){
  response.writeHead(200);
  response.write('Hello World');
  response.end();
}
```

然後再在`package.json`加入
```javascript
{
    ...
    "scripts": {
        "start": "node index.js",
        ...
    },
    ...
}
```
之後就可以使用`yarn start`去運行了


###還記得那個`.vscode/.launch.json`嗎？
上次是generate的，今次要手打了
```javascript
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch via Yarn",
            "runtimeExecutable": "yarn",
            "cwd": "${workspaceFolder}",
            "runtimeArgs": [
                "start"
            ],
        }
    ]
}
```
到了這，也差不多了，不過還沒可以attach到node proccess。

###修改你的`package.json`
我們要把`package.json`中的scripts改一下, 原來的:
```javascript
{
    ...
    "scripts": {
        "start": "node index.js",
        ...
    },
    ...
}
```
改成:
```javascript
{
    ...
    "scripts": {
        "start": "node --nolazy --inspect-brk=9229 index.js",
        ...
    },
    ...
}
```
當中的flag `--inspect-brk=9229`是
> Enable inspector agent
> Bind to address or hostname host (default: 127.0.0.1)
> Listen on port port (default: 9229)
> Break before user code starts
在我們這就是我們的debugger開在localhost:9229, 自己去attach吧！

所以我們要修改一下`.vscode/launch.json`, 加入`ports`
```javascript
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch via Yarn",
            "runtimeExecutable": "yarn",
            "cwd": "${workspaceFolder}",
            "runtimeArgs": [
                "start"
            ],
            "port": 9229
        }
    ]
}
```

搞掂

###如果你是使用`create-react-app`(CRA)做frontend
忘記以上的setting, 直接點就可以了
```
{
    "version": "0.2.0",
    "configurations": [
      {
        "name": "Chrome",
        "type": "chrome",
        "request": "launch",
        "url": "http://localhost:3000",
        "webRoot": "${workspaceFolder}/src",
        "sourceMapPathOverrides": {
          "webpack:///src/*": "${webRoot}/*"
        }
      }
    ]
  }
```