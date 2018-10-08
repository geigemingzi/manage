<template>
    <div id="app">
        <el-container>
            <el-header>
                欢迎<span>{{myinfo.username}}</span>登录XX管理系统
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu class="el-menu-vertical-demo" 
                        background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                        
                        <el-menu-item v-for="(tab,idx) in tabs" index="idx" :key="idx" >
                            <span slot="title" @click="skip(tab.id, myinfo)">{{tab.title}}</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
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
import '../sass/home.scss';
// 引入axios
import axios from 'axios';
Vue.prototype.$axios = axios;

export default {
    // 接收参数 login传过来的用户信息
    data(){
        return {
            tabs:[
                {
                    title: '用户中心',
                    id: 'myinfo'
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
                    id: 'myset'
                }
            ],
            myinfo: this.$route.params.userdata,
        }
    },
  methods: {
    // 实现路由跳转
    skip(id, message){
      this.$router.push({name:id, params:{message}})
    }
  },
  created(){
      console.log(this.$route.params.userdata)
  }
}
</script>