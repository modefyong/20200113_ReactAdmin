import React, { Component } from 'react'

import {
    Card,
    Button,
    Table,
    Modal,
    message
}
from 'antd'
import LinkButton from '../../components/link-button'
import {PAGE_SIZE} from "../../utils/constants"
import {reqUsers, reqDelUser, reqAddUser} from "../../api/index"
import UserForm from "./user-form"
import userForm from './user-form'

// 用户路由
export default class User extends Component {

    state = {
        users: [], // 所有用户列表
        roles: [], // 所有角色列表
        isShow: false  // 是否显示确认框
    }

    initColumns = () => {
        this.columns = [
            {
                title: '用户名',
                dataIndex: 'realName'
            },
            {
                title: '创建时间',
                dataIndex: 'createDate'
            },
            {
                title: '电话',
                dataIndex: 'mobile'
            },
            {
                title: '所属角色',
                dataIndex: 'roleName'
            },
            {
                title: '操作',
                render: (user) => (
                    <span>
                        <LinkButton onClick={() => this.setState({isShow: true})}>修改</LinkButton>
                        <LinkButton onClick={() => this.deleteUser(user)}>删除</LinkButton>
                    </span>
                )
                    
            }
            
        ]
    }

    // 删除指定用户
    deleteUser = (user) => {
        Modal.confirm({
            title: `确认删除${user.realName}吗？`,
            onOk: async () => {
                const result = await reqDelUser(user.id)
                if(result.data){
                    message.success('删除用户成功！')
                    this.getUsers()
                }
            }
        })
    }

    // 添加/更新用户
    addOrUpdateUser = async () =>{
        this.setState({isShow: false})
        // 1.收集输入数据
        const user = this.form.getFieldsValue()
        // console.log(user);
        this.form.resetFields()
        // 2.提交请求
        const result = await reqAddUser(user)
        if(result.msg === "success"){
            message.success("添加用户成功！")
            this.getUsers()
        }
        // 3.更新列表显示

    }

    // 获取用户列表
    getUsers = async () => {
        const result = await reqUsers()
        if(result.code === "0000"){
            const { users, roles } = result.data
            // 使用对象形式，不使用函数形式
            this.setState({
                users,
                roles
            })
        }
    }

    componentWillMount(){
        this.initColumns()
    }

    componentDidMount(){
        this.getUsers()
    }

    render(){
        const {users, isShow} = this.state

        const title = <Button type="primary" onClick={() => this.setState({isShow: true})}>创建用户</Button>

        return (
            <Card title={title}>
                <Table 
                    rowKey="id" 
                    bordered 
                    dataSource={users} 
                    columns={this.columns}
                    pagination={{ defaultPageSize: PAGE_SIZE }}
                />
                <Modal
                  title="添加用户"
                  visible={isShow}
                  onOk={this.addOrUpdateUser}
                  onCancel={() => this.setState({isShow: false})}
                >
                    <UserForm setFrom={(form) => this.form = form}></UserForm>
                </Modal>
            </Card>
        )
    }
}