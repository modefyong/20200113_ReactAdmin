import React, { Component } from 'react'
import { Card, Button,Icon, Table, message, Modal } from 'antd';

import LinkButton from '../../components/link-button'

import {reqCategorys,reqCategoryDetails, reqUpdateCategory} from '../../api'

import AddForm from './add-form'
import UpdateForm from './update-form'

// 商品列表路由
export default class Category extends Component {

  state = {
    categorys: [], // 一级分类列表
    subCategorys: [], // 二级积分种类
    flag: true, // 一级标志
    loading: false, //是否加载数据中
    parentKindName:'',
    showStatus: 0, // 标识添加/更新的确认框是否显示，0：都不显示，1：显示添加，2：显示更新
  }

  // 初始化Table所有列的数组
  initColumns = () => {
    this.columns = [
      {
        title: '总积分',
        dataIndex: 'allSc', // 显示数据对应的属性名
      },
      {
        title: '操作',
        width: 300,
        render: (categorys) => ( // 返回需要显示的界面标签
          <span>
            <LinkButton onClick={()=> { this.showUpdate(categorys) }}>修改分数</LinkButton>
            <LinkButton onClick={() => {
              this.showIntergralKind(categorys)
            }}>查看积分种类</LinkButton>
          </span>
        )
        
      }
    ];
    this.columnChild = [
      {
        title: '积分种类',
        dataIndex: 'interKind', // 显示数据对应的属性名
      },
      {
        title: '操作',
        width: 300,
        render: () => ( // 返回需要显示的界面标签
          <span>
            <LinkButton onClick={this.showKindUpdate}>修改种类</LinkButton>
          </span>
        )
        
      }
    ];
  }

// 异步获取一级分类列表显示
  getCategorys = async () => {

    // 在发请求前显示loading
    this.setState({loading: true})
    // 发异步ajax请求，获取数据
    const result = await reqCategorys()
    

    // 加个延迟定时器（500毫秒）
    this.timer1 = setInterval(()=> {
      // 在请求完成后，隐藏loading
      this.setState({loading: false})
    },500)
    
    
    // console.log(result);
    if(result.code === '0000'){
      const categorys = result.data
      // 更新状态
      this.setState({categorys})
    }else {
      message.error('获取分类列表失败！')
    }
  }
  
  // 根据一级分类的积分类别id获取积分种类
  getSecondIntergralKind = async (categorys) => {
    // 在发请求前显示loading
    this.setState({loading: true})
    // console.log(categorys.detailKindId)
    // 发异步ajax请求，获取数据
    const result = await reqCategoryDetails(categorys.detailKindId)
    // 加个延迟定时器（500毫秒）
    this.timer = setInterval(()=> {
      // 在请求完成后，隐藏loading
      this.setState({loading: false})
    },500)
    
    // console.log(result);
    if(result.code === '0000'){
      // const subCategorys = result.data
      let arrList = []
      arrList.push(result.data)
      const subCategorys = arrList
      // 更新状态
      this.setState({subCategorys})
    }else {
      message.error('未查询到相关种类！')
    }
  }
  // 点击查看详情时，显示指定一级分类的积分种类
  showIntergralKind = async (categorys) => {
    // console.log(categorys)
    this.setState({flag:false,parentKindName:categorys.detailKind}, () => {
      this.getSecondIntergralKind(categorys)
    })
  }

  // 显示指定一级分类列表
  showFirstCategory = () => {
    this.setState({
      flag: true
    })
  }

  // 响应点击取消：隐藏确认框
  handleCancel = () => {
    // 清除输入数据
    this.form.resetFields()
    this.setState({ showStatus: 0 })
  }

  // 显示添加的确认框
  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }

  // 显示修改积分的确认框
  showUpdate = (category) => {
    // 保存分类对象
    this.category = category
    // 更新状态
    this.setState({
      showStatus: 2
    })
  }
  // 显示修改积分种类的确认框
  showKindUpdate = () => {
    this.setState({
      showStatus: 2
    })
  }

  // 添加
  addCategory = () => {}
  // 更新
  updateCategory = async () => {
    // 1.隐藏确认框
    this.setState({showStatus: 0})
    // 2.向后台发送修改积分的请求（需要先准备数据。*）

    const categoryId = this.category.id
    const allSc = this.form.getFieldValue("allSc")

    // 清除原来form里的数据(因为form里保存了原来文本框的输入内容，只要点了确认或者取消按钮)
    this.form.resetFields()
    const result = await reqUpdateCategory(categoryId, allSc)

    if(result.data){
      // 3.重新渲染列表数据
      this.getCategorys()
    }
    
  }

  // 为第一次render（）准备数据
  componentWillMount(){
    this.initColumns()
  }

  // 执行异步任务: 发异步ajax请求
  componentDidMount(){
    this.getCategorys()
  }

  componentWillUnmount(){
    clearInterval(this.timer)
    clearInterval(this.timer1)
  }

    render(){

      // 保存要修改的分类
      const category = this.category || {}
        // 读取状态数据
        const {categorys, loading,subCategorys,flag,parentKindName, showStatus} = this.state
        const title = flag ? '标题' : (
          <span>
            <LinkButton onClick={this.showFirstCategory}>一级分类标题</LinkButton>
            <Icon type="arrow-right" style={{ margin: '0 5px' }}></Icon>
            <span>{parentKindName}</span>
          </span>
        )
        const clickLink = (
            <Button type="primary" onClick={this.showAdd}>
                <Icon type='plus'></Icon>
                添加
            </Button>
        )

        return (
            <div>
                <Card title={title} extra={clickLink}>
                    <Table 
                    rowKey="id" 
                    bordered 
                    loading={loading}
                    dataSource={flag ? categorys:subCategorys} 
                    columns={flag ? this.columns:this.columnChild} />
                </Card>
                <Modal
                  title="添加积分"
                  visible={showStatus === 1}
                  onOk={this.addCategory}
                  onCancel={this.handleCancel}
                >
                  <AddForm></AddForm>
                </Modal>
                <Modal
                  title="修改积分"
                  visible={showStatus === 2}
                  onOk={this.updateCategory}
                  onCancel={this.handleCancel}
                >
                  <UpdateForm categoryName={category.allSc} setFrom={(form) => { this.form = form }}></UpdateForm>
                </Modal>
            </div>
        )
    }
}