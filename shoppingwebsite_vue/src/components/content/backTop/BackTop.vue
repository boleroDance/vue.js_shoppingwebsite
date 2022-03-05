<template>
  <div class="back-top">
    <img src="../../../assets/image/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'BackTop'
}
</script>

<style>
  .back-top {
    position: fixed;
    right: 10px;
    bottom: 70px;
    z-index: 999;
  }
  .back-top img {
    width: 43px;
    height: 43px;
  }
</style>