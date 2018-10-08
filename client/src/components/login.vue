<template>
    <div class="loginbox form">
        <h3>XX后台管理系统登录</h3>
        <el-form label-width="80px" >
            <el-form-item label="用户名">
                <el-input v-model="username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="password"></el-input>
            </el-form-item>
            <el-form-item label="">
                 <el-button type="primary" @click="login()">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
// 引入组件
import Vue from 'vue';
import Element from 'element-ui';
//注册
Vue.use(Element);
// 单独引入element-ui的样式   会自己在moudul目录下开始找
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'element-ui/lib/theme-chalk/index.css';
import '../sass/login.scss';

export default {
    data(){
        return {
            username: null,
            password: null
        }
    },
    methods:{
        login(){
            // console.log(this);
            // 用变量存贮this
            var $this = this;
            // 请求
            this.$axios.post('/api/login', {username: this.username, password: this.password}).then( function(res){
                // 用户信息
                var userdata = res.data.data[0];
                // 登录成功后路由跳转页面
                if(res.data.success){
                    //  console.log(this);
                    //跳转并传参数
                    $this.$router.push({name:'home', params: {userdata}})
                }
            })
        }
    }
}
</script>