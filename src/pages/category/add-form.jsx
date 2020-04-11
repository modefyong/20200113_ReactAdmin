import React, { Component } from 'react'

import { Form, Input } from 'antd'

import PropTypes from 'prop-types' 

const Item = Form.Item
// const Option = Select.Option

/**
 * 添加分类的form组件
 */
class AddForm  extends Component {
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
                {/* <Select>
                    <Option>一级分类</Option>
                    <Option>111</Option>
                    <Option>222</Option>
                </Select> */}
                
                <Item>
                    {
                        getFieldDecorator('allSc', {
                            initialValue: ''
                        })(
                            <Input placeholder="请输入积分"></Input>
                        )
                    }
                </Item>
            </Form>
        );
    }
}
// render() 得到一个form对象
export default Form.create()(AddForm)