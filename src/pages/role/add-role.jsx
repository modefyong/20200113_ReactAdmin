import React, { Component } from 'react'

import { Form, Input } from 'antd'

import PropTypes from 'prop-types' 

const Item = Form.Item
// const Option = Select.Option

/**
 * 添加角色
 */
class AddRole  extends Component {
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
        const { getFieldDecorator } = this.props.form
        return (
            <Form>
                <Item>
                    {
                        getFieldDecorator('name', {
                            initialValue: ''
                        })(
                            <Input placeholder="请输入角色名"></Input>
                        )
                    }
                </Item>
            </Form>
        );
    }
}
// render() 得到一个form对象
export default Form.create()(AddRole)