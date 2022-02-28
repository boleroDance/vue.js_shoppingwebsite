<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" :key="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
  
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
    //监听图片加载,图片一旦加载，scroll就刷新一次
    imageLoad() {
      if(this.$route.path.includes('/home')){
        this.$bus.$emit('homeItemImageLoad')
      }else if(this.$route.path.includes('/detail')){
        this.$bus.$emit('detailItemImageLoad')
      }
    },
    // 监听item点击，跳转详情页
    itemClick() {
      // 跳转详情页路由
      this.$router.push('/detail/'+ this.goodsItem.iid)
    }
  }
}
</script>

<style scoped>
  .goods-item {
    padding-bottom: 70px;

    width: 46%;
    position: relative;
  }

  .goods-item img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 2px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect {
    position: absolute;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("../../../assets/image/common/collect.svg") 0 0/14px 14px;
  }
</style>