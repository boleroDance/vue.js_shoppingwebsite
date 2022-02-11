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

# 初始工作

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

# 首页开发

## navigation bar组件

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

## 首页数据请求

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

## 首页轮播图

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


## recommend

+ RecommendView.vue 中，将recommends数据通过props从home.vue传过来
+ v-for循环遍历展示

## tabcontrol组件封装

+ 项目内重复使用，放入components -> content 内
+ 不同页面仅文字不同，无需使用插槽
+ 使用组件通过props将titles传过来

+ div>根据titles 遍历 div -> span{{title}}
+ 绑定tab点击事件
  + 定义currentIndex保存index

## 首页商品数据请求

#### 保存数据的变量

+ 流行 - 'pop'
+ 新款 - 'new'
+ 精选 - 'sell'
+ 数据结构

```
goods: {
	'pop': {page: 记录数据库页数, list: [记录数据]},
	'new': {page: 1, list: [...]},
	'sell': {page: 1, list: [...]}
}
```

+ 在home.js中封装getHomeTabData(type, page)
+ 组件一经创建 created() 分别调
  + this.getHomeTabData('pop')
  + this.getHomeTabData('new')
  + this.getHomeTabData('sell')
+ 在Home.vue中, 在methods中getHomeTabData(type)
+ 获取到数据
  + this.goods[type].list.push(...res.data.list)
  +  this.goods[type].page += 1

#### 监听tab点击，分别进行展示

+ 记录index，首页根据index发送对应数据

  + 子传父 this.$emit('itemClick', index)

  + 首页接收

    + 定义变量currentType记录type
    + \<goods-list :goods="goods[currentType].list"\</goods-list>
  + swith(index) {case 0: this.currentType = 'pop' break case1: ...}
  
+ GoodsList.vue中，通过props接收首页数据

  + goods: {

    ​	type:Array,

    ​	default() {

    ​		return []

    ​	}

    }

  + v-for="(item,index) in goods

+ GoodsListItem.vue 中，取出数据，通过div/span/img标签进行展示

## 对滚动进行重构 

### Better-Scroll

+ 解决移动端、PC各种滚动场景需求的插件

+ [官方文档](https://better-scroll.github.io/docs/zh-CN/guide/#betterscroll-%E6%98%AF%E4%BB%80%E4%B9%88)

+ npm install @better-scroll/core  --save

### 在index.html中使用better-scroll

+ 导入core.js 库
+ const  bscroll = new BScroll(document.querySelector('.wrapper'), { options})

+ better-scroll 监听滚动

  + 默认情况下，BScroll无法实时监听，需要传入参数

  + probeType: 0/1/2(监听手指滚动)/3(监听所有滚动)

  + bscroll.on('scroll',(position) => {

       console.log(position)

      })

+ better-scroll 上拉加载

### 在vue中使用better-scroll

+ npm install --save better -scroll -S @better-scroll/pull-up
+ 使用

```
import BScroll from 'better-scroll'
import Pullup from '@better-scroll/pull-up'
BScroll.use(Pullup)

data() {
return {
	scroll: null
}
}

mouted() {
	this.scroll = new BScroll('.wrapper',{
      probeType: 3,
      pullUpLoad: true,
    })
    // this.scroll.on('scroll',(position) => {
    //   console.log(position)
    // })
    this.scroll.on('pullingUp', () => {
      console.log('上拉加载')
    })
}
```

+ 对better-scroll进行封装

  + Scroll.vue  

    ```
    <template>
      <div class="wrapper" ref="wrapper">   // 通过ref定位元素：new BScroll(this.$refs.wrapper,{...})
        <div class="content">
        <slot></slot>
        </div>
      </div>
    </template>
    
    setTimeout(() => {this.scroll = new BScroll(this.$refs.wrapper, {
          observerDOM: true,
          click: true,
          probeType: 3
        })
        }, 1000);
      },
    ```
  
  + Home.vue
  
    ```
    <template>
    	 <div id="home" class="wrapper">
    	 	...
    	 	<scroll class="content">
    	 		...
    	 	</scroll> 
    	 </div>
    </template>
    
    <style scoped>
    	.content {
     		 height:...;
     	 	overflow: hidden;
    	}
    </style>
    ```

### 回到顶部BackTop

+ 封装BackTop.vue组件

+ 监听组件点击，注意监听组件需加修饰符.native
  + <back-top @click.native="backTopClick">\</back-top>
  + scroll中提供回到顶部方法
    + scroll对象, scroll.scrollTo(x, y, time)
    + 通过refs拿到子组件的对象
      + this.$refs.scroll.scrollTo(0, 0)
  
+ 显示和隐藏

  + 组件内监听滚动，通过$emit传出去

    + this.scroll.on('scroll', (position) => {

      ​	this.$emit('scroll', position)

      })

  + 首页通过@scroll自定义事件接收

    + @scroll="contentScroll"
    + showBackTop = false

    + contentScroll(position) {

         if(position.y < -666) {

      ​    this.showBackTop = true

         }else {

      ​    this.showBackTop = false

         }

        }

### 上拉加载更多功能

+ 在Scroll.vue 中监听上拉

  + import PullUp from '@better-scroll/pull-up'

  + BScroll.use(PullUp)

  + this.scroll.on('pullingUp', () => {

    ​	this.$emit('pullingUp')

    })

  + props: {

    ​	...

    ​	pullUpLoad: {

    ​		type: Boolean,

    ​		default: false

    ​	}

    }

+ Home中加载更多数据

  + :pullingLoad= "true"

  + @pullingUp = "loadMore"

  + loadMore() {

    ​	this.getHomeTabData(this.currentType)

    ​    this.$refs.scroll.scroll.refresh()  // better—scroll重新计算高度

    }

  + 数据请求完成后 this.$refs.scroll.scroll.finishPullUp()

