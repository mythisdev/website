---
title: "Reactotron"
category: "App開發"
cover: coding.jpg
tags: ["React","React native", "Debug"]
author: Horst Leung
---
![Coding](./coding.jpg)

如果大家想在本機開發React native的app，在Debug run 的時候有個很好用的工具，就是[Reactotron](https://github.com/infinitered/reactotron)。

###Installation
先[到此](https://github.com/infinitered/reactotron/releases)安裝程式，
再到你React native的目錄安裝reactotron-react-native: 
`yarn add -D reactotron-react-native`

再在Project folder 開一個`ReactotronConfig.js`的files

```javascript
import Reactotron from 'reactotron-react-native'

const middleware = (tron) => { /* plugin definition */ };

Reactotron
  .configure({
    name: "React Native Demo"
  })
  .useReactNative() // add all built-in react native plugins
  .use(middleware) // 這句看你用不用它的plugin，不用的話可以不加這行
  .connect();
```

最後在`index.js`最上的一行加上
```javascript
if(__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}
```

這樣就好了

###FYI － redux 的middleware
如果你有用Redux，Reactotron亦有提供[middleware](https://github.com/infinitered/reactotron/blob/master/docs/plugin-redux.md)給你使用

###用處
我自己是用Reactotron來看看network request，看看header加齊了沒有，看看Cookie在不在