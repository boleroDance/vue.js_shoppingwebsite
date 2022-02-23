<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">
        购物车(<span>{{cartLength}}</span><span>)</span>
      </div>
    </nav-bar>
    <scroll 
    class="content"
    :probeType="3"  
    ref="scroll"
    >
    <cart-list>
    </cart-list>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NavBar from '../../components/common/navbar/NavBar.vue'
import CartList from './childComps/CartList.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'

import Scroll from '../../components/common/scroll/Scroll.vue'

export default {
  name: "Shopcart",
  components: {
    NavBar,
    CartList,
    Scroll,
    CartBottomBar,
  },
  computed: {
    // cartLength() {
    //   return this.$store.getters.cartLength
    // }
    ...mapGetters(['cartLength'])
  },
  activated() {
    this.$refs.scroll.scroll.refresh()
  }
  
}
</script>

<style scoped>
  #cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color:#fff;
    font-weight: 600;
  }
  .content {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
</style>