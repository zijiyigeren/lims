<template>
     <table cellpaddin="0" cellspacing="0" border="1"  style="width:100%;border-collapse: collapse;border:1px solid #ccc;">
                   
        <tr style="color:#1890FF;height:40px;background-color:#d7eeff;" align="center" valign ="center">
            <td>序号<input type="checkbox"></td>
            <td>任务号</td>
            <td>状态</td>
            <td>受检单元</td>
            <td>样品名称</td>
            <td>样品规格型号</td>
            <td>科室</td>
            <td>类别</td>
            <td>操作</td>
        </tr>
        <List :data="data"/>
    </table>
</template>

<script>
import List from'@/components/List.vue'
import TableItem from './TableItem.vue'
export default {
    data(){
        return {
            data:[
                {
                    num:123654,
                    type:'检测报告',
                    danwei:'广汽本田汽车有限公司',
                    name:'汽车到车灯',
                    guige:'',
                    keshi:'业务发展部',
                    fenlei:'ZY',
                    children:[
                        {
                            num:123654,
                            xinname:'汽车到车灯',
                            name:'崔小川',
                            children:[
                                {
                                    type:'下达任务',
                                    name:'wd-yhx',
                                    startDate:'2019-01-08 16:26:23:54',
                                    endDate:'2019-01-08 16:26:23:54'
                                },
                                {
                                    type:'下达任务',
                                    name:'wd-yhx',
                                    startDate:'2019-01-08 16:26:23:54',
                                    endDate:'2019-01-08 16:26:23:54'
                                },
                                {
                                    type:'下达任务',
                                    name:'wd-yhx',
                                    startDate:'2019-01-08 16:26:23:54',
                                    endDate:'2019-01-08 16:26:23:54'
                                }
                            ]
                        },
                        {
                            num:123654,
                            xinname:'汽车到车灯',
                            name:'崔小川'
                        }
                    ]
                },
                {
                    num:123654,
                    type:'检测报告',
                    danwei:'广汽本田汽车有限公司',
                    name:'汽车到车灯',
                    guige:'',
                    keshi:'业务发展部',
                    fenlei:'ZY',
                    children:[
                        {
                            num:123654,
                            xinname:'汽车到车灯',
                            name:'崔小川',
                            children:[
                                {
                                    type:'下达任务',
                                    name:'wd-yhx',
                                    startDate:'2019-01-08 16:26:23:54',
                                    endDate:'2019-01-08 16:26:23:54'
                                },
                                {
                                    type:'下达任务',
                                    name:'wd-yhx',
                                    startDate:'2019-01-08 16:26:23:54',
                                    endDate:'2019-01-08 16:26:23:54'
                                },
                                {
                                    type:'下达任务',
                                    name:'wd-yhx',
                                    startDate:'2019-01-08 16:26:23:54',
                                    endDate:'2019-01-08 16:26:23:54'
                                }
                            ]
                        },
                        {
                            num:123654,
                            xinname:'汽车到车灯',
                            name:'崔小川'
                        }
                    ]
                }
            ]
        }
    },
    components:{
        List
    }
}
</script>

<style lang="scss" scoped>

</style>