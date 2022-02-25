// Action 提交的是 mutation，而不是直接变更状态
// 调用 context.commit 提交一个 mutation
import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  addCart(context, payload) {
    let sameProduct = null
    for (let item of context.state.cartList) {
      if (item.iid === payload.iid) {
        sameProduct = item
      }
    }

    if (sameProduct) {
      // sameProduct.count += 1
      context.commit(ADD_COUNTER, sameProduct)
    } else {
      payload.checked = true
      payload.count = 1
      // this.state.cartList.push(payload)
      context.commit(ADD_TO_CART, payload)
    }

  }
}