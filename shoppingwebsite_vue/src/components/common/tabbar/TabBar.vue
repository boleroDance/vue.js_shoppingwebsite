<template>
  <div id="tab-bar">
     <slot></slot>
   </div>
</template>

<script>
export default {

}
</script>

<style>
  #tab-bar {
    display: flex;
    width: 100%;
    background-color: #f6f6f6;
    position: fixed;
    bottom: 0;
    box-shadow: 0 -1px 1px rgba(0, 0, 0, .1);
  }

  
</style>