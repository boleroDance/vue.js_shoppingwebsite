<template>
  <div id="detail">
      <detail-nav-bar></detail-nav-bar>
      <scroll 
      class="content"
      :probeType="3"
      :pullUpLoad="true"
      ref="scroll"  
      >
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goodsInfo="goodsInfo"></detail-base-info>
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <detail-image-info :detailInfo="detailInfo"></detail-image-info>
      <detail-param-info :paramInfo="itemParams"></detail-param-info>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComponents/DetailNavBar.vue";
import DetailSwiper from "./childComponents/DetailSwiper.vue";
import DetailBaseInfo from "./childComponents/DetailBaseInfo.vue";
import DetailShopInfo from './childComponents/DetailShopInfo.vue';
import DetailImageInfo from './childComponents/DetailImageInfo.vue';
import DetailParamInfo from './childComponents/DetailParamInfo.vue';

import { getDetail } from "../../network/detail";
import { GoodsInfo } from "../../network/detail";
import Scroll from "../../components/common/scroll/Scroll.vue";

export default {
  components: { DetailNavBar, DetailSwiper, DetailBaseInfo, Scroll, DetailShopInfo, DetailImageInfo, DetailParamInfo },

  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goodsInfo: {},
      shopInfo: {},
      detailInfo: {},
      itemParams: {}
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
    });
  },
};
</script>

<style scoped>
.detail {
  height: 100vh;
  position: relative;
  z-index: 999;
  background-color: #fff;
}

.content {
  background-color: #fff;
  /* height: calc( 100% - 44px); */
  height: 574px;
  overflow: hidden;
}
</style>