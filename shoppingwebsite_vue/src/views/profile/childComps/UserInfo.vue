<template>
  <div id="user-info">

    <div class="clear-fix" v-if="!this.$store.state.token">
      <img class="left" src="../../../assets/image/common/profile.svg" alt="">
      <div @click="loginClick" class="login-info left">
          <div>登陆/注册</div>
        <div class="phone">
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
    </div>

    <div class="clear-fix" v-else>
      <img class="left" src="../../../assets/image/common/login-profile.svg" alt="">
      <div class="login-info left">
          <div>用户名</div>
        <div class="phone">
          <slot name="user-phone">{{userName}}</slot>
        </div>
      </div>
      <div class="logout-info right">
        <img class="right" src="../../../assets/image/common/logout.svg" alt=""> 
        <div @click="logoutClick" class="logout-text">退出登陆</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "userInfo",
  methods: {
    loginClick() {
      this.$emit('login-click')
    },
    logoutClick() {
      this.$emit('logout-click')
    }
  },
  computed: {
    userName() {
      return setTimeout(() => {
        return this.$store.state.userinfo.name
      }, 1000);
    }
  }
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
  
  .right {
    float: right;
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
#user-info .logout-info {
  color: #fff;
  width: 110px;
}
#user-info .logout-info .logout-text {
  padding-top: 10px;
  
}
 #user-info .logout-info img {
    width: 40px;
  
  }
</style>