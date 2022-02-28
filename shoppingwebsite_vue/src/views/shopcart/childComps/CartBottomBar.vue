<template>
  <div class="bottom-menu">
    <check-button 
    @click.native="selectAllClick"
     class="select-all"
     :is-checked = "isSelectAll"
     ></check-button>
    <span>全选</span>
    <span class="total-price">合计:￥{{totalPrice}}</span>
    <span class="buy-product"
    @click="buyProductClick"
    >去结账({{checkedLength}})</span>
  </div>


</template>

<script>
import CheckButton from '../../../components/content/checkButton/CheckButton.vue'
import { mapGetters } from 'vuex'

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
 
  computed: {
    ...mapGetters(['cartList']),
    // 变量totalprice保存勾选商品的总价
    totalPrice() {
      return this.$store.getters.cartList.filter(item => {
        return item.checked
      }).reduce((sum, item) => {
        return sum + item.price * item.count
      }, 0).toFixed(2)
    },
    checkedLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
        if(this.cartList.length === 0) return false
        return this.cartList.length === this.checkedLength
      }
  },
  methods: {
    selectAllClick() {
      // console.log(this.isSelectAll)
      if(this.isSelectAll) {
        this.cartList.forEach(item => item.checked = false)
      }else {
        this.cartList.forEach(item => item.checked = true)
      }
    },
    buyProductClick() {
      if(this.cartList.filter(item => item.checked).length==0) {
        this.$toast.show("请选择购买的商品")
      }
      
    }
  }
}
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    left: 0;
    right: 0;
    z-index: 9999;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .1);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }
  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }
  .bottom-menu .total-price {
    margin-left: 19px;
    font-size: 16px;
    color: #666;
  }
  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  } 
</style>