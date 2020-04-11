import React, { PureComponent } from 'react'

import { Form, Input } from 'antd'

import PropTypes from 'prop-types' 

const Item = Form.Item
// const Option = Select.Option

/**
 * 添加分类的form组件
 */
class UserForm  extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static propTypes = {
        setFrom: PropTypes.func.isRequired
    }

    componentWillMount() {
        // 将form对象通过setForm()传递给父组件
        this.props.setFrom(this.props.form)
    }

    render() {
        // 指定item布局的配置对象
        const formItemLayout = {
            labelCol: { span: 4 }, // 左侧label的宽度
            wrapperCol: { span: 15 } // 右侧包裹的宽度
        }
        const { getFieldDecorator } = this.props.form
        return (
            <Form {...formItemLayout}>
                <Item label='用户名'>
                    {
                        getFieldDecorator('realName', {
                            initialValue: ''
                        })(
                            <Input placeholder="请输入用户名"></Input>
                        )
                    }
                </Item>
                <Item label='密码'>
                    {
                        getFieldDecorator('password', {
                            initialValue: ''
                        })(
                            <Input type="password" placeholder="请输入密码"></Input>
                        )
                    }
                </Item>
                <Item label='手机号'>
                    {
                        getFieldDecorator('mobile', {
                            initialValue: ''
                        })(
                            <Input placeholder="请输入手机号"></Input>
                        )
                    }
                </Item>
            </Form>
        );
    }
}
// render() 得到一个form对象
export default Form.create()(UserForm)