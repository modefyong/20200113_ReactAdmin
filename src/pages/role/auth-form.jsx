import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Form,
    Input,
    Tree
} from 'antd'
// import Item from 'antd/lib/list/Item';
import menuList from '../../config/menuConfig'
const { TreeNode } = Tree;

const Item = Form.Item
export default class AuthForm  extends Component {

    static propTypes = {
        role: PropTypes.object
    }

    constructor(props) {
        super(props);

        // 根据传入角色的menus生成初始状态
        const {menus} = this.props.role
        this.state = {
            checkedKeys: menus
        }
    }
    

    // 为父组件提供获取最新menus数据的方法
    getMenus = () => this.state.checkedKeys

    getTreeNodes = (menuList) => {
        return menuList.reduce((pre, item) => {
            pre.push(
                <TreeNode title={item.title} key={item.key}>
                    {item.children ? this.getTreeNodes(item.children) : null}
                </TreeNode>
            )
            return pre
        }, [])
    }

    // 选中某个node时
    onCheck = checkedKeys => {
        this.setState({ checkedKeys });
    }

    componentWillMount () {
        this.treeNodes = this.getTreeNodes(menuList) 
    }

    // 解决数据不更新的bug，根据新传入的role来更新checkedKeys 状态
    /**
     * 当组件接收到新的属性时自动调用
     */
    componentWillReceiveProps(nextProps){
        // console.log("componentWillReceiveProps()" +  nextProps);
        const menus = nextProps.role.menus
        this.setState({
            checkedKeys: menus
        })

        // this.state.checkedKeys = menus // 平常事件回调时候不能这样写
    }

    render() {
        // console.log("auth render()");
        const {role} = this.props
        const {checkedKeys} = this.state
        // 指定item布局的配置对象
        const formItemLayout = {
            labelCol: { span: 4 }, // 左侧label的宽度
            wrapperCol: { span: 15 } // 右侧包裹的宽度
        }
        return (
            <Form>
                <Item label="角色名称" {...formItemLayout}>
                    <Input value={role.name} disabled></Input>
                </Item>

                <Tree
                    checkable
                    defaultExpandAll={true}
                    checkedKeys={checkedKeys}
                    onCheck={this.onCheck}
                >
        <TreeNode title="平台权限" key="all">
          { this.treeNodes }
        </TreeNode>
      </Tree>
            </Form>
        );
    }
}