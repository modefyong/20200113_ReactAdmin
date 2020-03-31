import React, { Component } from 'react'

import { Form, Input } from 'antd'

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
                        getFieldDecorator('parentId', {
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