<template>
    <!-- 问题报告 -->
    <div class="surveyissue">
        <div class="table-box">
            <div><el-button type="primary" class="bespoke" @click="clickNewConstruction">刷新</el-button></div>
            <div class="table-box-content">
                <el-table
                    ref="table"
                    border
                    stripe
                    v-loading="loading"
                    :data="tableList"
                    :header-cell-style="{
                        'background-color': 'rgba(243,246,253,1)',
                        'color': '#606266',
                        'padding': '10px 0'
                    }">
                    <el-table-column
                        prop="id"
                        label="系统ID"
                        align="center"
                        :resizable="false">
                    </el-table-column>
                    <el-table-column
                        prop="inspect_id"
                        label="报告ID"
                        align="center"
                        :resizable="false">
                    </el-table-column>
                    <el-table-column
                        prop="pdf"
                        label="报告编号"
                        align="center"
                        :resizable="false">
                    </el-table-column>
                    <el-table-column
                        prop="etype"
                        label="状态"
                        align="center"
                        :resizable="false">
                        <template slot-scope="scope">
                            <span v-if="scope.row.etype == 0">待处理</span>
                            <p v-if="scope.row.etype != 0">
                                <span style="color:red;">失败</span>
                                <span>{{scope.row.des}}</span>
                            </p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="stype"
                        label="类型"
                        align="center"
                        :resizable="false">
                        <template slot-scope="scope">
                            <span v-if="scope.row.stype == 1">实验员签名</span>
                            <span v-if="scope.row.stype == 2">审核签名</span>
                            <span v-if="scope.row.stype == 3">批准签名</span>
                            <span v-if="scope.row.stype == 4">修改一次</span>
                            <span v-if="scope.row.stype == 5">重新生成快查</span>
                            <span v-if="scope.row.stype == 6">纠错</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="300" :resizable="false">
                        <template slot-scope="scope">
                            <div v-if="scope.row.etype == 0">
                                <el-button type="text"  @click="clickReexecuteEeport(scope.row)" disabled>重新执行</el-button>
                                <el-button type="text"  disabled>打开报告</el-button>
                                <el-button type="text"  @click="clickBackReport(scope.row)" disabled>回退报告</el-button>
                            </div>
                            <div v-if="scope.row.etype != 0">
                                <el-button type="text" style="color:#32AFF0;marginLeft:6px;" @click="clickReexecuteEeport(scope.row)">重新执行</el-button>
                                <el-button type="text" style="color:#32AFF0;marginLeft:6px;" @click="clickOpenReport(scope.row)">打开报告</el-button>
                                <el-button type="text" style="color:#32AFF0;marginLeft:6px;" @click="clickBackReport(scope.row)">回退报告</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <!--下载word和pdf-->
        <object style="display: none;" id="WO3Word2" classid="clsid:561C5A99-71C8-48d4-A3E2-16FC4F9880BF" Width="0" Height="0"></object>
    </div>
</template>
<script>
import base from "@/api/base"
export default {
    data(){
        return {
            tableList: [], // 列表数据,
            disabled: true,
            loading: false,
        }
    },
    mounted() {
        this.getFindList();
    },
    methods:{
        // 获取列表数据
        getFindList() { 
            this.loading = true;
            this.$api.surveyissue.apiFindList().then(res => {
                res ? this.tableList = res.data.data : '';
                this.loading = false;
            }).catch(error => {
                this.$message({ type: 'error', message: error.data.message, duration: 1500 });
                this.loading = false;
            })
        },
        // 点击重新执行
        clickReexecuteEeport(row) { 
            if(row.etype == 0){
                this.$confirm('该报告正在处理，禁止此项操作', '提示', {type: 'warning'})
            }else{
                this.$api.surveyissue.apiReexecuteEeport(row.id).then(res => {
                    this.$message({ type: 'success', message: res.data.data, duration: 1500 })
                    this.getFindList();
                }).catch((error) => {
                    this.$message({ type: 'error', message: error.data.message, duration: 1500 });
                });
            }
        },
        // 点击回退报告
        clickBackReport(row) { 
            if(row.etype == 0){
                this.$confirm('该报告正在处理，禁止此项操作', '提示', {type: 'warning'})
            }else{
                this.$confirm('确认要回退吗？', '信息', {
                    cancelButtonText: '取消',
                    confirmButtonText: '确定',
                }).then(() => {
                    let params = {
                        execid: row.id,
                        inspectid: row.inspect_id
                    }
                    this.$api.surveyissue.apiBackReport(params).then(res => {
                        this.$message({ type: 'success', message: res.data.data, duration: 1500 });
                        this.getFindList();
                    }).catch((error) => {
                        this.$message({ type: 'error', message: error.data.message, duration: 1500 });
                    });
                })
            }
        },
        // 打开报告
        clickOpenReport(row) { 
            let loginName = '';
            let obj = document.getElementById("WO3Word2");
            this.$api.login.pullUserInfo().then(res => {
                loginName = res.data.data.loginName;
                if(loginName){
                    this.$api.surveyissue.apiSetSession(row.inspect_id).then(res => {
                    if(res.data.data == "1"){
                        try {
                                obj.setUid(loginName);
                                obj.setFileId(row.inspect_id);
                                obj.setReportNo(row.pdf);
                                obj.setProcess('3');
                                obj.setRemoteIp(base.baseImgTable);
                                obj.ActiveStart();
                        } catch(error){
                            if (confirm("您确认没有安装Word控件吗? 点确定您将下载setup.zip 解压后运行setup.exe即可")){
                                window.open(base.baseImgTable+"/docs/resources/donet/setup.zip");
                            }
                        }
                    }else if(res.data.data == "2"){
                        this.$message({ type: 'error', message: '该小批量报告 已经被打开，或打开没有正常关闭', duration: 1500 });
                    }else {
                        this.$message({ type: 'error', message: '已经超时，请重新登录', duration: 1500 });
                    }
                    }).catch(error => {
                        this.$message({ type: 'error', message: error, duration: 1500 });
                    });
                }
            });

        },
        // 点击刷新
        clickNewConstruction() {
            this.loading = true;
            this.$api.surveyissue.apiFindList().then(res => {
                this.$message({ type: 'success', message: '刷新成功', duration: 1500 });
                res ? this.tableList = res.data.data : '';
                this.loading = false;
            }).catch(error => {
                this.$message({ type: 'error', message:'刷新失败', duration: 1500 });
                this.loading = false;
            })
        },
    },
}
</script>
<style lang="scss" scoped>
.surveyissue {
    padding: 10px;
    overflow: hidden;
    background: #eee;
}
.el-divider--vertical {
    margin: 0;
}
/deep/ .table-box {
    width: 100%;
    height: 100%;
    padding: 20px;
    overflow: hidden;
    background: #fff;
    display: flex;
    flex-direction: column;
}
.table-box-content {
    flex: 1;
    overflow-y: auto;
    margin-top: 20px;
}
/deep/ .el-scrollbar__bar {
  z-index: 999;
}
/deep/ ::-webkit-scrollbar {
  width: 3px;
  height: 8px;
  background-color: #fff;
}
/deep/ ::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
  background-color: rgba(0, 0, 0, 0.1);
}
.el-button--primary {
    height:30px;
    background:linear-gradient(90deg,rgba(96,157,248,1),rgba(84,183,235,1));
    border-radius:2px;
    padding: 0 10px;
    margin: 0;
}
</style>
