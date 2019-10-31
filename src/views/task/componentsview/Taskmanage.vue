<template>
  <!-- 任务管理 -->
  <div class="taskmanage">
    <div class="warp">
      <div class="form-search">
        <div style="display: flex;align-items: center;">
          <el-form :inline="true" size="small" :model="formInline" class="demo-form-inline" label-width="82px">
            <div class="query-input">
              <el-form-item label="任务号 :" style="width:19%">
                <el-input v-model.trim="formInline.taskCode" @keyup.enter.native="searchEnterFun" clearable></el-input>
              </el-form-item>
              <el-form-item label="受检单位 :" style="width:19%">
                <el-input v-model.trim="formInline.companyCheck" @keyup.enter.native="searchEnterFun"
                          clearable></el-input>
              </el-form-item>
              <el-form-item label="样品名称 :" style="width:19%">
                <el-input v-model.trim="formInline.sampleName" @keyup.enter.native="searchEnterFun" clearable></el-input>
              </el-form-item>
              <el-form-item label="规格型号 :" style="width:19%">
                <el-input v-model.trim="formInline.sampleType" @keyup.enter.native="searchEnterFun" clearable></el-input>
              </el-form-item>
              <el-form-item label="主检科室 :" style="width:19%">
                <el-select v-model="formInline.deptid">
                  <el-option v-for="(item,i) in deptidList" :key="i" :label="item.org_name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <el-collapse-transition>
              <div v-show="show">
                <div class="query-input-show" style="padding-top: 20px">
                  <el-form-item label="查询年份 :" style="width:19%">
                    <el-select v-model="formInline.searchdate">
                      <el-option v-for="item in dateList" :key="item.id" :label="item.title" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="完成状态 :" style="width:19%">
                    <el-select v-model="formInline.task_status">
                      <el-option label="全部" value=""></el-option>
                      <el-option label="已完成" value="1"></el-option>
                      <el-option label="未完成" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="归档状态 :" style="width:19%">
                    <el-select v-model="formInline.docStatus">
                      <el-option label="全部" value=""></el-option>
                      <el-option label="报告未归档" value="0"></el-option>
                      <el-option label="报告已归档" value="1"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
            </el-collapse-transition>
          </el-form>
          <div style="min-width: 55px;">
            <el-button v-if="showbut==0" @click="clickshowbut(1)" type="text" style="color:#32AFF0;padding: 10px 0;border: none;">
              收起 <i class="el-icon-arrow-up"></i>
            </el-button>
            <el-button v-if="showbut!=0" @click="clickshowbut(0)" type="text" style="color:#32AFF0;padding: 10px 0;border: none;">
              展开 <i class="el-icon-arrow-down"></i>
            </el-button>
          </div>
        </div>
        <div class="demo-form-inline-but">
          <el-button type="primary" @click="onClickInquire(formInline, 1, 10)">查询</el-button>
        </div>
      </div>

      <div class="table-pagingdevice">
        <div class="table-box">
          <el-table
            ref="table"
            border
            stripe
            v-loading="loading"
            :data="tablelist"
            :header-cell-style="{
                            'background-color': 'rgba(243,246,253,1)',
                            'color': '#606266',
                            'padding': '10px 0'
                        }"
            class="state-taskStatus">
            <el-table-column
              type="selection"
              align="center"
              :resizable="false">
            </el-table-column>
            <el-table-column
              prop="taskCode"
              label="任务号"
              align="center"
              :resizable="false">
            </el-table-column>
            <el-table-column
              prop="taskStatusStyle"
              label="状态"
              align="center"
              class-name="stateTaskStatus"
              :resizable="false">
              <template slot-scope="scope">
                <p v-for="(item,i) in scope.row.taskStatusList" :key="i" v-show="item" class="taskStatusStyleclass"
                >{{item}}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="companyCheck"
              label="受检单位"
              align="center"
              :show-overflow-tooltip="true"
              :resizable="false">
            </el-table-column>
            <el-table-column
              prop="sampleName"
              label="样品名称"
              align="center"
              :resizable="false">
            </el-table-column>
            <el-table-column
              prop="sampleType"
              label="样品规格型号"
              align="center"
              :show-overflow-tooltip="true"
              :resizable="false">
            </el-table-column>
            <el-table-column
              prop="orgName"
              label="科室"
              align="center"
              :show-overflow-tooltip="true"
              :resizable="false">
            </el-table-column>
            <el-table-column
              prop="checkTypeID"
              label="类别"
              align="center"
              :show-overflow-tooltip="true"
              :resizable="false">
            </el-table-column>
            <el-table-column label="操作" align="center" width="200" :resizable="false">
              <template slot-scope="scope">
                <el-button type="text" v-if="type != '1'" style="color:#32AFF0;marginLeft:6px;"
                           @click="clickFindJobContent(scope.row)">浏览
                </el-button>
                <el-button type="text" v-if="type != '1'" style="color:#32AFF0;marginLeft:6px;"
                           @click="clickRedact(scope.row)">编辑
                </el-button>
                <el-button type="text" v-if="type === '1'" @click="copyMessage(scope.$index,scope.row)"
                           style="color:#32AFF0;marginLeft:6px;">复制信息
                </el-button>
              </template>
            </el-table-column>

            <el-table-column type="expand" width="1" :resizable="false">
              <template slot-scope="scope">
                <!-- 二级弹出 -->
                <div class="lxt_title">
                  <el-button type="primary" style="margin:0 10px;" @click="clickContentDelete">退回草稿</el-button>
                  <el-button type="primary" style="margin:0 10px;" v-if="task_status == 1" @click="clickDocCanSave">
                    允许主检修改报告
                  </el-button>
                  <el-button type="primary" style="margin:0 10px;" v-if="task_status == 1"
                             @click="clickJobTaskFindBackFlow">回退
                  </el-button>
                  <el-button type="primary" style="margin:0 10px;" @click="clickSearchTaskDoc(scope.row.id)">任务说明
                  </el-button>
                </div>
                <div>
                  <el-table
                    ref="twoTable"
                    border
                    stripe
                    :data="twoTableList"
                    :header-cell-style="{
                                            'background-color': 'rgba(243,246,253,1)',
                                            'color': '#606266',
                                            'padding': '10px 0'
                                        }"
                    @selection-change="handleSelectionChange"
                    :row-style="tableRowStyle">
                    <el-table-column
                      type="selection"
                      align="center"
                      :resizable="false">
                    </el-table-column>
                    <el-table-column
                      prop="itemsCode"
                      label="报告编号"
                      align="center"
                      :resizable="false">
                    </el-table-column>
                    <el-table-column
                      prop="itemsName"
                      label="项目名称"
                      align="center"
                      :show-overflow-tooltip="true"
                      :resizable="false">
                    </el-table-column>
                    <el-table-column
                      prop="master"
                      label="主检人"
                      align="center"
                      :resizable="false">
                    </el-table-column>
                    <el-table-column
                      prop="orgName"
                      label="公章类型"
                      align="center"
                      :resizable="false">
                      <template slot-scope="scope">
                        <div style="display:flex;justifyContent:center;alignItems:center;">
                          <el-select size="medium" style="width:160px;" v-model="scope.row.orgName">
                            <el-option v-for="(item,i) in scope.row.clist" :key="i" :label="item.name"
                                       :value="item.id"></el-option>
                          </el-select>
                          <el-button
                            type="primary"
                            v-show="task_status == 1"
                            @click="clickGoUpdateZhang(scope.row, scope.row.orgName)"
                            style="fontSize:12px;
                                                               height:20px;
                                                               padding:0 5px;
                                                               marginLeft:5px;">
                            修改
                          </el-button>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="checkTypeID"
                      label="流转信息"
                      align="center"
                      style="color:#32AFF0;"
                      :resizable="false">
                      <template slot-scope="scope">
                        <el-button type="text" style="color:#32AFF0;marginLeft:6px;"
                                   @click="clickFindWorkLog(scope.row)">流转
                        </el-button>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="200" :resizable="false">
                      <template slot-scope="scope">
                        <el-button type="text" style="color:#32AFF0;marginLeft:6px;"
                                   @click="clickOpenReport(scope.row)">查看
                        </el-button>
                        <el-button type="text" style="color:#32AFF0;marginLeft:6px;"
                                   @click="onClickQuickCheck(scope.row)">快查
                        </el-button>
                      </template>
                    </el-table-column>

                    <el-table-column type="expand" width="1" :resizable="false">
                      <template>
                        <!-- 三级弹出 -->
                        <threeFlowTable v-bind:threeTableList="threeTableList"/>
                      </template>
                    </el-table-column>

                  </el-table>
                </div>
              </template>
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

    <!-- 任务回退对话框 -->
    <el-dialog title="任务回退" :visible.sync="dialogFormVisible">
      <el-form :model="dialogForm" label-width="auto">
        <el-form-item label="选择节点：">
          <el-select v-model="dialogForm.backprocessinstance" size="medium">
            <el-option v-for="item in echoSelectData" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="原因：">
          <el-input
            v-model.trim="dialogForm.reason"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6}"
            maxlength="200"
            show-word-limit>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="clickJobTaskGoBack">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 任务说明对话框 -->
    <el-dialog title="任务说明" :visible.sync="searchTaskDocVisible">
      <el-form :model="missionStatementForm" label-width="auto">
        <el-form-item label="任务说明：">
          <el-input
            v-model.trim="missionStatementForm.taskExplain"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6}">
          </el-input>
        </el-form-item>
        <el-form-item label="补充说明：">
          <el-input
            v-model.trim="additionalExplanation"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}">
          </el-input>
          <el-button type="primary" @click="clickSaveTaskExplain(additionalExplanation)">保存</el-button>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model.trim="missionStatementForm.checkRemark2"></el-input>
          <el-button type="primary" @click="clickSaveCheckRemark(missionStatementForm.checkRemark2)">修改任务单备注dcb专用
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑对话框 -->
    <el-dialog
      :title="redactFormTitle"
      :visible.sync="redactFormVisible"
      v-if="redactFormVisible"
      :fullscreen="true">
      <entrustList ref="redactEntrustlist" saveType="2"></entrustList>
    </el-dialog>

    <!--快查的对话框-->
    <el-dialog :close-on-press-escape="false"
               :close-on-click-modal="false" width="80%" title="快速查看"
               :visible.sync="dialogQuickly"
               :before-close="handleDialogQuickly" class="dialog_quickly">
      <Quiickready @selectproductValue="selectproductValue" @nextReportBtn="nextReportBtn"
                   :indexValueId="indexValueId" :percentage="percentage" :productValue="productValue"
                   :initialState="initialState"
                   :tableDataImg="tableDataImg" :numberData="number" :imgCountPage="imgCountPage"></Quiickready>
    </el-dialog>

    <!--下载word和pdf-->
    <object id="WO3Word2" classid="clsid:561C5A99-71C8-48d4-A3E2-16FC4F9880BF"
            style="display: none;" width="0" height="0"
    ></object>
  </div>
