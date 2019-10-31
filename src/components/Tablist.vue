<template>
    <tr>
        <td colspan="6" style="padding:20px;">
            <table cellpaddin="0" cellspacing="0" border="1"  style="width:100%;border-collapse: collapse;border:1px solid #ccc;">
            <tr align="center" valign ="center" style="height:30px;" v-for="(item,ind) in children" :key="ind">
                <td>{{ind}}</td>
                <td>{{item.type}}</td>
                <td>{{item.name}}</td>
                <td>{{item.startDate}}</td>
                <td>{{item.endDate}}</td>
                <td style="width:10%;"></td>
            </tr>
            </table>
        </td>
    </tr>
</template>

<script>
export default {    
    props:['children']
}
</script>

<style lang="scss" scoped>

</style>