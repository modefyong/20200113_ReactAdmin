import React, { Component } from 'react'

import { Form, Input, Button, Icon, message } from 'antd';

import './login.less'
import logo from '../../assets/images/UI.png'

import {reqLogin} from '../../api'

import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { Redirect } from 'react-router-dom';

// 登陆的路由组件
class Login  extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleSubmit = (event) => {
        // 阻止事件的默认行为
        event.preventDefault();

        // 对所有表单字段进行校验
        this.props.form.validateFields(async (err, values) => {
            if(!err){
                // console.log('提交登陆的ajax请求', values);
                // 请求登录
                const {username, password} = values;
                const result = await reqLogin(username, password)
                if(result.message == null){ // 登陆成功！
                    // 提示登陆成功。
                    message.success('登陆成功！');
                    // 保存登陆用户
                    memoryUtils.user = result;
                    storageUtils.saveUser(result);// 保存到本地中去
                    // 跳转到后台管理界面。（不需要在回退，所以不使用push）
                    this.props.history.replace('/'); // 不了解！
                }else{
                    message.error(result.message);
                }
            }else {
                console.log('校验失败！');
            }
        })

        // 得到form对象
        // const form = this.props.form;
        // // 获取表单项的输入数据
        // const values = form.getFieldsValue();
        // console.log(values);
    }

    // 对密码进行自定义验证
    validarePwd = (rule, value, callback) => {
        if(!value){
            callback('请输入密码！');
        }else if(value.length < 4){
            callback('密码不能少于4位！');
        }else if(value.length > 12){
            callback('密码不能大于12位！');
        }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
            callback('密码必须由英文、数字或下划线组成!！');
        }else {
            callback();
        }
    }
    render() {

        // 如果用户已经登陆，自动跳转到管理界面
        const user = memoryUtils.user;
        if(user && user.UserId){
            return <Redirect to='/'/>
        }

        // 获取form对象
        const form = this.props.form;
        const { getFieldDecorator } = form;
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React项目： 后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h1>用户登陆</h1>
                    <Form
      name="normal_login"
      className="login-form"
      onSubmit={this.handleSubmit}
    >
      <Form.Item
      >
          {
              getFieldDecorator('username', { // 配置对象，属性名是特定的一些名称
                // 声明式验证：直接使用别人定义好的验证规则进行验证
                rules:[
                    { required: true, whitespace: true, message: '请输入您的用户名!' },
                    { min: 4, message: '用户名至少4位数!' },
                    { max: 12, message: '用户名最多12位数!' },
                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须由英文、数字或下划线组成!' }
                ],
                initialValue: 'admin' // 指定初始值
              })(
                <Input  prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
              )
          }
        
      </Form.Item>
      <Form.Item
      >
          {
              getFieldDecorator('password', {
                  rules: [
                      {
                          validator: this.validarePwd
                      }
                  ]
              })(
                <Input
                    prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                />
              )
          }
        
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登陆
        </Button>
      </Form.Item>
    </Form>
                </section>
            </div>
        )
    }



}

// 包装form组件生成一个新的组件
const WrapLogin = Form.create()(Login)
export default WrapLogin