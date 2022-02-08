<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control class="tab-control" :titles="['流行','新款','精选']" @itemClick="itemClick"></tab-control>
    <goods-list :goods="goods[currentType].list"></goods-list>
   
  </div>
  
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar.vue'
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

import TabControl from '../../components/content/tabControl/TabControl.vue'
import GoodsList from '../../components/content/goods/GoodsList.vue'

import {getHomeMultidata} from '../../network/home'
import {getHomeTabData} from '../../network/home'
 
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList
  },
  data() {
    return {                          // 保存res
      // result: null
      banners: [],
      recommends: [],
      goods: {
        'pop': {page:0, list: []},
        'new': {page:0, list: []},
        'sell': {page:0, list: []},
      },
      currentType: 'pop'
    }
  },
  created() {                  // 函数调用，变量压入函数栈，调用结束，弹出函数栈，释放所有变量
    // 1. 请求getHomeMultidata数据
    this.getHomeMultidata()

    // 2.请求getHomeTabData数据
    this.getHomeTabData('pop')
    this.getHomeTabData('new')
    this.getHomeTabData('sell')
  },
  methods: {
    // 将created的函数抽到methods中，在created只需调用
    getHomeMultidata() {
      getHomeMultidata().then(res => {
      // console.log(res)
      // this.result = res
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
    },
    getHomeTabData(type) {
      const page = this.goods[type].page + 1
      getHomeTabData(type,page).then(res => {
      console.log(res.data.list)
      this.goods[type].list.push(...res.data.list)
      this.goods[type].page += 1
      
    })
    },

    // 事件监听相关方法
    // 监听选项卡点击
    itemClick(index) {
      // console.log(index)
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new' 
          break
        case 2:
          this.currentType = 'sell' 
      }
    }

  },

}
</script>

<style>
  #home {
    padding-top: 44px;
 }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
  }

  .tab-control {
    position: sticky;
    z-index: 99;
    top: 44px;
    background-color: #fff;
  }
</style>