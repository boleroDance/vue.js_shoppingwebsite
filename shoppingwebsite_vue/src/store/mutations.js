// mutations 唯一目的就是修改 store 的状态,因此不可以将任何异步操作放入mutations
// mutation 必须同步执行

import {
  ADD_COUNTER,
  ADD_TO_CART,
} from './mutation-types'

export default{
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    state.cartList.push(payload)
  },

  GETCODE(state, code) {
    state.code = code
  },

  USERLOGIN(state, token) {
    state.token = token
  },

  GETUSERINFO(state, userinfo) {
    state.userinfo = userinfo
  },

  CLEAR(state) {
    state.token = ''
    state.userinfo = {}
    localStorage.removeItem('TOKEN')
  }




}