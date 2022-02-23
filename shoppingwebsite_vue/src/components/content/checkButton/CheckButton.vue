<template>
  <div class="check-button">
    <div class="icon-selector">
      <img src="../../../assets/image/cart/tick.svg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckButton"
}
</script>

<style scoped>
  .icon-selector {
    position: relative;
    margin: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;
  }
</style>