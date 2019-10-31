<template>
    <tbody >
        <tr style="color:#1890FF;height:40px;" align="center" valign ="center">
            <td>{{ind+1}}</td>
            <td>{{item.num}}</td>
            <td>{{item.xinname}}</td>
            <td>{{item.name}}</td>
            <td><span style="color:blue;" @click="()=>{
                    if(item.children){
                        flag=!flag
                    }
                }">流转</span></td>
            <td>操作</td>
        </tr>
        <Tablist  :children="item.children" v-show="flag"/>
    </tbody>
</template>
<script>
import Tablist from'./Tablist.vue'
export default {
    props:['item','ind'],
    data(){
        return {
            flag:false
        }
    },
    components:{
        Tablist
    }
}
</script>
<style lang="scss" scoped>

</style>