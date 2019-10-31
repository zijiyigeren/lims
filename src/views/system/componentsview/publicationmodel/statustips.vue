<template>
  <section class="lxt_bgcolor class_statusTips">
    <div class="lxt_status" ref="box">
      <div :style="{display:this.KbRole.includes('kb.questnotice') ? 'block' : 'none'}"
           class="lxt_statusModel">
        <div class="lxt_statusModelTitle">
          <span class="lxt_params">任务通知 <em v-if="task_notification.length!=0">( {{task_notification.length | maxNumber}} )</em></span>
          <ul class="lxt_stlist">
            <li @click="unfinished" :class="{'on': falg == true}">超期 <em v-if="overdue_dataList.length!=0">(
              {{overdue_dataList.length | maxNumber}} )</em></li>
            <li @click="overdue" :class="{'on': falg == false}">未完成 <em v-if="unfinished_dataList.length!=0">(
              {{unfinished_dataList.length | maxNumber}} )</em></li>
          </ul>
          <a href="javascript:;" class="lxt_more" @click="more('kb.questnotice')">更多</a>
        </div>
        <div class="lxt_xmcTitle">
          <p><span>任务号</span><span>商定完成时间</span><span>受检单位</span></p>
        </div>
        <div v-if="falg" class="lxt_statusModelcontent">
          <ul v-if="overdue_dataList.length != 0">
            <li v-for="(item,index) in overdue_dataList.slice(0,5)" :key="index">
              <span class="code_class1" @click="taskDetail({
                taskid:item.id,
                searchdate:item.partitiondate,
                processInstanceId:3
              })">{{item.taskCode}}</span>
              <span>{{item.finishDate}}</span>
              <span style="overflow: hidden;white-space: nowrap;"
                    :title="item.companyCheck">{{item.companyCheck}}</span>
            </li>
          </ul>
          <ul v-else>
            <li>暂无任务通知</li>
          </ul>
        </div>
        <div v-else class="lxt_statusModelcontent">
          <ul v-if="unfinished_dataList.length != 0">
            <li v-for="(item,index) in unfinished_dataList.slice(0,5)" :key="index">
              <span class="code_class1" @click="taskDetail({
                taskid: item.id,
                searchdate: item.partitiondate,
                processInstanceId:3
              })">{{item.taskCode}}</span>
              <span>{{item.finishDate}}</span>
              <span style="overflow: hidden;white-space: nowrap;"
                    :title="item.companyCheck">{{item.companyCheck}}</span>
            </li>
          </ul>
          <ul v-else>
            <li>暂无任务通知</li>
          </ul>
        </div>
      </div>

      <div :style="{display:this.KbRole.includes('kb.assignedTask') ? 'block' : 'none'}"
           class="lxt_statusModel">
        <div class="lxt_statusModelTitle">
          <span class="lxt_params">待分配任务 <em v-if="unassigned_tasks.length!=0">( {{unassigned_tasks.length | maxNumber}} )</em></span>

          <a href="javascript:;" class="lxt_more" @click="more('kb.assignedTask')">更多</a>
        </div>
        <div class="lxt_xmcTitle">
          <p><span>任务号</span><span>商定完成时间</span><span>受检单位</span></p>
        </div>
        <div class="lxt_statusModelcontent">
          <ul v-if="unassigned_tasks.length != 0">
            <li v-for="(item,index) in unassigned_tasks.slice(0,5)" :key="index">
              <span class="code_class1" @click="taskDetail({
                taskid: item.id,
                searchdate: item.partitiondate,
                processInstanceId:3
              })">{{item.taskCode}}</span>
              <span>{{item.finishDate}}</span>
              <span style=" overflow: hidden;white-space: nowrap;"
                    :title="item.companyCheck">{{item.companyCheck}}</span>
            </li>
          </ul>
          <ul v-else>
            <li>暂无待分配任务</li>
          </ul>
        </div>
      </div>

      <div :style="{display:this.KbRole.includes('kb.vettingReport') ? 'block' : 'none'}"
           class="lxt_statusModel">
        <div class="lxt_statusModelTitle">
          <span class="lxt_params">报告审批 <em v-if="report_status_dataList.length!=0">( {{report_status_dataList.length | maxNumber}} )</em></span>
          <ul class="lxt_stlist">
            <li @click="status" :class="{'on': falgtow == true}">
              审批状态 <em
              v-if="loading_dataList.length!=0">( {{loading_dataList.length | maxNumber}} )</em>
            </li>
            <li @click="approval" :class="{'on': falgtow == false}">
              审批完成 <em
              v-if="audited_dataList.length!=0">( {{audited_dataList.length | maxNumber}} )</em>
            </li>
          </ul>
          <a href="javascript:;" class="lxt_more" @click="more('kb.vettingReport')">更多</a>
        </div>
        <div class="lxt_xmcTitle">
          <p><span>报告编号</span><span>提交日期</span><span>审批状态</span></p>
        </div>
        <div class="lxt_statusModelcontent">
          <ul v-if="falgtow">
            <ul v-if="review_list.length != 0">
              <li v-for="(item,index) in review_list.slice(0,5)" :key="index">
                <span :title="item.itemsCode" style="overflow: hidden;white-space: nowrap;" class="code_class2">{{item.itemsCode}}</span>
                <span>{{item.submitDate}}</span>
                <!--<span>审批中</span>-->
                <span :title="item.myTitle">{{item.myTitle}}</span>
              </li>
            </ul>
            <ul v-else>
              <li>暂无待审核报告</li>
            </ul>
          </ul>
          <ul v-else>
            <ul v-if="audited_dataList.length != 0">
              <li v-for="(item,index) in audited_dataList.slice(0,5)" :key="index">
                <span :title="item.itemsCode" style="overflow: hidden;white-space: nowrap;" class="code_class2">{{item.itemsCode}}</span>
                <span>{{item.submitDate}}</span>
                <span>已审批</span>
              </li>
            </ul>
            <ul v-else>
              <li>暂无待审核报告</li>
            </ul>
          </ul>
        </div>
      </div>

      <div :style="{display:this.KbRole.includes('kb.pendingReview') ? 'block' : 'none'}"
           class="lxt_statusModel">
        <div class="lxt_statusModelTitle">
          <span class="lxt_params">待审核报告通知 <em v-if="check_pending_dataList">( {{check_pending_dataList.length | maxNumber}} )</em></span>
          <a href="javascript:;" class="lxt_more" @click="more('kb.pendingReview')">更多</a>
        </div>
        <div class="lxt_xmcTitle">
          <p><span>报告编号</span><span>提交日期</span><span>审批状态</span></p>
        </div>
        <div class="lxt_statusModelcontent">
          <ul v-if="check_pending_dataList.length != 0">
            <li v-for="(item,index) in check_pending_dataList.slice(0,5)" :key="index">
              <span :title="item.itemsCode" style="overflow: hidden;white-space: nowrap;">{{item.itemsCode}}</span>
              <span>{{item.submitDate}}</span>
              <span title="待审核">待审核</span>
              <!--              <span :title="item.myTitle">{{item.myTitle}}</span>-->
            </li>
          </ul>
          <ul v-else>
            <li>暂无待审核报告</li>
          </ul>
        </div>
      </div>

      <div :style="{display:this.KbRole.includes('kb.pendingApproval') ? 'block' : 'none'}"
           class="lxt_statusModel">
        <div class="lxt_statusModelTitle">
          <span class="lxt_params">待批准报告通知 <em v-if="pending_approval_dataList">( {{pending_approval_dataList.length | maxNumber}} )</em></span>

          <a href="javascript:;" class="lxt_more" @click="more('kb.pendingApproval')">更多</a>
        </div>
        <div class="lxt_xmcTitle">
          <p><span>报告编号</span><span>提交日期</span><span>审批状态</span></p>
        </div>
        <div class="lxt_statusModelcontent">
          <ul>
            <ul v-if="pending_approval_dataList.length != 0">
              <li v-for="(item,index) in pending_approval_dataList.slice(0,5)" :key="index">
                <span :title="item.itemsCode" style="overflow: hidden;white-space: nowrap;">{{item.itemsCode}}</span>
                <span>{{item.submitDate}}</span>
                <span title="待批准">待批准</span>
              </li>
            </ul>
            <ul v-else>
              <li>暂无待批准报告</li>
            </ul>
          </ul>
        </div>
      </div>

      <div :style="{visibility:this.KbRole.includes('kb.monthlyStatistics') ? 'visible' : 'hidden'}"
           class="lxt_statusModel">
        <!--<div :style="{display:this.KbRole.includes('kb.pendingApproval') ? 'block' : 'none'}"
             class="lxt_statusModel">-->
        <div class="lxt_statusModelTitle">
          <span class="lxt_params">月度统计表</span>
          <div style="text-align: right">
            <span style="margin-right: 0.5vw">统计类型</span>
            <el-select v-model="select_option" placeholder="请选择" class="lxt_yers" @change="mao">
              <el-option
                v-for="item in optionData" :key="item.optionType"
                :label="item.label"
                :value="item.optionType">
              </el-option>
            </el-select>
          </div>

        </div>
        <div id="lxt_myboll" style="min-height: 200px"></div>
      </div>
    </div>

    <!-- 编辑 -->
    <el-dialog title="查看" v-if="dialogFormVisible"
               :visible.sync="dialogFormVisible"
               :fullscreen="true"
    >
      <taskDetail ref="taskDetail" saveType="3"></taskDetail>
    </el-dialog>

  </section>
