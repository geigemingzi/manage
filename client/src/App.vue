<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// 引入组件
import Vue from 'vue';
import Element from 'element-ui';
//注册
Vue.use(Element);
// 单独引入element-ui的样式   会自己在moudul目录下开始找
// import 'element-ui/lib/theme-chalk/index.css';
// 引入axios
import axios from 'axios';
Vue.prototype.$axios = axios;

export default {

}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>