import React, { Component } from 'react'

import { Card, Button, Table,Modal, message } from 'antd'

import {PAGE_SIZE} from '../../utils/constants'

import { reqRoles, reqUpdateRole } from '../../api'
import AuthForm from './auth-form'

import memoryUtils from '../../utils/memoryUtils'

// 角色路由
export default class Role extends Component {

    state = {
        roles: [],
        role: {}, // 选中的role
        isShowAuth: false //是否显示设置权限界面
    }

    constructor(props){
        super(props)

        // 创建一个容器
        this.auth = React.createRef()
    }



    // 表格的列
    initColumn = () => {
        this.columns = [
            {
                title: "角色名称",
                dataIndex: "name"
            },
            {
                title: "创建时间",
                dataIndex: "createTime"
            },
            {
                title: "授权时间",
                dataIndex: "authTime"
            },
            {
                title: "授权人",
                dataIndex: "authUser"
            }
        ]
    }

    // 监听表格的行点击事件
    onRow = (role) => {
        return {
            onClick: event => {
                // console.log(role);
                this.setState({
                    role
                })
            }, // 点击行
        }
    }

    // 动态获取角色列表
    getRoles = async () => {
        const result = await reqRoles()
        // console.log(result);
        if(result.code === '0000'){
            // 获取角色列表成功
            const roles = result.data
            this.setState({
                roles
            })

        }
    }

    // 更新角色
    updateRole = async () => {

        // 隐藏确认框
        this.setState({
            isShowAuth: false
        })

        const role = this.state.role
        // 得到最新的menus
        const menus = this.auth.current.getMenus()
        role.menus = menus
        role.authUser = memoryUtils.user.username

        // 传入参数role对象
        // console.log("传入参数: " + role);
        // 更新角色后台接口
        const result = await reqUpdateRole(role)
        // console.log(result);
        if(result.code === '0000'){
            message.success('设置角色权限成功！')
            // this.setState({
                // 使用这种写法，时间没有及时更新
            //     roles: [...this.state.roles]
            // })
            this.getRoles()
        }
    }

    componentWillMount(){
        this.initColumn()
        this.getRoles()
    }

    render(){

        const {roles, role, isShowAuth} = this.state
        const title = (
            <span>
                <Button type="primary">创建角色</Button> &nbsp;&nbsp;
                <Button type="primary" disabled = {!role.id} onClick={()=> this.setState({isShowAuth: true})}>设置角色权限</Button>
            </span>
        )
        return (
            <Card title={ title }>
                <Table 
                    rowKey="id" 
                    bordered 
                    dataSource={roles} 
                    columns={this.columns}
                    pagination = {{ defaultPageSize: PAGE_SIZE }}
                    rowSelection = {{ 
                        type: 'radio',
                        selectedRowKeys: [role.id],
                        onSelect: (role) => {
                            this.setState({
                                role
                            })
                        }
                     }}
                    onRow = {this.onRow}
                    />
                <Modal
                  title="设置角色权限"
                  visible={isShowAuth}
                  onOk={this.updateRole}
                  onCancel={()=> {
                      this.setState({isShowAuth: false})
                  }}
                >
                  <AuthForm ref={this.auth} role={role} />
                </Modal>
            </Card>
        )
    }
} 