<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" 
    :key="item" 
    class="tab-control-item"
    :class="{pinkactive: index === currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles:{
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      // console.log(index)
      this.currentIndex = index
    }
  }
}
</script>

<style>
  .tab-control {
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
  }
  .tab-control-item {
    flex: 1;
  }

  .pinkactive {
    color: var(--color-high-text);
    border-bottom: 3px solid var(--color-tint);
  }
</style>