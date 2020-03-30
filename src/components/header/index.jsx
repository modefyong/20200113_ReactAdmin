import React, {Component} from 'react'

import {Modal} from 'antd'

import {withRouter} from 'react-router-dom'
import menuList from '../../config/menuConfig'

// 自定义button
import LinkButton from '../link-button'

import { reqWeather } from '../../api'
import {formateDate} from '../../utils/dateUtils'
import './header.less'

import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
// 左侧导航组件
class Header extends Component {

    state = {
        currentTime: formateDate(Date.now()), // 当前时间字符串格式
        dayPictureUrl: '',// 天气图片url
        weather: '', //天气文本
    }

    getTime = () => {
        // 每隔一秒获取当前时间，并更新状态数据currentTime
        this.interValId = setInterval(() => {
            const currentTime = formateDate(Date.now())
            // 更新状态
            this.setState({currentTime})
        }, 1000)
    }

    getWeather = async () => {
        // 调用接口请求异步获取数据
       const { dayPictureUrl, weather } = await reqWeather('北京')
        // 更新状态
        this.setState({ dayPictureUrl, weather }) 
    }

    getTitle = () => {
        // 得到当前请求路径
        const path = this.props.location.pathname // 只有路由组件上有该属性
        let title
        menuList.forEach(item => {
            if(item.key === path){
                title = item.title
            }else if(item.children){
                // 在所有子item中查找匹配的
                const cItem = item.children.find(cItem => cItem.key === path)
                // 如果有值，说明匹配到了
                if(cItem){
                    title = cItem.title
                }
            }
        })
        return title
    }

    logOut = () => {
        // 使用antd框架，显示确认框
        Modal.confirm({
            content: '是否退出系统？',
            onOk: () => {
                // console.log('OK');

                // 删除保存的user数据
                storageUtils.removeUser()// 删除本地库存储
                memoryUtils.user = {} // 内存中置空
                // 跳转到登录界面
                this.props.history.replace('/login')
            }
        })
    }

    // 第一次render（）之后执行一次，一般在此执行异步操作:发ajax请求/启动定时器
    componentDidMount(){
        // 获取当前时间
        this.getTime()
        // 获取当前天气
        this.getWeather()
    }
// 这样写不行，不会更新显示
    // componentWillMount(){
    //     this.title = this.getTitle()
    // }

    // 在组件销毁之前调用
    componentWillUnmount() {
        // 清除定时器
        clearInterval(this.interValId)
    }

    render(){

        const { currentTime, dayPictureUrl, weather } = this.state

        const username = memoryUtils.user.realName
        // 得到当前需要显示的title
        const title = this.getTitle()
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎，{username} </span>
                    <LinkButton onClick={this.logOut}>退出</LinkButton>
                    {/* <span style={{ cursor: 'pointer' }} className='exit' onClick={this.logOut}>退出</span> */}
                </div>
                <div className="header-bottom">
                    <span className="header-title">{title}</span>
                    <div className="weather">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="weather"/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)