<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :topImages="topImages"></detail-swiper>
    <detail-base-info :goodsInfo="goodsInfo"></detail-base-info>
  </div>
</template>

<script>
import DetailNavBar from './childComponents/DetailNavBar.vue'
import DetailSwiper from './childComponents/DetailSwiper.vue'
import DetailBaseInfo from './childComponents/DetailBaseInfo.vue'

import {getDetail} from '../../network/detail'
import {GoodsInfo} from '../../network/detail'

export default {
  components: { DetailNavBar, DetailSwiper, DetailBaseInfo },

  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goodsInfo: {}
    }
  },
  created() {
    // 1. 保存传入的iid
    this.iid = this.$route.params.iid
    // 2. 根据iid请求详情数据
    getDetail(this.iid).then(res => {
      console.log(res)
        // 获取顶部图片轮播数据
      this.topImages = res.result.itemInfo.topImages
        // 获取详情页商品数据
      this.goodsInfo = new GoodsInfo(res.result.itemInfo,res.result.columns,res.result.shopInfo.services)
    })
  }
}
</script>

<style>

</style>