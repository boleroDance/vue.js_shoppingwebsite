import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Shopcart = () => import('../views/shopcart/Shopcart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')
const Login = () => import('../views/login/Login')
const Register = () => import('../views/register/Register')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    name: "Home",
    meta:{
      title:'首页'
    }
  },
  {
    path: '/category',
    component: Category,
    meta:{
      title:'分类'
    }
  },
  {
    path: '/shopcart',
    component: Shopcart,
    meta:{
      title:'购物车'
    }
  },
  {
    path: '/profile',
    component: Profile,
    name: "Profile",
    meta:{
      title:'我的'
    }
  },
  {
    path: '/detail/:iid',
    component: Detail,
    meta:{
      title:'详情'
    }
  },
  {
    path: '/login',
    component: Login,
    name: 'Login'
  },
  {
    path: '/register',
    component: Register,
    name: 'register'
  }
]
const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.matched[0].meta.title
  next()
})
export default router