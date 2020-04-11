import React, { Component } from 'react'
// 跳转页面使用
import {Redirect, Route, Switch} from 'react-router-dom'
import { Layout } from 'antd';

import memoryUtils from '../../utils/memoryUtils'

import Header from '../../components/header'
import LeftNav from '../../components/left-nav'

import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import User from '../user/user'
import Role from '../role/role'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'

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
         if(!user || !user.userId){
            //自动跳转到登录界面（在render函数里面跳转使用redirect）
            return <Redirect to='/login'/> 
         }
        return (
            <Layout style={{ height: "100%" }}>
            <Sider>
                <LeftNav />
            </Sider>
            <Layout>
              <Header>Header</Header>
              <Content style={{ backgroundColor: '#fff',margin:'20px'}}>
                <Switch>
                  <Route path='/home' component={Home}></Route>
                  <Route path='/category' component={Category}></Route>
                  <Route path='/product' component={Product}></Route>
                  <Route path='/user' component={User}></Route>
                  <Route path='/role' component={Role}></Route>
                  <Route path='/charts/bar' component={Bar}></Route>
                  <Route path='/charts/line' component={Line}></Route>
                  <Route path='/charts/pie' component={Pie}></Route>
                  <Redirect to='/home'></Redirect>
                </Switch>
              </Content>
              <Footer style={{textAlign: 'center', color: '#ccc'}}>梦凡科技源流有限公司 版权所有</Footer>
            </Layout>
          </Layout>
        )
    }
}