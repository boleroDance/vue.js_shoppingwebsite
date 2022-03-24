import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import toast from './components/common/toast/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
// 导入axios
import axios from 'axios'
import VueAxios from 'vue-axios';

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'


Vue.config.productionTip = false
// 添加事件总线对象
Vue.prototype.$bus = new Vue()

// 安装toast插件
// vue.use(toast) 等于调用toast对象的install函数
Vue.use(toast)

// 解决移动端300毫秒延迟
FastClick.attach(document.body)
// 使用懒加载插件
Vue.use(VueLazyLoad, {
  // options
  // loading 占位图
  loading:require('./assets/image/common/placeholder.png')
})

Vue.use(router)
// 使用element ui
Vue.use(ElementUI);
// 使用axios
Vue.use(VueAxios, axios)


new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
