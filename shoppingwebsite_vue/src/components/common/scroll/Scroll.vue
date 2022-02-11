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
import PullUp from '@better-scroll/pull-up'

BScroll.use(PullUp)

export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // this.scroll = new BScroll(this.$refs.wrapper,{
    //   observerDOM: true,
    //   click: true,
    //   // mouseWheel: true,
    //   probeType: 3
    // })
  
    // 解决需刷新better scroll才起效果的bug 使用定时器
    setTimeout(() => {this.scroll = new BScroll(this.$refs.wrapper, {
      observerDOM: true,
      observeImage: true,
      click: true,
      // probeType: 3 影响性能，并非所有页面都需要监听滚动，因此设置props外部传入probeType值，默认为0 -》 不监听
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    })
    // 监听滚动位置
    this.scroll.on('scroll', (position) => {
      // console.log(position)
      // 将position通过$emit传出去，首页通过@scroll自定义事件接收
      this.$emit('scroll', position)
    })
    
    // 监听到底上拉事件
    this.scroll.on('pullingUp', () => {
      // console.log('上拉加载更多')
      this.$emit('pullingUp')
    })

    }, 1000);

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