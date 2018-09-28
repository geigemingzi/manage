<template>
    <div>
        <button @click='login()'>测试</button>
    </div>
</template>
<script>
export default {
    methods:{
        login(){
            this.$axios('/api/login?username=22&password=22').then(function(res){
                console.log(res)
            })
        }
    }
}
</script>