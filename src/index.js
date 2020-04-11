// 入口文件
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

import memoryUtils from './utils/memoryUtils'
import storageUtils from './utils/storageUtils'

// 读取local中保存user，保存到内存中
const user = storageUtils.getUser();
memoryUtils.user = user;

// 将App组件标签渲染到index页面的div容器中
ReactDOM.render( < App / > , document.getElementById('root'));