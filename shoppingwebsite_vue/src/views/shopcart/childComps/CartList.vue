<template>
  <div class="cart-list">
    <div>
      <cart-list-item 
      v-for="(item, index) in cartList" :key="index"
      :itemInfo="item"
      ></cart-list-item>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CartListItem from "./CartListItem.vue";

export default {
  components: { CartListItem },
  name: "CartList",
  computed: {
    ...mapGetters(["cartList"]),
  },
};
</script>

<style scoped>
</style>