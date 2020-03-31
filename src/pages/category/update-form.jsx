import React, { Component } from 'react'

import { Form, Input } from 'antd'

import PropTypes from 'prop-types' 

const Item = Form.Item
// const Option = Select.Option

/**
 * 修改分类的form组件
 */
class UpdateForm  extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    // 不懂有什么作用？传参？
    static propTypes = {
        categoryName: PropTypes.string.isRequired,
        setFrom: PropTypes.func.isRequired
    }

    componentWillMount() {
        // 将form对象通过setForm()传递给父组件
        this.props.setFrom(this.props.form)
    }

    render() {
        const {categoryName} = this.props

        const { getFieldDecorator } = this.props.form
        return (
            <Form>
                <Item>
                    {
                        getFieldDecorator('allSc', {
                            initialValue: categoryName
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
export default Form.create()(UpdateForm)