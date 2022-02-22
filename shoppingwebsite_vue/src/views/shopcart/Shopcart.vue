<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">
        购物车(<span>{{cartLength}}</span><span>)</span>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar.vue'
import { mapGetters } from 'vuex'

export default {
  name: "Shopcart",
  components: {
    NavBar
  },
  computed: {
    // cartLength() {
    //   return this.$store.getters.cartLength
    // }
    ...mapGetters(['cartLength'])
  }
  
}
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color:#fff;
    font-weight: 600;
  }
</style>