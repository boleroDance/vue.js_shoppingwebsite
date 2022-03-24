<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
          :titles="['流行', '新款', '精选']"
          @itemClick="itemClick"
          ref="tabControlFack"
          v-show="isTabFixed"
        ></tab-control>
    <scroll 
    class="content" 
    ref="scroll" 
    :probe-type="3" 
    @scroll="contentScroll"
    :pull-up-load="true" 
    @pullingUp="loadMore">
      <home-swiper :banners="banners"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control
          :titles="['流行', '新款', '精选']"
          @itemClick="itemClick"
          ref="tabControl"
        ></tab-control>
        <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll> 
    <!-- 监听一个组件时，必须给对应的事件加上.native修饰符 -->
    <back-top @click.native="backTopClick" v-show="showBackTop"></back-top>
  </div>
</template>

<script>
// 公共组件
import NavBar from "../../components/common/navbar/NavBar.vue";
import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendView from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";

import TabControl from "../../components/content/tabControl/TabControl.vue";
import GoodsList from "../../components/content/goods/GoodsList.vue";

import { getHomeMultidata } from "../../network/home.js";
import { getHomeTabData } from "../../network/home.js";

import Scroll from "../../components/common/scroll/Scroll.vue";
import BackTop from '../../components/content/backTop/BackTop.vue';

import {debounce} from '../../common/utils'
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      // 保存res
      // result: null
      banners: [],
      recommends: [],
      // 设计数据结构，用于保存数据
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      showBackTop: 'false',
      tabOffsetTop: 0,
      isTabFixed: false,
      // mytitle: 'vve',
      // http: 'Content-Security-Policy',
      // cont: 'upgrade-insecure-requests' 
    };
  },
  // metaInfo() {
  //   return {
  //     title: this.mytitle,
      
      
  //   }
  // },
  created() {
    // 函数调用，变量压入函数栈，调用结束，弹出函数栈，释放所有变量
    // 1. 请求getHomeMultidata数据
    this.getHomeMultidata();

    // 2.请求getHomeTabData数据
    this.getHomeTabData("pop");
    this.getHomeTabData("new");
    this.getHomeTabData("sell");

    this.showBackTop = false

    
  },
  mounted() {
    // 图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 500)
    
    this.$bus.$on('homeItemImageLoad', () => {
      console.log('首页图片加载完成')
      refresh()
    })
    // 获取tabcontrol 的 offsetTop
    // 所有组件都有一个属性 $el 用于获取组件中的元素
    setTimeout(() => {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop               // 定义变量tabOffsetTop 来保存值，由于图片加载需要时间，这里我用了个定时器
    }, 1000); 
    
    
  },
  methods: {
    // 将created的函数抽到methods中，在created只需调用
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res)
        // this.result = res
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeTabData(type) {
      const page = this.goods[type].page + 1;
      getHomeTabData(type, page).then((res) => {
        console.log(res.data.list);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
       // better-scroll默认只加载一次，需要调finishPullUp方法
        this.$refs.scroll.scroll.finishPullUp() 
      });
    },
    // 事件监听相关方法
    // 监听选项卡点击
    itemClick(index) {
      // console.log(index)
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
      }
      // 让两个tabcontrol的index保持一致
      this.$refs.tabControlFack.currentIndex = index
      this.$refs.tabControl.currentIndex = index
    },

    backTopClick() {
      // 通过 $refs 访问子组件scroll对象
      this.$refs.scroll.scrollTo(0,0,500)
    },

    // 监听回到顶部事件
    contentScroll(position) {
      // console.log(position)
      // backtop是否显示
      if(position.y < -666) {
        this.showBackTop =  true
      }else {
        this.showBackTop =  false
      }
      //是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },

    loadMore() {
        this.getHomeTabData(this.currentType)
        console.log(this.$refs.scroll.scroll)
        this.$refs.scroll.scroll.refresh() // better—scroll重新计算高度
    },
    

  },

};
</script>

<style scoped>
#home {
  position: relative;
  padding-top: 44px;
  height: 100vh;
  /* vh 视口高度 */
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

/* .tab-control { */
  /* position: sticky;
  z-index: 99;
  top: 44px; 
                            滚动交给better-scroll管理后，position失效
  */
  /* background-color: #fff; */
/* } */

.content {
  height: calc(100% - 49px);
  overflow: hidden;
}
</style>