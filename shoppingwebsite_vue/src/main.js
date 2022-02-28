import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import toast from './components/common/toast/index'

import FastClick from 'fastclick'

Vue.config.productionTip = false
// 添加事件总线对象
Vue.prototype.$bus = new Vue()

// 安装toast插件
// vue.use(toast) 等于调用toast对象的install函数
Vue.use(toast)

// 解决移动端300毫秒延迟
FastClick.attach(document.body)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
