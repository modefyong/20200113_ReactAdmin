import React, { Component } from 'react'

import './login.less'

// 登陆的路由组件
export default class Login  extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="login">
                <header className="login-header"></header>
                <section className="login-content"></section>
            </div>
        )
    }
}