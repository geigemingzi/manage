<template>
     <div>
        <h4>添加商品</h4>
        <el-form label-width="80px">
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
                <el-button type="primary">保存</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form> 
    </div>
</template>
<script>
export default {
    data(){
        return {
            goods: {
                id: "",
                category: "",
                imgurl: "",
                price: "",
                oldprice: ""
            }
        }
    },

    methods: {
        addgoods(){
            this.$axios.post('/api/insert', {goods: thisgoods})
        }
    }
}
</script>

