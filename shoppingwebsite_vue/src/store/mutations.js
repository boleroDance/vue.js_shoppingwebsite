export default {
  addCart(state, payload) {
    // 对重复添加做判断
    let sameProduct = null
    for(let item of this.state.cartList){
      if(item.iid === payload.iid){
        sameProduct = item
      }
    }
    // 计算重复数量, 新增一个属性count保存商品数量
    if(sameProduct) {
      sameProduct.count += 1
    } else {
      payload.count = 1
      this.state.cartList.push(payload)
    }
  }
}