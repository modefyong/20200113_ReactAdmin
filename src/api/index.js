/**
 * 要求：能根据接口文档定义接口请求函数
 * 包含应用中所有接口请求函数的模块
 * 每个函数的返回值都是promise
 */
import ajax from './ajax.js'
import jsonp from 'jsonp'
import { message } from 'antd'

//登录
// export function reqLogin(username, password) {
//     return ajax('./login', { username, password }, 'POST')
// }
// /loginReact 自己写的接口
export const reqLogin = (username, password) => ajax('/loginReact', { username, password }, 'POST')

// 添加用户(url是端口号后面的地址)
// export const reqAddUser = (user) => ajax('/add', user, 'POST')

// jsonp 请求的接口请求函数
export const reqWeather = (city) => {

    return new Promise((resolve, reject) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url, {}, (err, data) => {
            // console.log(err, data)
            // 如果成功了
            if (!err && data.status === 'success') {
                // 解构
                const { dayPictureUrl, weather } = data.results[0].weather_data[0]
                resolve({ dayPictureUrl, weather })
            } else {
                // 失败了,不调用reject，而是统一处理错误信息
                message.error('获取天气信息失败！')
            }
        })
    })

}

// reqWeather('北京')

// 获取积分列表
export const reqCategorys = (parentId) => ajax('/intergralList/getReactList', parentId, 'POST')
    // 获取积分加分详情
export const reqCategoryDetails = (detailKindId) => ajax('/intergralList/getReactDetailList', { detailKindId }, 'POST')
    // 修改积分总分
export const reqUpdateCategory = (id, allSc) => ajax('/intergralList/updateReactList', { id, allSc }, 'POST')
    // 添加积分
export const reqAddCategory = (allSc) => ajax('/intergralList/addReactList', { allSc }, 'POST')

// 获取角色列表(包含菜单列表)
export const reqRoles = () => ajax('/intergralList/getReactRoles')

// 更新角色
export const reqUpdateRole = (role) => ajax('/intergralList/updateReactRole', role, 'post')