</template>
<script>
  import echarts from 'echarts'
  // 任务详情弹框
  import taskDetail from '@/views/entrust/componentsview/Entrustlist.vue'

  var rememberThis = {
    myEcharts: {
      resize: function () {
      }
    },
  };
  window.addEventListener('resize', function () {
    rememberThis.myEcharts.resize();
  });

  var year; // 获取当前年
  var month; // 获取当前月
  var date; // 获取当前日
  export default {
    name: 'statustips',
    data() {
      return {
        optionData: [{
          optionType: '1',
          label: '报告提交'
        }, {
          optionType: '2',
          label: '审核报告'
        }, {
          optionType: '4',
          label: '批准报告'
        }, {
          optionType: '3',
          label: '分配任务'
        }],
        select_option: '',
        falg: true,
        falgtow: true,
        task_notification: [],// 任务通知
        overdue_dataList: [],// 任务通知 _ 已完成
        unfinished_dataList: [],// 任务通知 _ 未完成
        unassigned_tasks: [],// 待分配任务

        report_status_dataList: [],// 报告的审批相关数据
        loading_dataList: [],// 审核状态
        audited_dataList: [],// 审批完成

        check_pending_dataList: [],// 待审核
        check_pending_dataList_Total: '',// 待审核_总数
        pending_approval_dataList: [],// 待批准
        pending_approval_dataList_Total: '',// 待批准_总数

        barData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],// 图形的初始数据
        approvalR: [],// 批准
        assigningTask: [],// 分配任务
        auditR: [],// 审核
        submitR: [],// 提交报告echarts数据

        KbRole: [],// 权限数组
        myEcharts: null,// echarts实例

        // 查看任务详情弹框
        dialogFormVisible: false,

        review_list: [],
      }
    },
    components: {
      taskDetail
    },
    methods: {
      /*
      * 功能: 点击更多 跳转相对应的路由
      * */
      more(value) {
        switch (value) {
          case 'kb.pendingReview':
            this.$router.push({name: 'surveyaudit'});
            break;
          case 'kb.pendingApproval':
            this.$router.push({name: 'surveyratify'});
            break;
          case 'kb.vettingReport':
            this.$router.push({name: 'report'});
            break;
          case 'kb.assignedTask':
            this.$router.push({name: 'taskallot'});
            break;
          case 'kb.questnotice':
            this.$router.push({name: 'surveyredact'});
            break;
        }
      },

      unfinished() {
        this.falg = true;
      },

      overdue() {
        this.falg = false
      },

      status() {
        this.falgtow = true
      },

      approval() {
        this.falgtow = false
      },

      init_Echarts() {
        this.myEcharts = echarts.init(document.getElementById('lxt_myboll'));
        var option = {
          title: {
            text: year + '年完成实验报告数量阅读分布图',
            x: 'center',
            textStyle: {
              color: '#636363',
              // fontWeight: ''
            },
            top: 10
          },
          "backgroundColor": "rgb(255, 255, 255)",
          "color": ["#4670C4"],
          "tooltip": {},
          "grid": {
            // "containLabel": true,
            "left": 70,
            // "top": 90,
            // "bottom": 10,
            // "right": 10,
          },
          "xAxis": [{
            "type": "category",
            "data": ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            "axisTick": {
              "alignWithLabel": true,
              "show": false
            },
            "nameTextStyle": {
              "color": "#82b0ec"
            },
            "axisLine": {
              "lineStyle": {
                "color": "#"
              }
            },
            "axisLabel": {
              "textStyle": {
                "color": "#000"
              }
            }
          }],
          "yAxis": [{
            "type": "value",
            name: '报告数量',
            nameLocation: 'middle',
            nameGap: 30,
            nameTextStyle: {
              color: '#636363',
              fontSize: 18,
            },
            // "min": 0,
            // "max": 99,
            // "splitNumber": 5,
            // 刻度线
            "axisTick": {
              "show": false
            },
            "axisLabel": {
              "textStyle": {
                "color": "#000"
              },
              "formatter": "{value}"
            },
            "splitLine": {
              "lineStyle": {
                "color": "#e0e0e0"
              }
            },
            "axisLine": {
              "show": false
            }
          }],
          "series": [{
            "type": "bar",
            "itemStyle": {
              "normal": {
                "opacity": 1
              }
            },
            "barWidth": "15",
            label: {
              show: true,
              position: 'top',
              color: '#000000',
              formatter: function (data) {
                return data.data == 0 ? '' : data.data
              }
            },
            "data": this.barData,
          }]
        };
        this.myEcharts.setOption(option);
      },

      mao() {
        switch (this.select_option) {
          case "1":
            this.barData = this.submitR;
            break;
          case "2":
            this.barData = this.auditR;
            break;
          case "3":
            this.barData = this.assigningTask;
            break;
          case "4":
            this.barData = this.approvalR;
        }
        this.init_Echarts()
      },

      /**
       * 功能:状态提示 _ 获取 _ 任务通知模块 / 待分配任务模块
       * 参数:process_instance_id = 3,任务通知模块
       *      process_instance_id = 2,待分配任务模块
       * */
      questNotice(params) {
        this.$api.systemPublicationpage.questNotice(params).then(res => {
          if (res.data.ok && res.data.data) {
            if (params.process_instance_id == '3') {
              this.overdue_dataList = res.data.data.overdue;
              var aa1 = res.data.data.overdue;
              this.unfinished_dataList = res.data.data.unfinished;
              var aa2 = res.data.data.unfinished;
              this.task_notification = aa1.concat(aa2);
            }
            if (params.process_instance_id == '2') {
              this.unassigned_tasks = res.data.data.assignedTask;
            }
          }
        }).catch(err => {
          console.log(err, 'error');
          this.$message({
            type: 'error',
            message: err.data.message
          });
        })
      },

      /**
       * 功能:状态提示 _ 获取 _ 报告审批模块 / 待审核报告通知模块 / 待批准报告通知模块
       *      res.data[i].process_instance_id = 5 待审核
       *      res.data[i].process_instance_id = 6 待批准
       *      res.data[i].process_instance_id = 7 已审批
       * */
      vettingReport(params) {
        this.$api.systemPublicationpage.vettingReport(params).then(res => {
          if (res.data.ok && res.data.data) {
            var temp = res.data.data;
            this.audited_dataList = temp.audited;// 已审批
            var a1 = temp.audited;
            var a2 = temp.pendingApproval;
            var a3 = temp.pendingReview;

            this.review_list = temp.review;// 审批中
            this.review_list.slice(0, 5).forEach((item, index) => {
              if (item.process_instance_id == 5) {
                item.myTitle = '审核中'
              }
              if (item.process_instance_id == 6) {
                item.myTitle = '批准中'
              }
            });
            var a4 = a2.concat(a3);
            this.loading_dataList = a4;

            this.report_status_dataList = a1.concat(a4);
          }
        }).catch(err => {
          console.log(err, 'error');
          this.$message({
            type: 'error',
            message: err.data.message
          });
        })
      },

      /*
      * 功能:状态提示 _ 获取 _ 月度统计表(echarts)数据
      * */
      monthlyStatisticsInit() {
        this.$api.systemPublicationpage.monthlyStatisticsInit().then(res => {
          if (res.data.ok) {
            this.approvalR = res.data.data.approvalR;
            this.assigningTask = res.data.data.assigningTask;
            this.auditR = res.data.data.auditR;
            this.submitR = res.data.data.submitR;
            // 默认显示 提交报告数据图
            this.barData = res.data.data.submitR;
          }
        }).catch(err => {
          console.log(err, 'error');
          this.$message({
            type: 'error',
            message: err.data.message
          });
        })
      },

      /*
      * 功能:状态提示 _ 获取 _ 当前登陆用户拥有的看板页相关权限
      * */
      getKbRole() {
        this.$api.systemPublicationpage.getKbRole().then(res => {
          if (res.data.ok && res.data.data) {
            res.data.data.forEach((item, index) => {
              this.KbRole.push(item.rolecode);
            })
          }
        }).catch(err => {
          console.log(err, 'error');
          this.$message({
            type: 'error',
            message: err.data.message
          });
        })
      },

      /*
      * 功能:状态提示 _ 获取 _ /待审核报告 /待批准报告 数据
      *      process_instance_id = 5 待审核
      *      process_instance_id = 6 待批准
      * */
      vettingReport2(params) {
        this.$api.systemPublicationpage.vettingReport2(params).then(res => {
          if (res.data.ok && res.data.data && res.data.data.length != 0) {
            var temp = res.data.data;
            if (params.process_instance_id == 5) {
              this.check_pending_dataList = temp;// 待审批
              // this.check_pending_dataList_Total = String(temp[0].total);// 待审批_总数
              return;
            }
            if (params.process_instance_id == 6) {
              this.pending_approval_dataList = temp;// 待批准
              // this.pending_approval_dataList_Total = String(temp[0].total);// 待批准_总数
              return;
            }
            this.$message.success({message: res.data.message});
          }
        }).catch(err => {
          console.log(err, "error");
          this.$message.error({message: err.data.message});
        })
      },

      /*
      * 功能:状态提示 _ 查看 _ 任务详情
      * */
      taskDetail(params) {
        var that = this;
        that.dialogFormVisible = true;
        this.$api.systemPublicationpage.taskDetail(params).then(res => {
          if (res.data.ok && res.data.data) {

            that.$refs.taskDetail.information.infor = res.data.data.infor;
            that.$refs.taskDetail.information.tinfo = res.data.data.tinfo;
            that.$refs.taskDetail.information.iaction = res.data.data.iaction;
            that.$refs.taskDetail.information.taskrole = res.data.data.taskrole;
            that.$refs.taskDetail.information.taskCode2 = res.data.data.tinfo.taskCode;
            let new_wlist = [];
            for (let i = 0; i < res.data.data.inspectContentList.length; i++) {
              for (let j = 0; j < res.data.data.inspectContentList[i].wlist.length; j++) {
                res.data.data.inspectContentList[i].wlist[j].itemsCode = res.data.data.inspectContentList[i].itemsCode;
              }
              new_wlist = new_wlist.concat(res.data.data.inspectContentList[i].wlist);
              res.data.data.inspectContentList[i].isModify = "2";
            }
            that.$refs.taskDetail.$refs.projectInfo.tableData = res.data.data.inspectContentList;
            that.$refs.taskDetail.information.fitem = res.data.data.fitem.list;
            that.$refs.taskDetail.$refs.circulationInfo.tableData = new_wlist;
            that.$refs.taskDetail.information.muster = res.data.data.muster;

            if (that.$refs.taskDetail.information.tinfo.checkTypeID === 'QA' || that.$refs.taskDetail.information.tinfo.checkTypeID === 'ZD') {
              that.$refs.taskDetail.isStaticyear = true;
              that.$refs.taskDetail.isStatCode = true;
            } else {
              that.$refs.taskDetail.isStaticyear = false;
              that.$refs.taskDetail.isStatCode = false;
            }
            if (res.data.data.tinfo.companyCheck == res.data.data.tinfo.consignor) {
              that.$refs.taskDetail.$refs.baseInfo.wtdw = false;
              that.$refs.taskDetail.$refs.baseInfo.isChecked = true;
            } else {
              that.$refs.taskDetail.$refs.baseInfo.wtdw = true;
              that.$refs.taskDetail.$refs.baseInfo.isChecked = false;
            }

          } else {
            this.$message.info({message: res.data.message});
          }
        }).catch(err => {
          console.log(err, 'error');
          this.$message.error({message: err.data.message});
        })
      },
    },
    filters: {
      maxNumber(value) {
        if (value >= 99) {
          return '99+'
        } else {
          return value
        }
      }
    },
    created() {
      var nowDate = new Date();
      year = nowDate.getFullYear(); // 获取当前年

      this.getKbRole();
      this.questNotice({
        process_instance_id: '3'
      });
      this.questNotice({
        process_instance_id: '2'
      });
      this.vettingReport({
        data: {
          currentPage: '1'
        }
      });

      // 待审核报告通知
      this.vettingReport2({
        process_instance_id: 5,
        searchdate: '',
        currentPage: 1,
        // pageSize: 5
      });

      // 待批准报告通知
      this.vettingReport2({
        process_instance_id: 6,
        searchdate: '',
        currentPage: 1,
        // pageSize: 5
      });
    },
    beforeMount() {
      rememberThis = this;
    },
    mounted() {
      this.monthlyStatisticsInit();
      this.init_Echarts();
    },
  }
