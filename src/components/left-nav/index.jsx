import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import { Menu, Icon } from 'antd';


import './index.less'
import logo from '../../assets/images/UI.png'

import menuList from '../../config/menuConfig'
const { SubMenu } = Menu;

// 左侧导航组件
class leftNav extends Component {

  // 根据menu的数据数组生成对应的标签数组
  // 使用map() + 递归调用
  getMenuNodes_map = (menuList) => {
    return menuList.map(item => {
      if(!item.children){
          return (
            <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
          )
      }else {
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                 <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {
              this.getMenuNodes(item.children)
            }
          </SubMenu>
        )
      }
    })
  }

  // 根据menu的数据数组生成对应的标签数组
  // 使用reduce() + 递归调用
  getMenuNodes = (menuList) => {
    // 得到当前请求的路由路径 
    const path = this.props.location.pathname

    return menuList.reduce((pre, item) => {
      if(!item.children){
        // 向pre添加<Menu.Item >
        pre.push((
          <Menu.Item key={item.key}>
          <Link to={item.key}>
            <Icon type={item.icon} />
            <span>{item.title}</span>
          </Link>
        </Menu.Item>))
      }else {
        // 查找一个与当前请求路径匹配的字item
        const cItem = item.children.find(cItem => cItem.key === path)
        // 如果存在，说明当前item的子列表需要打开.this是当前组件对象
       if(cItem){
          this.openKey = item.key 
       }

        // 向pre添加<SubMenu>
          pre.push((
            <SubMenu
            key={item.key}
            title={
              <span>
                 <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {
              this.getMenuNodes(item.children)
            }
          </SubMenu>
          ))
      }

      return pre
    },[])
  }
// react 周期函数，在第一次render（）之前执行一次
// 为第一个render（）准备数据（必须同步）
  componentWillMount(){
        this.menuNodes = this.getMenuNodes(menuList)
  }

    render(){
      // 得到当前请求的路由路径
      const path = this.props.location.pathname

      // 得到需要打开菜单项的key
      const openKey = this.openKey
        return (
            <div className="left-nav">
                <Link to='/' className="left-nav-header">
                    <img src={logo} alt="logo"/>
                    <h1>系统后台</h1>
                </Link>
                <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme="dark"
        >
            {
              this.menuNodes
            }
         
        </Menu>
            </div>
        )
    }
}

// withRouter高阶组件：
// 包装非路由组件，返回一个新的组件
// 新的组件向非路由组件传递3个属性：history/location/match
export default withRouter(leftNav)