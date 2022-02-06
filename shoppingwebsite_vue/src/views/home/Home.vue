<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
  </div>
  
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar.vue'
import HomeSwiper from './childComps/HomeSwiper.vue'

import {getHomeMultidata} from '../../network/home'



export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper
  },
  data() {
    return {                          // 保存res
      // result: null
      banners: [],
      recommends: []
    }
  },
  created() {                  // 函数调用，变量压入函数栈，调用结束，弹出函数栈，释放所有变量
    // 1. 请求多个数据
    getHomeMultidata().then(res => {
      console.log(res)
      // this.result = res
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
  }
}
</script>

<style>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff
  }
</style>