<template>
    <div>
        <div class="myinfobox">
            <h4>管理员信息</h4>
            <el-form ref="myinfo" :model="myinfo" label-width="80px">
                <el-form-item label="用户类型">
                    <el-select v-model="myinfo.role" placeholder="myinfo.role">
                    <el-option label="管理员"  value="管理员"></el-option>
                    <el-option label="超级管理员" value="超级管理员"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="myinfo.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="myinfo.password"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="myinfo.gender">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="手机">
                    <el-input v-model="myinfo.phone"></el-input>
                </el-form-item>
                <el-form-item label="头像">
                    <el-input v-model="myinfo.print"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="myinfo.email"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="myinfo.comment"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="upinfo()">保存</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>
<script>
export default {
    props:['message'],
    data(){
        return {
            // 接收用户信息
            myinfo: this.message
        }
    },
    methods: {
        upinfo(){
            this.$axios.post('/api/amend',{data: this.myinfo}).then(res => {
                console.log(res);
            });
        }
    }
}
</script>

<style>
    .myinfobox{
        border: 2px solid #666;
        background:#fee;
        padding:0 20px;
        width:400px;
        margin:0 auto;
    }
    h4{
        color:#aaf;
        padding-bottom:10px;
        font-size:24px;
    }
</style>