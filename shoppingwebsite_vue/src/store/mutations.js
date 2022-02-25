// mutations 唯一目的就是修改 store 的状态,因此不可以将任何异步操作放入mutations
// mutation 必须同步执行
// export default {
//   addCart(state, payload) {
//       // 对重复添加做判断
//     let sameProduct = null
//     for(let item of this.state.cartList){
//       if(item.iid === payload.iid){
//         sameProduct = item
//       }
//     }
//     // 计算重复数量, 新增一个属性count保存商品数量
//     if(sameProduct) {
//       sameProduct.count += 1
//     } else {
//       payload.checked = true
//       payload.count = 1
//       this.state.cartList.push(payload)
//     }
  
//   }
// }
import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default{
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    state.cartList.push(payload)
  }
}