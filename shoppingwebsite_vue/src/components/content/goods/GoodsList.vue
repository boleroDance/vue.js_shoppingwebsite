<template>
  <div class="goods">
    <goods-list-item v-for="(item,index) in goods" :key="index" :goods-item="item"></goods-list-item>
   
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'

export default {
  name: "GoodsList",
  components: {
    GoodsListItem

  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style>
  .goods {
    display: flex; 
    /* flex-wrap设置是否换行 */
    flex-wrap: wrap; 
    /* 设置间距均等分 */
    justify-content: space-evenly;
    padding-top: 6px;
  }




</style>