import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Content from '../views/Content.vue'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import User from '../views/User.vue'
import Comment from '../views/Comment.vue'
import Sensitive from '../views/Sensitive.vue'
import AboutView from '../views/AboutView.vue'
import Data from '../views/Data.vue'
import AddProduct from '../views/store/AddProduct.vue'
import ShowProduct from '../views/store/ShowProduct.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/main',
    name: 'main',
    component: Main,
    children: [
      {
        path: '/about',
        name: 'about',
        component: AboutView
      },
      {
        path: '/home',
        name: 'home',
        component: HomeView
      },
      {
        path: '/user',
        name: 'user',
        component: User
      },
      {
        path: '/comment',
        name: 'comment',
        component: Comment
      },
      {
        path: '/sensitive',
        name: 'sensitive',
        component: Sensitive
      },
      {
        path: '/addProduct',
        name: 'addProduct',
        component: AddProduct
      },
      {
        path: '/showProduct',
        name: 'showProduct',
        component: ShowProduct
      },
      {
        path: '/data',
        name: 'data',
        component: Data
      },
      {
        path: '/content',
        name: 'content',
        component: Content
      },
      
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
