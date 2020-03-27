import React, {Component} from 'react'

import './index.less'
import logo from '../../assets/images/UI.png'

// 左侧导航组件
export default class leftNav extends Component {
    render(){
        return (
            <div className="left-nav">
                <header className="left-nav-header">
                    <img src={logo} alt="logo"/>
                    <h1>系统后台</h1>
                </header>
            </div>
        )
    }
}