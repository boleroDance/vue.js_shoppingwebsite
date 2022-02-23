<template>
  <div id="detail">
      <detail-nav-bar @titleClick="titleClick" ref="nav"></detail-nav-bar>
      <scroll 
      class="content"
      :probeType="3"
      :pullUpLoad="true"
      ref="scroll"
      @scroll="contentScroll"    
      >
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goodsInfo="goodsInfo"></detail-base-info>
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <detail-image-info :detailInfo="detailInfo" @detailImageLoad="detailImageLoad"></detail-image-info>
      <detail-param-info ref="param" :paramInfo="itemParams"></detail-param-info>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommendInfo"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backTopClick" v-show="showBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./childComponents/DetailNavBar.vue";
import DetailSwiper from "./childComponents/DetailSwiper.vue";
import DetailBaseInfo from "./childComponents/DetailBaseInfo.vue";
import DetailShopInfo from './childComponents/DetailShopInfo.vue';
import DetailImageInfo from './childComponents/DetailImageInfo.vue';
import DetailParamInfo from './childComponents/DetailParamInfo.vue';
import DetailCommentInfo from './childComponents/DetailCommentInfo.vue';
import GoodsList from '../../components/content/goods/GoodsList.vue';
import DetailBottomBar from './childComponents/DetailBottomBar.vue';
import BackTop from '../../components/content/backTop/BackTop.vue';

import { getDetail } from "../../network/detail";
import { GoodsInfo } from "../../network/detail";
import {getRecommend} from "../../network/detail"

import Scroll from "../../components/common/scroll/Scroll.vue";


export default {
  components: { DetailNavBar, DetailSwiper, DetailBaseInfo, Scroll, DetailShopInfo, DetailImageInfo, DetailParamInfo, DetailCommentInfo, GoodsList, DetailBottomBar, BackTop },

  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goodsInfo: {},
      shopInfo: {},
      detailInfo: {},
      itemParams: {},
      commentInfo: {},
      recommendInfo: [],
      componentTopYs: null,
      scrollIndex: 0,
      showBackTop: 'false',
    };
  },
  created() {
    // 1. 保存传入的iid
    this.iid = this.$route.params.iid;
    // 2. 根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      console.log(res);
      // 获取顶部图片轮播数据
      this.topImages = res.result.itemInfo.topImages;
      // 获取详情页商品数据
      this.goodsInfo = new GoodsInfo(
        res.result.itemInfo,
        res.result.columns,
        res.result.shopInfo.services
      );
      // 获取店铺信息数据
      this.shopInfo = res.result.shopInfo
      // 获取详情数据
      this.detailInfo = res.result.detailInfo
      // 获取商品参数信息
      this.itemParams = res.result.itemParams
      // 获取用户评价信息
      if(res.result.rate !== 0){
        this.commentInfo = res.result.rate.list[0]
      }

    });
    // 3. 请求推荐数据
    getRecommend().then(res => {
      console.log(res)
      this.recommendInfo = res.data.list
      // 等所有数据渲染完成后调用nextTick回调获取各个组件的Y高度
      // 但图片依旧还未加载完，目前的Y不包含图片高度
    //   this.$nextTick(()=> {
    //   this.componentTopYs.push(0)
    //   this.componentTopYs.push(this.$refs.param.$el.offsetTop)
    //   this.componentTopYs.push(this.$refs.comment.$el.offsetTop)
    //   this.componentTopYs.push(this.$refs.recommend.$el.offsetTop)
    //   console.log(this.componentTopYs)
    // })
    })
    
    // backTop默认不显示
    this.showBackTop = false
  },

  methods: {
    // 图片加载完后，计算componentTopYs
    detailImageLoad() {
      this.$refs.scroll.scroll.refresh()
      this.componentTopYs = []
      this.componentTopYs.push(0)
      this.componentTopYs.push(this.$refs.param.$el.offsetTop)
      this.componentTopYs.push(this.$refs.comment.$el.offsetTop)
      this.componentTopYs.push(this.$refs.recommend.$el.offsetTop)
      // console.log(this.componentTopYs)
    },
    // 点击tab，滚动到对应内容
     titleClick(index) {
      this.$refs.scroll.scrollTo(0,-this.componentTopYs[index],100)
    },
    // 监听滚动位置
    contentScroll(position) {
      // console.log(position)
      const positionY = -position.y
      // console.log(positionY)
      if(positionY > 0 && positionY < this.componentTopYs[1]) {
        this.scrollIndex = 0
        this.$refs.nav.currentIndex = this.scrollIndex
      } else if(positionY >= this.componentTopYs[1] && positionY < this.componentTopYs[2]){
        this.scrollIndex = 1
        this.$refs.nav.currentIndex = this.scrollIndex
      } else if(positionY >= this.componentTopYs[2] && positionY < this.componentTopYs[3]){
        this.scrollIndex = 2
        this.$refs.nav.currentIndex = this.scrollIndex
      } else {
        this.scrollIndex = 3
        this.$refs.nav.currentIndex = this.scrollIndex
      }

      // backTop是否显示
      if(position.y < -666) {
        this.showBackTop =  true
      }else {
        this.showBackTop =  false
      }
    },
    // 回到顶部组件的点击监听
    backTopClick() {
      this.$refs.scroll.scrollTo(0,0,500)
    },
    // 点击加入购物车
    addToCart() {
      // 获取购物车需要的信息
      const product = {}
      product.iid = this.iid
      product.image = this.topImages[0]
      product.title = this.goodsInfo.title
      product.desc = this.goodsInfo.desc
      product.price = this.goodsInfo.realPrice
      // 将商品添加到购物车
      // 数据先放在vuex，等购物车组件创建完后再放进去
      this.$store.commit('addCart', product)
    }
  },

  // 使用定时器延迟，等数据加载完成后拿到各个组件的Y高度，或者使用nextTick回调
  // mounted() {
  //   setTimeout(() => {
  //     this.componentTopYs.push(0)
  //     this.componentTopYs.push(this.$refs.param.$el.offsetTop)
  //     this.componentTopYs.push(this.$refs.comment.$el.offsetTop)
  //     this.componentTopYs.push(this.$refs.recommend.$el.offsetTop)
  //   }, 5000)
  //   console.log(this.componentTopYs) 
    
  // },



};
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 999;
  background-color: #fff;
}

.content {
  background-color: #fff;
  height: calc( 100% - 44px);
  /* height: 574px; */
  overflow: hidden;
}
</style>