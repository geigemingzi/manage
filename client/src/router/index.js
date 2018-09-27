import Vue from 'vue'
import Router from 'vue-router'
// 注册路由
Vue.use(Router)

import home from '@/components/home';
import login from '@/components/login';
import goodsControl from '@/components/goodsControl';
import userControl from '@/components/userControl';
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/userControl',
      name: 'userControl',
      component: userControl
    },
    {
      path: '/goodsControl',
      name: 'goodsControl',
      component: goodsControl
    }
  ]
})
