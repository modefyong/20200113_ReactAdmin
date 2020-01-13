import React, { Component } from 'react'

import { Button, message } from 'antd';

/*
应用的根组件
*/
export default class App extends Component {
    render() {
        return <Button type="primary" onClick={ this.handleClick }>Primary</Button>
    }
    handleClick = () => {
        message.success('success!');
    }
}