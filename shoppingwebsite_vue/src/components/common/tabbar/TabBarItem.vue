<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :class="{ active: isActive}">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {                                                
    path: String
  },
  data() {
    return {
      // isActive: true,
    };
  },
  computed: {
    isActive() {
      // return this.$route.path == this.path  // this.$route 当前路由对象 判断活跃路由的path是否为传进来的path
      return this.$route.path.includes(this.path) 
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path).catch(err => err)     //this.$router 全局的路由器对象 
    },
  },
};
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}

.active {
  color: rgb(255, 87, 119);
}
</style>