/**
 * 要求：能根据接口文档定义接口请求函数
 * 包含应用中所有接口请求函数的模块
 * 每个函数的返回值都是promise
 */
import ajax from './ajax.js'

//登录
// export function reqLogin(username, password) {
//     return ajax('./login', { username, password }, 'POST')
// }
// /loginReact 自己写的接口
export const reqLogin = (username, password) => ajax('/loginReact', { username, password }, 'POST')

// 添加用户(url是端口号后面的地址)
// export const reqAddUser = (user) => ajax('/add', user, 'POST')