<template>
    <div>
        <h4>商品编辑</h4>
        <el-form >
            <el-form-item label="商品编号">
                <el-input v-model="goods.id"></el-input>
            </el-form-item>
            <el-form-item label="商品类型">
                <el-input v-model="goods.category"></el-input>
            </el-form-item>
            <el-form-item label="商品图片">
                <el-input v-model="goods.imgurl"></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
                <el-input v-model="goods.price"></el-input>
            </el-form-item>
            <el-form-item label="商品原价">
                <el-input v-model="goods.oldprice"></el-input>
            </el-form-item>
            <el-form-item label="商品名称">
                <el-input v-model="goods.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addgoods()">保存更改</el-button>
                <el-button @click="cancel()">取消</el-button>
            </el-form-item>
        </el-form> 
    </div>
</template>
<script>
export default {
    data(){
        return {
            // 获取路由传过来的参数
            goods: this.$route.params.goods
        }
    },
    methods: {
        // 保存是 修改数据库
        addgoods(){
            console.log(this.goods)
            this.$axios.post('/api/updata', {addgoods:this.goods})
        },
        // 取消时返回列表
        cancel(){
            this.$router.push({name:'goodsControl'})
        }
    }
}
</script>

