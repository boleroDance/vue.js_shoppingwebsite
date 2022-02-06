# shoppingwebsite_vue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

## 初始工作

### 划分目录结构

### 引用css文件

+ base.css
+ normalize.css

### 配置文件

#### vue.config.js

+ 配置路径

```
module.exports = {
  configureWebpack: {
    resolve: {
      extensions: [
        '.js','.vue','.json','.css','.scss'
      ],
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
      }
    }
  }
}
```

#### .editorconfig

### 引入tabbar模块

### 配置路由映射

### 更改favicon图标

在index页面中：

``link rel="icon" href="<%= BASE_URL %>favicon.ico"``，<%= BASE_URL %>为jsp语法，获取当前文件所在路径

## 首页开发

### navigation bar组件

+ NavBar.vue 封装

  ```
  export default {
    name: 'NavBar'
  }
  ```

+ 使用

  ```
  <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
  import NavBar from...
  	...
  export default {
  	...
  	components: {
      NavBar,
    	...
    },	
  }
  ```

### 首页数据请求

+ 封装request.js
+ home.js负责首页数据请求

+ Home.vue中请求数据

  ```
  data() {
  	// 保存res
      return {                          
        // result: null
        banners: [],
        recommends: []
      }
    },
  created() {                
      // 请求多个数据
      getHomeMultidata().then(res => {
        console.log(res)
        // this.result = res
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    }
  ```

### 首页轮播图

+ Home.vue -> HomeSwiper.vue组件树

+ HomeSwiper.vue 中，将banners数据通过props从home.vue传过来

+ v-for循环遍历展示

  ```
  <swiper-item v-for="(item, index) in banners" :key="index">
          <a :href="item.link">
            <img :src="item.image" alt="">
          </a>
       </swiper-item>
  ```

  
