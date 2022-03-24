<template>
  <div id="app">
    <keep-alive exclude="Profile">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar v-show="isShow"></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from './components/content/mainTabbar/MainTabBar.vue';


export default {
  components: { MainTabBar },
  name: "App",
  data() {
    return {};
  },
  mounted() {
    /**
     * 解决 css 引入图片在 github pages 无法获取的问题
     */
    const { NODE_ENV } = process.env;
    document.documentElement.className = NODE_ENV;

  },
  computed: {
    isShow() {
      return !this.$route.path.includes('/detail')
    }
  }
};
</script>

<style>
@import "assets/css/base.css";
</style>
