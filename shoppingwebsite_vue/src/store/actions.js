// Action 提交的是 mutation，而不是直接变更状态
// action 书写自己的业务逻辑，处理异步操作
// 调用 context.commit 提交一个 mutation

import {
  ADD_COUNTER,
  ADD_TO_CART,
  
} from './mutation-types'

import {
  requestPhoneCode, requestUserRegister, requestUserLogin, requestUserInfo, requestLogout
} from '../network/user'

import { setToken } from '../common/token'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let sameProduct = null
    for (let item of context.state.cartList) {
      if (item.iid === payload.iid) {
        sameProduct = item
      }
    }
    if (sameProduct) {
      // sameProduct.count += 1
      context.commit(ADD_COUNTER, sameProduct)
      resolve()
    } else {
      payload.checked = true
      payload.count = 1
      // this.state.cartList.push(payload)
      context.commit(ADD_TO_CART, payload)
      resolve()
    }
    })
  },

  // 获取验证码
  async getCode({ commit }, payload) {
    let res = await requestPhoneCode(payload)
    // console.log(res)
    if (res.code == 200) {
      // console.log('ddd')
      commit('GETCODE', res.data)
      }
  },


  // 用户注册
  userRegister({ commit }, user) {
    return new Promise((resolve, reject) => {
      requestUserRegister(user).then(res => {
        // console.log(res)
        resolve(res)
      })
    })
  },

  // 用户登录
  userLogin({ commit }, data) {
    return new Promise((resolve, reject) => {
      requestUserLogin(data).then(res => {
        console.log(res)
        // 后台返回数据中包含 token 将其存进vuex
        if(res.code == 200) {
          commit('USERLOGIN', res.data.token)
          // 将token存进本地存储
          setToken(res.data.token)
          resolve(res)
        }else {
          reject(res)
        }
      })
    })
  },

  //获取用户信息
  getUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      requestUserInfo().then(res => {
        console.log(res)
        // 参数没有带token，因此服务器返回的数据显示未登录，需要在请求头中带上token
        if(res.code == 200) {
          commit('GETUSERINFO', res.data)
          resolve(res)
        } else {
          reject(res.message)
        }
      })
    })
  },

  // 退出登陆
  userLogout({ commit }) {
    return new Promise((resolve, reject) => {
      requestLogout().then(res => {
        console.log(res)
        if(res.code == 200) {
          commit('CLEAR')
          resolve(res)
        } else {
          reject(res.message)
        }
      })
    })
  }







}

