import Cookies from 'js-cookie'
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'
import store from '../store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '*',
    name: 'notFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.meta?.isNotLogin) {
    if (Cookies.get('access_token')) {
      location.href = '/'
      return
    }
    next()
    return
  }
  if (!store.getters['beAuth/isLogin']) {
    router.push({ name: 'login' })
    Cookies.remove('access_token')
    Cookies.remove('refresh_token')
    location.href = '/login'
  }
  next()
})

export default router
