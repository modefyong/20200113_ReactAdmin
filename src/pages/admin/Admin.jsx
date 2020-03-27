import React, { Component } from 'react'
// 跳转页面使用
import {Redirect} from 'react-router-dom'
import { Layout } from 'antd';

import memoryUtils from '../../utils/memoryUtils'

import Header from '../../components/header'
import LeftNav from '../../components/left-nav'

const { Footer, Sider, Content } = Layout;

/* alt + shift + a  vscode多行注释 */
/* 
后台管理的路由组件
*/
export default class Admin  extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
         const user = memoryUtils.user;
        //  如果内存中没有存储user
        //  if(!user || !user.userId){
        //     //自动跳转到登录界面（在render函数里面跳转使用redirect）
        //     return <Redirect to='/login'/> 
        //  }
        return (
            <Layout style={{ height: "100%" }}>
            <Sider>
                <LeftNav />
            </Sider>
            <Layout>
              <Header>Header</Header>
              <Content>Content</Content>
              <Footer>Footer</Footer>
            </Layout>
          </Layout>
        )
    }
}