import { get, post } from '../config/request'

export const myUser = {
    loginIn: (params) => post('/Login/CheckLogin?userName=' + params.userName + '&password=' + params.password, {}), // 登录验证
    GetVerificationCode: (params) => post('/Login/GetVerificationCode', params), // 忘记密码-获取短信验证码
    VerifyCode: (params) => post('/Login/VerifyCode', params), // 忘记密码-服务器验证 POST 
    UpdatePassWord: (params) => post('/Login/UpdatePassWord', params), // 忘记密码-修改密码 POST 
}

export const home = {
    //获取左侧菜单
    getMenus: () => get('/Home/GetMenus', {}),
}