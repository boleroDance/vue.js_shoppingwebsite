import reques from './reques'

// 获取手机验证码
export const requestPhoneCode = (phone) => reques({
  url:`/user/passport/sendCode/${phone}`,
  method: 'GET'
})

// 用户注册
export const requestUserRegister = (data) => reques({
  url: '/user/passport/register', 
  data,
  method: 'POST'
})

// 用户登录
export const requestUserLogin = (data) => reques({
  url: '/user/passport/login',
  data,
  method: 'POST'
})

// 获取用户信息
export const requestUserInfo = () => reques({
  url: '/user/passport/auth/getUserInfo',
  method: 'GET'
})

// 退出登陆
export const requestLogout = () => reques({
  url: '/user/passport/logout',
  method: 'GET'
})