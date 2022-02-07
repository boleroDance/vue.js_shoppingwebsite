<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt="">
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
  }
}
</script>

<style>
  .goods-item {
    padding-bottom: 60px;

    width: 100%;
    position: relative;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 13px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: 191px;
    width: 14px;
    bottom: 2px;
    height: 14px;
    background: url("../../../assets/image/common/collect.svg") 0 0/14px 14px;
  }
</style>