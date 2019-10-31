<template>
    <tr>
        <td colspan="9" style="padding:10px;">
            <table cellpaddin="0" cellspacing="0" border="1"  style="width:100%;border-collapse: collapse;border:1px solid #ccc;">
                <tr style="height:40px;" valign="center">
                    <td colspan="6" style="padding-left:10px;" >
                        <button>回退</button> <button>任务说明</button>
                    </td>
                </tr>
                <tr style="color:#1890FF;height:40px;background-color:#d7eeff;" align="center" valign ="center">
                    <td>序号</td>
                    <td>报告编号</td>
                    <td>项目名称</td>
                    <td>主检人</td>
                    <td>流转信息</td>
                    <td>操作</td>
                </tr>
                <Tabltems v-for="(item,ind) in child" :key="ind" :item="item" :index="ind"></Tabltems>
            </table>
        </td>
    </tr>
</template>

<script>
import Tabltems from './Tabitems.vue'
export default {
    props:['child'],
    data() {
        return {
            flag:false
        }
    },
    components:{
        Tabltems
    }
}
</script>

<style lang="scss" scoped>

</style>