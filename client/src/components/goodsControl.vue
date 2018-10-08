<template>
    <div>
        <!-- 表格 -->
        <!-- <el-table ref="multipleTable" :data="goodslist" style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="id" label="商品编号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="category" label="商品类型" show-overflow-tooltip></el-table-column>
            <el-table-column prop="price" label="商品价格" show-overflow-tooltip></el-table-column>
            <el-table-column prop="oldprice" label="原价" show-overflow-tooltip></el-table-column>
            <el-table-column prop="name" label="商品名称" show-overflow-tooltip></el-table-column>
            
                    <el-button type="primary">编辑</el-button>
                    <el-button type="danger">删除</el-button>
            
        </el-table> -->
        <div class="headerbox">
            <div class="seek" style="margin-top: 15px;">
                <el-input placeholder="请输入商品类型">
                    <template slot="append">搜索</template>
                </el-input>
            </div>
            <div class="add">
                <el-button type="success" @click="toadd()">添加新商品</el-button>
            </div>
        </div>
        <table class="goodstable">
            <tbody>
                <tr>
                    <th>
                        <input type="checkbox"/>
                    </th>
                    <th>商品编号</th>
                    <th>商品类型</th>
                    <th>商品图片</th>
                    <th>商品价格</th>
                    <th>商品原价</th>
                    <th>商品名称</th>
                    <th>操作</th>
                </tr>
                 <tr v-for="(goods,idx) in goodslist" :key="goods.idx">
                    <td>
                        <input type="checkbox"/>
                    </td>
                    <td>{{goods.id}}</td>
                    <td>{{goods.category}}</td>
                    <td>{{goods.imgurl}}</td>
                    <td>{{goods.price}}</td>
                    <td>{{goods.oldprice}}</td>
                    <td>{{goods.name}}</td>
                    <td>
                        <el-button type="primary" size="mini" @click="toedit(idx,goods)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="goodsDelete(idx,goods.id)">删除</el-button>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- 页码 -->
        <el-pagination background layout="prev, pager, next" v-on:current-change="getgoods" :total="50"></el-pagination>
    </div>
</template>
<script>
import '../sass/goods.scss';
export default {
    data(){
        return {
            // 存贮数据
            goodslist:[],
            maxpage:''
        }
    },
    methods: {
        getgoods(page){
            // 分页获取
            this.$axios.post('/api/paging', {
                page: page
            }).then(res=>{
                var goodspage = res.data.goodslist;
                this.goodslist = [];
                this.goodslist.push(...goodspage);
                this.maxpage = res.data.maxpage
            })
        },
        // 删除
        goodsDelete(idx,id){
           
            this.goodslist.splice(idx,1)
            this.$axios.post('/api/delete', {id:id});
        },
        // 编辑 
        toedit(idx,goods){
            console.log(idx,goods)
            this.$router.push({name:'editgoods', params:{goods}})
        },
        // 增加
        toadd(){
             this.$router.push({name:'addgoods'})
        }
        
    },
    created(){
        this.getgoods();
    }
}
</script>