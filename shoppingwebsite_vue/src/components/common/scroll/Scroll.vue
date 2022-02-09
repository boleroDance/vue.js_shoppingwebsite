<template>
<!-- ref 获取元素对象或组件对象 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
    <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper,{
      observerDOM: true,
      click: true,
      mouseWheel: true,
      probeType: 3
      
    })
    // 定位方法
    // this.scroll.scrollTo(0, 0, speed)
  },
  methods: {
    scrollTo(x,y,time) {
      this.scroll.scrollTo(x,y,time)
    }
  }
}
</script>

<style>

</style>