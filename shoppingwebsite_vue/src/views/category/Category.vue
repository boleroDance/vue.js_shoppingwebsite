<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="cateBox">
      <div class="cateType">
        <ul>
          <li v-for="(item, index) in typeList" :key="index"
          :class="{active: nowIndex == index}"
          @click="typeClick(index, item.maitKey, item.miniWallkey)"
          >
            {{ item.title }}
          </li>
        </ul>
      </div>

      <scroll 
      class="goods-content"
      :probe-type="3"
      ref="scroll"
      :pullUpLoad="true"
      >
        
          <div class="goods-type">
            <div
              class="good-type-item"
              v-for="(item, index) in subCateList"
              :key="index"
            >
              <img :src="item.image" alt="" />
              <span class="small">{{ item.title }}</span>
            </div>
          </div>
          <goods-list :goods="goodsList"></goods-list>
     

      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar.vue";
import Scroll from "../../components/common/scroll/Scroll.vue";
import GoodsList from "../../components/content/goods/GoodsList.vue";

import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from "../../network/category";

export default {
  components: { NavBar, GoodsList, Scroll },
  name: "Category",
  data() {
    return {
      typeList: [],
      nowIndex: 0,
      subCateList: [],
      goodsList: [],
    };
  },
  
  mounted() {
    getCategory()
      .then((res) => {
        return (this.typeList = res.data.category.list);
      })
      .then((res) => {
        // 进入页面调用获取商品类型分类的方法
        this.getSubcategory(this.typeList[this.nowIndex].maitKey);
        // 类型分类中的商品
        this.getCategoryDetail(this.typeList[this.nowIndex].miniWallkey);
        this.$refs.scroll.scroll.refresh()
      });

      console.log(this.$refs.scroll.scroll)
      
  },
  methods: {
    typeClick(index, maitKey, miniWallkey) {
      console.log(index, maitKey, miniWallkey)
      this.nowIndex = index
      this.getSubcategory(maitKey)
      this.getCategoryDetail(miniWallkey)
      this.$refs.scroll.scroll.refresh()

    },
    //获取商品类型分类
    getSubcategory(maitKey) {
      getSubcategory(maitKey).then((res) => {
        this.subCateList = res.data.list;
      });
    },

    // 获取类型分类中的商品
    getCategoryDetail(miniWallkey) {
      getCategoryDetail(miniWallkey).then((res) => {
        this.goodsList = res;
        this.$refs.scroll.scroll.finishPullUp() 
        this.$refs.scroll.scroll.refresh()
      });
    },


  },
};
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  font-weight: 600;
  color: #fff;
}
#category {
  height: 100vh;
  position: relative;
}
.goods-content {
  height: 100%;
  overflow: hidden;
  flex: 8;
}

.cateBox {
  display: flex;
  position: absolute;
  top: 44px;
  bottom: 44px;
  left: 0;
  right: 0;
}
.cateType {
  flex: 4;
  font-size: 16px;
  text-align: center;
  background-color: rgb(247, 245, 247);
  color: rgb(119, 119, 119);
}
li {
  /* padding: 15px; */
  height: 36px;
  line-height: 36px;
}
/* .cateGoods {
  flex: 8;
} */
.goods-type {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.good-type-item {
  margin-top: 10px;
  margin: 10px 0;
  width: 30%;
  text-align: center;
}
.good-type-item img {
  width: 96%;
}
.active {
  font-weight: 550;
  background-color: #fff;
  border-left: 4px solid var(--color-high-text);
  color: var(--color-high-text);
}
</style>