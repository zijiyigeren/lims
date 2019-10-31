<template>
    <!-- 日志管理 -->
    <div class="systemuserinquire">
        <div class="warp">
            <div class="inquire">
                <el-form :inline="true" size="small" :model="formInline">
                    <div>
                        <el-form-item label="操作人：">
                            <el-input v-model="formInline.operateName" placeholder="操作人："></el-input>
                        </el-form-item>
                        <el-form-item label="操作时间：">
                            <el-date-picker
                                v-model="formInline.operateTimeStart"
                                type="date"
                                placeholder="开始日期"
                                :picker-options="pickerOptionsStart">
                            </el-date-picker>
                            &nbsp;&nbsp;到：
                            <el-date-picker
                                v-model="formInline.operateTimeEnd"
                                type="date"
                                placeholder="结束日期"
                                :picker-options="pickerOptionsEnd">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="demo-form-inline-but">
                        <el-form-item>
                            <el-button type="primary" class="bespoke" @click="inquirefindmemberList(formInline,1,10)">查询</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <div class="table-pagingdevice">
                <div class="table-box">
                    <el-table
                        border
                        v-loading="loading"
                        :data="tablelist"
                        :header-cell-style="{
                            'background-color': 'rgba(243,246,253,1)',
                            'color': '#606266',
                            'padding': '10px 0'
                        }"
                        style="width: 100%">
                        <el-table-column
                            prop="operateName"
                            label="操作人"
                            align="center"
                            :resizable="false">
                        </el-table-column>
                        <el-table-column
                            prop="ip"
                            label="登录IP地址"
                            align="center"
                            :resizable="false">
                        </el-table-column>
                        <el-table-column
                            prop="browser"
                            label="浏览器"
                            align="center"
                            :resizable="false">
                        </el-table-column>
                        <el-table-column
                            prop="operateTime"
                            label="登录时间"
                            align="center"
                            :resizable="false">
                        </el-table-column>
                        <el-table-column
                            prop="content"
                            label="操作内容"
                            align="center"
                            width="350"
                            :resizable="false">
                        </el-table-column>
                    </el-table>
                </div>

                <div class="pagingdevice">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10,20,30]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import moment from 'moment';
export default {
    name: 'systemlogmanagement',
    data(){
        const than = this;
        return {
            currentPage:1, // 当前页
            pageSize:10, // 每页的条数
            total: 0,
            tablelist: [],
            formInline: {
                operateName: '',
                operateTimeStart: '',
                operateTimeEnd: '',
                pageNo: '',
                pageSize: ''
            },
            pickerOptionsStart: {
                disabledDate(time) {
                    if(than.formInline.operateTimeEnd){
                        return time > than.formInline.operateTimeEnd;
                    }
                }
            },
            pickerOptionsEnd: {
                disabledDate(time) {
                    if(than.formInline.operateTimeStart){
                        return time < than.formInline.operateTimeStart;
                    }
                }
            },
            loading: false,
        }
    },
    mounted() {
        this.findmemberList();
    },
    methods:{
        // 分页器-设置每条的页数
        handleSizeChange(val) {
            this.pageSize = val;
            this.inquirefindmemberList(this.formInline, this.currentPage, this.pageSize);
        },
        // 分页器-当前页发生改变时
        handleCurrentChange(val) {
            this.currentPage = val;
            this.inquirefindmemberList(this.formInline, this.currentPage, this.pageSize);
        },
        // 获取列表数据
        findmemberList() {
            this.inquirefindmemberList(this.formInline, this.currentPage, this.pageSize);
        },
        // 点击查询
        inquirefindmemberList(formInline, currentPage, pageSize){
            this.loading = true;
            this.currentPage = currentPage;
            this.pageSize = pageSize;
            let operateTimeStart = '';
            let operateTimeEnd = '';
            if(formInline.operateTimeStart){
                let dates = new Date(formInline.operateTimeStart).toJSON();
                let date = new Date(+new Date(dates) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
                operateTimeStart = date;
            }else{
                operateTimeStart = '';
            }
            if(formInline.operateTimeEnd){
                let dates = new Date(formInline.operateTimeEnd).toJSON();
                let date = new Date(+new Date(dates) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
                operateTimeEnd = date;
            }else{
                operateTimeEnd = '';
            }
            let params = {
                operateName: formInline.operateName,
                operateTimeStart: operateTimeStart,
                operateTimeEnd: operateTimeEnd,
                pageNo: currentPage,
                pageSize: pageSize
            }
            this.$api.systemcachetimg.apiLog(params).then(res => {
                if(res.data.data.list.length > 0){
                    res.data.data.list.map(item => {
                        item.operateTime = moment(item.operateTime).format('YYYY-MM-DD HH:mm:ss');
                    })
                }
                this.tablelist = res.data.data.list;
                res.data.data.count ? this.total = res.data.data.count : this.total = 0;
                this.loading = false;
            }).catch(error => {
                this.$message({ type: 'error', message: error.data.message, duration: 1500 });
                this.loading = false;
            })
        },
    }
}
</script>
<style lang="scss" scoped>
.systemuserinquire {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 10px;
    background: #eee;
}
.warp {
    width: 100%;
    height: 100%;
    background: #fff;
    overflow: hidden;
    padding: 30px;
    display: flex;
    flex-direction: column;
}
.el-form--inline {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.table-pagingdevice {
    flex: 1;
    background: #fff;
    display: flex;
    flex-direction:column;
    overflow: hidden;
}
.pagingdevice {
    margin-top: 20px;
}
.table-box {
    flex: 1;
    margin-bottom: 10px;
    overflow-y: auto;
}
.el-button--primary {
    height:30px;
    background:linear-gradient(90deg,rgba(96,157,248,1),rgba(84,183,235,1));
    border-radius:2px;
    padding:0 10px;
    margin: 0;
}
</style>