</script>
<style scoped>
  .lxt_statusTips {
    width: 100%;
    height: auto;
    padding: 1%;
    font-size: 16px;
    border: solid 1px #ccc;
    margin-top: 1vw;
    background: #fff
  }

  .lxt_status {
    width: 100%;
    height: auto;
    padding: 1%;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .lxt_statusModel {
    display: none;
    width: 32%;
    min-height: 400px;
    padding: 1vw 0;
    margin-bottom: 1vw;
    border: #e8e8e8 solid 1px;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
  }

  .lxt_statusModel:last-child {
    display: block;
  }

  .lxt_statusModel:hover {
    box-shadow: 0 0 8px 1px rgb(149, 202, 255);
  }

  .lxt_statusModelTitle {
    width: 100%;
    min-height: 48px;
    padding-bottom: .5vw;
    border-bottom: #ccc solid 1px;
    display: flex;
    display: -webkit-flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
  }

  .lxt_params {
    font-size: 18px;
    font-weight: 900;
    border-left: 2px solid #4CDAFF;
    margin-left: 1vw;
    text-indent: .5vw;
    line-height: 18px;
    white-space: nowrap;
  }

  .lxt_params em {
    font-style: normal;
  }

  .lxt_more {
    float: right;
    padding-right: 1vw;
    margin-right: 1vw;
    background-image: url('../../../../assets/images/rightmore.png');
    background-repeat: no-repeat;
    background-size: 20%;
    background-position: 2vw center;
  }

  .lxt_more:hover {
    color: #34ABFF;
    /*background-position: 2.3vw center;*/
  }

  .lxt_stlist {
    width: auto;
  }

  .lxt_stlist em {
    font-style: normal;
    font-size: 12px;
  }

  .lxt_stlist li {
    float: left;
    margin-right: 1vw;
    border-bottom: #fff solid 3px;
    cursor: pointer;
    font-size: 12px;
  }

  .lxt_stlist li.on {
    border-bottom: rgb(149, 202, 255) solid 3px;
  }

  .lxt_xmcTitle {
    width: 100%;
    height: auto;
  }

  .lxt_xmcTitle p span {
    display: inline-block;
    width: 33%;
    text-align: center;
    padding: 1vw 0;
  }

  .lxt_statusModelcontent {
    width: 100%;
    height: auto;
  }

  .lxt_statusModelcontent ul {
    padding: 0;
    margin: 0;
  }

  .lxt_statusModelcontent ul li {
    padding: 1vw 0;
    display: flex;
    justify-content: space-around;
  }

  .lxt_statusModelcontent ul li span {
    display: inline-block;
    text-align: center;
    flex: 1;
    box-sizing: border-box;
    padding: 0 15px;
    text-overflow: ellipsis;
  }

  .code_class1 {
    cursor: pointer;
    color: #0c79b1;
  }

  .code_class2 {
    color: #34ABFF;
    font-weight: 700;
  }

  #lxt_myboll {
    width: 100%;
    height: 100%;
  }

  .lxt_yers {
    max-width: 40%;
    margin-right: 1vw;
  }

</style>
