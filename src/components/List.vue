<template>
   <tbody colspan="9">
        <tr style="height:40px;" align="center" valign ="center">
           <td>
               {{num}}<input type="checkbox" />
           </td>
           <td>{{item.num}}</td>
          <td>{{item.type}}</td>
          <td>{{item.danwei}}</td>
          <td>{{item.name}}</td>
          <td>{{item.guige}}</td>
          <td>{{item.keshi}}</td>
          <td>{{item.fenlei}}</td>
          <td><span style="color:blue;" @click="flag=!flag">浏览</span> || <span style="color:blue;">编辑</span></td>
        </tr>
        <TabItem :child="item.children" v-show="flag" />
   </tbody>
   
</template>
<script>
import TabItem from './TableItem.vue'
export default {
    props:{
        data: Array
    },
    data () {
        return {
            flag:false
        }
    },
    computed:{
        num(){
            return this.index+1<10?'0'+(this.index+1):this.index
        }
    },
    components:{
        TabItem
    }
}
</script>
<style lang="scss" scoped>

</style>