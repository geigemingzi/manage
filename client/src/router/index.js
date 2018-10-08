import Vue from 'vue'
import Router from 'vue-router'
// 注册路由
//调用Vue.use手动安装，之后才能在实例中通过this.$route访问
Vue.use(Router)

import home from '@/components/home';
import login from '@/components/login';
import goodsControl from '@/components/goodsControl';
import userControl from '@/components/userControl';
import myinfo from '@/components/myinfo';
import myset from '@/components/myset';
import editgoods from '@/components/editgoods';
import addgoods from '@/components/addgoods';
export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home,
      props: true,
      children: [
         {  
          //  嵌套路由的path 不用加 ‘ / ’ 号
            path: 'userControl',
            name: 'userControl',
            component: userControl
          },
          {
            path: 'goodsControl',
            name: 'goodsControl',
            component: goodsControl,
            props:true
          },
          {
            path: 'myinfo',
            name: 'myinfo',
            component: myinfo,
            props: true
          },
          {
            path: 'myset',
            name: 'myset',
            component: myset
          },
          {
            path: 'editgoods',
            name: 'editgoods',
            component: editgoods,
            props: true
          },
          {
            path: 'addgoods',
            name: 'addgoods',
            component: addgoods
          }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      props: true
    }
  ]
})
