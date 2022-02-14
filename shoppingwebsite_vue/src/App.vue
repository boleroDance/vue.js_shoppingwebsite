<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
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
};
</script>

<style>
@import "assets/css/base.css";
</style>
