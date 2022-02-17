<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="left" class="back" @click="backClick">
        <img src="../../../assets/image/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" v-bind:key="index" 
        class="title-item" :class="{active: index === currentIndex}"
        @click="titleItemClick(index)"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "../../../components/common/navbar/NavBar.vue";
export default {
  components: { NavBar },
  name: "DetailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    titleItemClick(index) {
      this.currentIndex = index
      this.$emit('titleClick', index)
    },
    backClick() {
      this.$router.back()
    }
  }
};
</script>

<style scoped>
  .nav-bar {
    position: relative;
    z-index: 999;
    background-color: #fff;
  }
  .title {
    display: flex;
    font-size: 13px;
  }
  .title-item {
    flex: 1;

  }
  .active {
    color: var(--color-high-text)
  }
  .back img {
    margin-top: 10px;
  }
</style>