</template>
<script>
  import base from '@/api/base'
  import threeFlowTable from '@/components/threeFlowTable'
  import Quiickready from '@/components/Quiickready'
  import {mapState, mapActions} from 'vuex'
  // import { saveToLocal } from '@/utils/local-storage'
  // import entrustList from '@/views/entrust/componentsview/Entrustlist.vue'
  export default {
    name: 'taskmanage',
    props: ['type'],
    components: {threeFlowTable, Quiickready},
    data() {
      return {
        initialState: false,
        arrDate: [{id: '', title: '全部'}], // 默认年份数据
        dateList: [], // 年份数据
        currentPage: 1, // 当前页
        pageSize: 10, // 每页的条数
        total: 0, // 总条数
        dialogFormVisible: false, // 控制退回对话框的显示隐藏
        searchTaskDocVisible: false, // 控制任务说明对话框的显示隐藏
        redactFormVisible: false, // 控制编辑对话框的显示隐藏
        dialogQuickly: false, // 控制快查对话框的显示隐藏
        redactFormTitle: '任务编辑', // 编辑对话框标题
        searchdate: '', // 年份
        formInline: { // 查询form数据
          taskCode: '',	// 任务号
          companyCheck: '',	// 受检单位
          sampleName: '',	// 样品名称
          sampleType: '', // 规格型号
          deptid: '', // 主检科室
          searchdate: '', // 查询年份
          task_status: '', // 状态：1已完成，2未完成
          docStatus: '', // 归档状态：0报告未归档，1报告已归档
          currentPage: '',
          pageSize: ''
        },
        task_status: '', // 状态
        orgName: '', // 公章类型
        deptidList: [], // 主检科室数据
        tablelist: [], // 一级table数据
        twoTableList: [], // 二级table数据
        threeTableList: [], // 三级table数据
        multipleSelection: [], // 是否选中报告
        dialogForm: { // 退回对话框数据
          backprocessinstance: '',
          reason: ''
        },
        missionStatementForm: { // 任务说明对话框数据
          taskExplain: '',
          checkRemark2: ''
        },
        echoSelectData: [], // 退回下拉框数据
        processinstance: '', // 退回-当前进度
        inspectids: [], // 检验项目
        additionalExplanation: '', // 补充说明
        taskId: '', // 任务id
        productValue: '', /* 快查我的报告编号 */
        percentageValue: '', /* 选择百分比 */
        percentage: [ /* 选择百分比 */
          {value: '0', label: '40%'}, {value: '1', label: '70%'},
          {value: '2', label: '90%'}, {value: '3', label: '100%'},
          {value: '4', label: '130%'}, {value: '5', label: '150%'}
        ],
        number: [], /* 快查下拉框 */
        tableDataImg: [], /* 图片数组 */
        currentPageQuickCheck: 1, /* 分页 */
        pageSizeQuickCheck: 2, /* 快查分页 */
        imgCountPage: '', /* 图片页数 */
        rowID: '',
        loginName: '',
        indexValueId: 0,
        show: false,
        showbut: 1,
        loading: false,
      }
    },
    computed: mapState({
      name: function (state) {
        if (state.user.name === "") {
          this.freshUserInfo();
        }
        return state.user.name
      }
    }),
    created() {
      this.obtainDateList();
    },
    mounted() {
      this.acquireSearchDep()
    },
    methods: {
      ...mapActions({
        freshUserInfo: 'fresh'
      }),
      // 获取查询年份数据
      obtainDateList() {
        var myDate = new Date();
        var currentYearTitle = myDate.getFullYear();
        var currentYearId = myDate.getFullYear();
        var decadeYear = currentYearTitle - 9;
        var Section = currentYearTitle - decadeYear;
        for (var i = 0; i <= Section; i++) {
          myDate = {id: currentYearId--, title: currentYearTitle--};
          this.arrDate.push(myDate);
        }
        this.dateList = this.arrDate;
      },
      // 分页器-设置每条的页数
      handleSizeChange(val) {
        this.pageSize = val;
        this.onClickInquire(this.formInline, this.currentPage, this.pageSize)
      },
      // 分页器-当前页发生改变时
      handleCurrentChange(val) {
        this.currentPage = val;
        this.onClickInquire(this.formInline, this.currentPage, this.pageSize)
      },
      // 获取主检科室数据
      acquireSearchDep() {
        this.$api.taskmanage.apiSearchDep().then(res => {
          res ? this.deptidList = res.data.data.list : '';
          if (this.deptidList.length > 0) {
            this.formInline.deptid = this.deptidList[0].id;
          }
        })
      },
      // 点击查询
      onClickInquire(formInline, currentPage, pageSize) {
        this.loading = true;
        this.currentPage = currentPage, // 当前页
          this.pageSize = pageSize; // 每页的条数
        formInline.currentPage = this.currentPage;
        formInline.pageSize = this.pageSize;
        this.$api.taskmanage.apiSearchTaskInfo(formInline).then(res => {
          res ? this.tablelist = res.data.data.list : '';
          res ? this.total = res.data.data.total : 0;
          this.task_status = formInline.task_status;
          this.loading = false;
        }).catch((error) => {
          this.$message({type: 'error', message: error.data.message, duration: 1500});
          this.loading = false;
        })
      },
      // 输入框回车事件
      searchEnterFun(e) {
        var keyCode = window.event ? e.keyCode : e.which;
        if (keyCode == 13) {
          this.onClickInquire(this.formInline, 1, 10)
        }
      },
      // 点击收起/展开
      clickshowbut(num) {
        this.show = !this.show;
        this.showbut = num;
      },
      // 点击浏览
      clickFindJobContent(row) {
        this.rowID = row;
        this.multipleSelection = [];
        this.$api.myReport.readEveryReport(row.id).then(res => {
          this.number = res.data.data.list
        });
        this.taskId = row;
        let $table = this.$refs.table;
        let params = {
          taskid: row.id,
          taskCondition: {
            deptid: row.deptid,
            searchdate: row.partitiondate,
            task_status: this.task_status,
            formpage: 2
          }
        };
        this.$api.taskmanage.apiFindJobContent(params).then(res => {
          if (res.data.data.list.length > 0) {
            res.data.data.list.filter(item => {
              if (item.clist.length > 0) {
                item.clist.forEach(em => {
                  if (em.selected) {
                    item.orgName = em.id
                  }
                })
              }
            })
          }
          this.twoTableList = res.data.data.list;
          $table.toggleRowExpansion(row)
        });
        this.tablelist.map(item => {
          if (row.id != item.id) {
            $table.toggleRowExpansion(item, false)
          }
        })
      },
      // 点击流转
      clickFindWorkLog(row) {
        let params = {
          id: row.id
        };
        this.$api.taskmanage.apiFindWorkLog(params).then(res => {
          this.threeTableList = res.data.data.list
          $twoTable.toggleRowExpansion(row)
        });
        let $twoTable = this.$refs.twoTable;
        this.twoTableList.map(item => {
          if (row.id != item.id) {
            $twoTable.toggleRowExpansion(item, false)
          }
        })
      },
      // 选择报告
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      // 点击退回草稿
      clickContentDelete() {
        this.echoSelectData = [];
        this.processinstance = 1;
        this.dialogForm = { // 退回对话框数据
          backprocessinstance: '',
          reason: ''
        };
        if (this.multipleSelection.length > 0) {
          this.dialogFormVisible = true;
          let params = {
            processinstance: 1
          };
          this.$api.taskmanage.apiContentDelete(params).then(res => {
            this.echoSelectData = res.data.data;
            if (this.echoSelectData.length > 0) {
              this.dialogForm.backprocessinstance = this.echoSelectData[0].id
            }
          })
        } else {
          this.$alert('请先选择报告', '系统提示信息', {confirmButtonText: '确定'})
        }
      },
      // 点击退回
      clickJobTaskFindBackFlow() {
        this.echoSelectData = [];
        this.processinstance = 7;
        this.dialogForm = { // 退回对话框数据
          backprocessinstance: '',
          reason: ''
        };
        if (this.multipleSelection.length > 0) {
          this.dialogFormVisible = true;
          this.$api.taskmanage.apiJobTaskFindBackFlow().then(res => {
            res ? this.echoSelectData = res.data.data : '';
            if (this.echoSelectData.length > 0) {
              this.dialogForm.backprocessinstance = this.echoSelectData[0].id
            }
          })
        } else {
          this.$alert('请先选择报告', '系统提示信息', {confirmButtonText: '确定'})
        }
      },
      // 退回完成-点击确定
      clickJobTaskGoBack() {
        this.inspectids = [];
        this.multipleSelection.forEach(item => {
          this.inspectids.push(item.id)
        });
        if (this.multipleSelection.length > 0) {
          let searchdate = this.multipleSelection[0].partitiondate;
          let params = {
            backprocessinstance: this.dialogForm.backprocessinstance,
            inspectids: this.inspectids.join(','),
            processinstance: this.processinstance,
            reason: this.dialogForm.reason,
            searchdate: searchdate
          };
          this.$api.taskmanage.apiJobTaskGoBack(params).then(res => {
            this.$message({type: 'success', message: res.data.message, duration: 1500});
            this.dialogFormVisible = false;
            this.onClickInquire(this.formInline, 1, 10);
            this.clickFindJobContent(this.rowID)
          }).catch(error => {
            this.$message({type: 'error', message: error.data.message, duration: 1500});
            this.dialogFormVisible = false;
            this.clickFindJobContent(this.rowID)
          })
        }
      },
      // 允许主检修改报告
      clickDocCanSave() {
        this.inspectids = [];
        if (this.multipleSelection.length > 0) {
          this.multipleSelection.forEach(item => {
            this.inspectids.push(item.id)
          });
          let searchdate = this.multipleSelection[0].partitiondate;
          let params = {
            inspectids: this.inspectids.join(','),
            searchdate: searchdate
          };
          this.$api.taskmanage.apiDocCanSave(params).then(res => {
            this.$message({type: 'success', message: res.data.data, duration: 1500});
            this.clickFindJobContent(this.rowID)
          }).catch(error => {
            this.$message({type: 'error', message: error.data.message, duration: 1500});
          })
        } else {
          this.$alert('请先选择报告', '系统提示信息', {confirmButtonText: '确定'})
        }
      },
      // 任务说明
      clickSearchTaskDoc(row) {
        this.taskId = row;
        this.searchTaskDocVisible = true;
        this.additionalExplanation = '';
        let params = {
          taskId: row
        };
        this.$api.taskmanage.apiSearchTaskDoc(params).then(res => {
          res.data.ok ? this.missionStatementForm = res.data.data
            : this.$message({type: 'success', message: res.data.message, duration: 1500});
        }).catch(error => {
          this.$message({type: 'error', message: error.data.message, duration: 1500});
        })
      },
      // 保存任务说明
      clickSaveTaskExplain(val) {
        var now = new Date();
        var yy = now.getFullYear(); // 年
        var mm = now.getMonth() + 1; // 月
        var dd = now.getDate(); // 日
        var hh = now.getHours(); // 时
        var ii = now.getMinutes(); // 分
        var ss = now.getSeconds(); // 秒
        var time = yy + '-';
        if (mm < 10) time += '0';
        time += mm + '-';
        if (dd < 10) time += '0';
        time += dd + ' ';
        if (hh < 10) time += '0';
        time += hh + ':';
        if (ii < 10) time += '0';
        time += ii + ':';
        if (ss < 10) time += '0';
        time += ss;
        let name = JSON.parse(localStorage.userInfo).username;
        // let str = '\n' + name + '  ' + time + '\n[' + val + ']';
        let str = val;
        // let params = {
        //     taskExplain: str,
        //     taskId: this.taskId
        // };
        let params = new FormData()
        params.append('taskExplain', str);
        params.append('taskId', this.taskId);
        this.$api.taskmanage.apiSaveTaskExplain(params).then(res => {
          this.$message({type: 'success', message: res.data.data, duration: 1500});
          this.clickSearchTaskDoc(this.taskId)
        }).catch(error => {
          this.$message({type: 'error', message: error.data.message, duration: 1500});
        })
      },
      // 保存任务单备注
      clickSaveCheckRemark(val) {
        // let params = {
        //     checkRemark2: val,
        //     taskId: this.taskId
        // };
        let params = new FormData()
        params.append('checkRemark2', val);
        params.append('taskId', this.taskId);
        this.$api.taskmanage.apiSaveCheckRemark(params).then(res => {
          this.$message({type: 'success', message: res.data.data, duration: 1500});
          this.clickSearchTaskDoc(this.taskId)
        }).catch(error => {
          this.$message({type: 'error', message: error.data.message, duration: 1500});
        })
      },
      // 修改公章类型
      clickGoUpdateZhang(row, orgName) {
        let params = {
          id: row.id,
          cachetTypeId: orgName,
          searchdate: row.partitiondate
        };
        this.$api.taskmanage.apiGoUpdateZhang(params).then(res => {
          this.$message({type: 'success', message: res.data.data, duration: 1500});
          this.clickFindJobContent(this.taskId)
        }).catch(error => {
          this.$message({type: 'error', message: error.data.message, duration: 1500});
        })
      },
      // 点击复制信息
      copyMessage(index, row) {
        this.$emit('copyMessage', row)
      },
      // 点击编辑
      clickRedact(row) {
        let that = this;
        that.redactFormVisible = true;
        let params = {
          taskid: row.id
        };
        this.$api.taskmanage.apiEditTaskInfo(params).then(res => {
          that.$refs.redactEntrustlist.information.infor = res.data.data.infor;
          that.$refs.redactEntrustlist.information.tinfo = res.data.data.tinfo;
          that.$refs.redactEntrustlist.information.iaction = res.data.data.iaction;
          that.$refs.redactEntrustlist.information.taskrole = res.data.data.taskrole;
          that.$refs.redactEntrustlist.information.taskCode2 = res.data.data.tinfo.taskCode;
          let new_wlist = [];
          for (let i = 0; i < res.data.data.inspectContentList.length; i++) {
            for (let j = 0; j < res.data.data.inspectContentList[i].wlist.length; j++) {
              res.data.data.inspectContentList[i].wlist[j].itemsCode = res.data.data.inspectContentList[i].itemsCode
            }
            new_wlist = new_wlist.concat(res.data.data.inspectContentList[i].wlist);
            res.data.data.inspectContentList[i].isModify = '2'
          }
          that.$refs.redactEntrustlist.$refs.projectInfo.tableData = res.data.data.inspectContentList;
          that.$refs.redactEntrustlist.information.fitem = res.data.data.fitem.list;
          that.$refs.redactEntrustlist.$refs.circulationInfo.tableData = new_wlist;
          that.$refs.redactEntrustlist.information.muster = res.data.data.muster;
          if (that.$refs.redactEntrustlist.information.tinfo.checkTypeID === 'QA' || that.$refs.redactEntrustlist.information.tinfo.checkTypeID === 'ZD') {
            that.$refs.redactEntrustlist.isStaticyear = true;
            that.$refs.redactEntrustlist.isStatCode = true;
          } else {
            that.$refs.redactEntrustlist.isStaticyear = false;
            that.$refs.redactEntrustlist.isStatCode = false;
          }
          if (res.data.data.tinfo.companyCheck == res.data.data.tinfo.consignor) {
            that.$refs.redactEntrustlist.$refs.baseInfo.wtdw = false;
            that.$refs.redactEntrustlist.$refs.baseInfo.isChecked = true
          } else {
            that.$refs.redactEntrustlist.$refs.baseInfo.wtdw = true;
            that.$refs.redactEntrustlist.$refs.baseInfo.isChecked = false
          }
        }).catch(error => {
          this.$message({type: 'error', message: error.data.message, duration: 1500});
        })
      },
      // 改变背景颜色
      tableRowStyle({row, rowIndex}) {
        if (row.flowStatus == 1) {
          return 'background-color: pink'
        } else if (row.flowStatus == 2) {
          return 'background-color: yellow'
        } else {
          return ''
        }
      },
      // 点击快查
      onClickQuickCheck(row) {
        let params = {
          inspectids: row.id
        }
        this.$api.taskmanage.apiCheckViewTaskManager(params).then(res => {
          this.showGoRead(row);
        }).catch(error => {
          this.$message({type: 'error', message: error.data.message, duration: 1500});
        })
      },
      // 点击快查
      showGoRead(row) {
        //WT191627
        this.initialState = true;
        this.tableDataImg = [];
        this.imgCountPage = '';
        var rowItemCode = {itemsCode: row.itemsCode};
        var rowRow = [];
        rowRow.push(rowItemCode);
        this.number = rowRow;
        this.productValue = this.number[0].id;
        this.$api.myReport.quicklyQuickly(row.id).then(res => {
          var floder = res.data.data.floder,
            pagecount = res.data.data.pagecount,
            imgDataId = res.data.data.id;
          this.imgCountPage = pagecount ? pagecount.toString() : '0';
          if (floder == null || pagecount == null || imgDataId == null) {
            this.$message({type: 'info', message: '暂无生成', duration: 1500});
          } else {
            if (pagecount > 0) {
              for (var imgIndexImg = 1; imgIndexImg <= pagecount; imgIndexImg++) {
                var objImg = {
                  v: imgIndexImg,
                  url: `${base.baseImgUrl}docs/gif/${floder}/${imgDataId}_${imgIndexImg}.jpg`
                };
                this.tableDataImg.push(objImg)
              }
            }
            if (this.imgCountPage < 1 || this.tableDataImg == []) {
              this.$message({type: 'error', message: `${row.itemsCode}暂未生成快查`, duration: 1500});
              return false
            } else {
              this.dialogQuickly = true;
            }
          }
        }).catch(err => {
          this.$message({type: 'error', message: "查看失败", duration: 1500});
        })

      },
      //点击下一份报告
      nextReportBtn(data) {
        if (this.number.length == 1) {
          this.$message({type: 'info', message: '当前只有一份报告', duration: 1500});
        } else {
          if (this.indexValueId < this.number.length - 1) {
            let indexValueId = this.indexValueId + 1;
            this.number.forEach((val, index) => {
              if (indexValueId === index) {
                this.productValue = val.id;
              }
              this.indexValueId = indexValueId;
            });
          } else {
            this.productValue = this.number[0].id;
            this.indexValueId = 0;
          }
          this.reportQuickt(this.productValue)
        }

      },
      // 快查对话框关闭事件
      handleDialogQuickly() {
        this.initialState = false;
        this.dialogQuickly = false;
        this.imgCountPage = '';
        this.tableDataImg = [];
        this.indexValueId = 0;
        if (this.multipleSelection.length > 0) {
          this.productValue = this.multipleSelection[0].id;
        }
      },
      //选择报告编号
      selectproductValue(data) {
        this.productValue = data;
        this.number.forEach((val, index) => {
          if (this.productValue === val.id) {
            this.indexValueId = index;
          }
        });
        this.reportQuickt(this.productValue)
      },
      //快查接口封装
      reportQuickt(idId) {
        this.imgCountPage = '';
        this.tableDataImg = [];
        this.$api.myReport.quicklyQuickly(idId).then(res => {
          var floder = res.data.data.floder,
            pagecount = res.data.data.pagecount,
            imgDataId = res.data.data.id;
          this.imgCountPage = pagecount ? pagecount.toString() : '0';
          if (floder == null || pagecount == null || imgDataId == null) {
            this.$message({type: 'info', message: '暂无生成', duration: 1500});
          }
          if (pagecount > 0) {
            for (var imgIndexImg = 1; imgIndexImg <= pagecount; imgIndexImg++) {
              var objImg = {
                v: imgIndexImg,
                url: `${base.baseImgUrl}docs/gif/${floder}/${imgDataId}_${imgIndexImg}.jpg`
              };
              this.tableDataImg.push(objImg)
            }
          }
        }).catch(err => {
          this.$message({type: 'error', message: '查看失败', duration: 1500});
        })
      },
      // 查看-打开报告
      clickOpenReport(row) {
        let params = {
          instanceId: row.id, // 当前id
          provessinstanceId: row.process_instance_id, // 流程id
          taskId: row.taskid // 报告编号
        };
        if (row.process_instance_id == '5' || row.process_instance_id == '6') {
          this.$api.taskmanage.apiGoOpenWordForTask(params).then(res => {
            if (!res.data.data) {
              this.goOpenWord(row.id, row.itemsCode, row.process_instance_id)
            } else {
              this.$message({type: 'error', message: res.data.data, duration: 1500});
            }
          }).catch(error => {
            this.$message({type: 'error', message: error.data.message, duration: 1500});
          })
        } else {
          this.goOpenWord(row.id, row.itemsCode, row.process_instance_id)
        }
      },
      // 打开报告
      goOpenWord(instanceID, report_no, process) {
        let loginName = '';
        let obj = document.getElementById('WO3Word2');
        this.$api.login.pullUserInfo().then(res => {
          loginName = res.data.data.loginName;
          if (loginName) {
            this.$api.surveyissue.apiSetSession(instanceID).then(res => {
              if (res.data.data == '1') {
                try {
                  obj.setUid(loginName);
                  obj.setFileId(instanceID);
                  obj.setReportNo(report_no);
                  obj.setProcess(process);
                  obj.setRemoteIp(base.baseImgTable);
                  obj.ActiveStart()
                  
                } catch (error) {
                  if (confirm("您确认没有安装Word控件吗? 点确定您将下载setup.zip 解压后运行setup.exe即可")) {
                    window.open(base.baseImgTable + "/docs/resources/donet/setup.zip");
                  }
                }
              } else if (res.data.data == '2') {
                this.$message({type: 'error', message: '该小批量报告 已经被打开，或打开没有正常关闭', duration: 1500});
              } else {
                this.$message({type: 'error', message: '已经超时，请重新登录', duration: 1500});
              }
            }).catch(error => {
              this.$message({type: 'error', message: error, duration: 1500});
            })
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .taskmanage {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 10px;
    background: #eee;
  }

  .warp {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .percentage {
      width: 100px;
      margin: 0 10px;

    }

    .adminImg {
      text-align: center;
      align-items: center;
    }

    .el-col {
      border-radius: 2px;
      padding: 11px;
      box-sizing: border-box;

      img {
        width: 337px;
      }
    }
  }

  .form-search {
    width: 100%;
    background: #fff;
    padding: 20px 20px 0 20px;
  }

  .demo-form-inline{
    flex: 1;
  }

  .demo-form-inline-but {
    display: flex;
    justify-content: flex-end;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    /*margin-top: 20px;*/
    padding: 20px 0;
    .el-button--primary{
      padding: 0 20px;
      height: 30px;
    }
  }

  .form-search .el-form-item--mini.el-form-item, .form-search .el-form-item--small.el-form-item {
    margin: 0;
  }

  .table-pagingdevice {
    flex: 1;
    background: #fff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .table-box {
    flex: 1;
    margin-bottom: 10px;
    overflow-y: auto;
  }

  .el-button--default {
    height: 30px;
    background: #fff;
    border-radius: 2px;
    padding: 0 10px;
    margin: 0;
  }

  .el-button--primary {
    height: 30px;
    background: linear-gradient(90deg, rgba(96, 157, 248, 1), rgba(84, 183, 235, 1));
    border-radius: 2px;
    padding: 0 10px;
    margin: 0;
  }

  .el-divider--vertical {
    margin: 0;
  }

  .el-divider {
    background-color: rgb(50, 175, 240);
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

  .lxt_title {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    border-top: 1px solid #eee;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
  }

  /deep/ .el-table__expanded-cell .el-table .el-table__header-wrapper table {
    width: 100% !important;
  }

  /deep/ .el-table__expanded-cell .el-table .el-table__body-wrapper table {
    width: 100% !important;
  }

  /deep/ .state-taskStatus .stateTaskStatus.is-center {
    margin: 0 !important;
    padding: 0 !important;
  }

  /deep/ .state-taskStatus .stateTaskStatus.is-center .cell {
    margin: 0 !important;
    padding: 0 !important;
  }

  .taskStatusStyleclass {
    border-bottom: 1px solid #eee;
    padding: 10px 0;
  }

  .taskStatusStyleclass:last-child {
    border-bottom: none;
  }

  /deep/ .demo-form-inline .el-form-item__content {
    width: 60% !important;
  }

  /deep/ .demo-form-inline .el-form-item__content .el-date-editor, .demo-form-inline .el-form-item__content .el-input__inner, .demo-form-inline .el-form-item__content .el-select {
    width: 100% !important;
  }

  .form-search .el-form--inline .el-form-item {
    margin: 0;
  }

  .dialog_quickly {
    overflow: hidden;
    padding: 50px 0;
  }

  /deep/ .dialog_quickly .el-dialog {
    height: 100% !important;
    margin: 0 auto !important;
    overflow: hidden !important;
    display: flex;
    flex-direction: column;
  }

  /deep/ .dialog_quickly .el-dialog .el-dialog__body {
    flex: 1 !important;
    overflow: hidden !important;
    padding: 20px;
  }
</style>
