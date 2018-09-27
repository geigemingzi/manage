<template>
  <div id="app">
    <el-menu  class="el-menu-demo" mode="horizontal" >
      <!-- @click.native 是监听组件根元素 -->
    <el-menu-item v-for="(item, idx) in tabs" index="idx" @click.native="skip(item.id)" :key="idx">{{item.title}}</el-menu-item>
  </el-menu>
    <div>
      
      <router-view/>
    </div>
  </div>
</template>

<script>
// 引入组件
import Vue from 'vue';
import Element from 'element-ui';
//注册
Vue.use(Element);
// 单独引入element-ui的样式   会自己在moudul目录下开始找
import 'element-ui/lib/theme-chalk/index.css';

// 引入axios
import axios from 'axios';
Vue.prototype.$axios = axios;

export default {
  data(){
    return {
      tabs:[
        {
          title: '用户中心',
          id: 'login'
        },
        {
          title: '商品管理',
          id: 'goodsControl'
        },
        {
          title: '用户管理',
          id: 'userControl'
        },
        {
          title: '系统首页',
          id: 'home'
        }
      ]
    }
  },
  methods: {
    // 实现路由跳转
    skip(id){
      this.$router.push({name:id})
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>