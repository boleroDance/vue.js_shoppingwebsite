<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
      <slot name="user-icon">
        <img class="left" src="../../../assets/image/common/profile.svg" alt="">
      </slot>
      <div class="login-info left">
        <slot name="user-nickname">
          <div>登陆/注册</div>
        </slot>
        <div class="phone">
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "userInfo",
};
</script>

<style scoped>
  #user-info {
    background-color: var(--color-tint);
    padding: 15px;
    margin-top: -5px; 
  }
  #user-info img {
    width: 60px;
    height: 60px;
  }
  .left {
    float: left;
  }
  
  #user-info .login-info {
    color: #fff;
    margin: 10px 0 0 10px;
    width: 98px;
  }
#user-info .login-info .phone {
    position: relative;
    font-size: 13px;
    margin-top: 5px;
    font-weight: 300;
  }
</style>