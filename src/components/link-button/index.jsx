import React, { Component } from 'react'
import './index.less'

// 封装一个外形像链接的按钮
export default function LinkButton(props){
    return <button {...props} className="exit"></button>
}