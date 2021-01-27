import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/components/pages/login'),
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/',
    component: () => import(/* webpackChunkName: "home" */ '../components/common/home.vue'),
    children: [
      {
        path: '/dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '../components/pages/Dashboard.vue'),
        meta: { title: '系统首页' }
      }
    ]
  },
  // {
  //   path: '*',
  //   component: '/404'
  // }
]

export default new Router({
  routes,
  strict: process.env.NODE_ENV !== 'production',
})
