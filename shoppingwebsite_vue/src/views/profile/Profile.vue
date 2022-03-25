<template>
  <div id="profile">
    <nav-bar class="profile-nav">
      <div slot="center">商城</div>
    </nav-bar>
    <user-info @login-click="loginClick" @logout-click="logoutClick"></user-info>
    <!-- 账户部分没有单独封装：不同的地方太多, 需要传过多的参数 -->
    <section class="account">
      <div class="account-item">
        <div class="number"><span class="balance">0.00</span>元</div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number"><span class="balance">0</span>个</div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number"><span class="balance">0</span>分</div>
        <div class="account-info">我的积分</div>
      </div>
    </section>
    <list-view :listData="orderList" class="order-list"></list-view>
    <list-view :listData="serviceList" class="service-list"></list-view>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar.vue";
import ListView from './childComps/ListView.vue';
import UserInfo from "./childComps/UserInfo.vue";
import { MessageBox, Message } from 'element-ui';

export default {
  name: "Profile",
  components: {
    NavBar,
    UserInfo,
    ListView,
  },
  data: function() {
    return {
      orderList: [
        {icon: '#order', iconColor:'#ff8198', info:'我的消息'},
        {icon: '#point', iconColor:'#fc7b53', info:'积分商城'},
        {icon: '#vip', iconColor:'#fc7b53', info:'会员卡'}
      ],
      serviceList: [
        {icon: '#service', iconColor: '#ff8198', info: '我的购物车'},
        {icon: '#download', iconColor: '#ff8198', info: '下载购物APP'},
      ]
    }
  },
  methods: {
    loginClick() {
      this.$router.push('/login')
    },
    logoutClick() {
      // 退出登陆
      // 发请求，服务器清除数据【token -> 本地清除数据【userinfo，token等
      MessageBox.confirm('您确认退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('userLogout')
        .then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        });     
      })

    // this.$store.dispatch('userLogout')
    //   .then( res => {
    //     this.$message.success('您已退出登陆')
    //     this.$router.push('/home')
    //   })

    }
  },
  
  mounted() {
    console.log('加载完成')
    // 组件加载完毕后（登录操作完成）向服务器要用户信息
    this.$store.dispatch('getUserInfo')
    
  }

};
</script>

<style scoped>
.profile-nav {
  background-color: var(--color-tint);
  color: #fff;
}
.account {
  display: flex;
}
.account .account-item {
  width: 100%;
  background-color: #fff;
  text-align: center;

  color: #666;
  font-size: 13px;
  padding: 18px;
}
.account-item .balance {
  font-size: 24px;
  font-weight: 700;
  color: #ff5f3e;
}
.account-info {
  margin-top: 6px;
}

.order-list, .service-list {
  margin-top: 12px;
  }

</style>