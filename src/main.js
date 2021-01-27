// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

//引入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//iconfont
import './assets/icon/iconfont.css'

Vue.use(ElementUI);

//import 'lib-flexible'

Vue.config.productionTip = false

// import { getToken } from '@/utils/auth'
// //使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
//   if (to.path !== '/login' && getToken('token')) {
//     next('/login');
//   } else {
//     next();
//   }
// });


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
