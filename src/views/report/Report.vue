<template>
  <!-- 我的报告 -->
  <div class="box">
    <div class="wrap">
      <!-- IE 不支持 el-main因为vue底层会创建<main />标签 -->
      <div :class="!myStyles ? 'el-main':''"
            style="width: 100%;"
           :style="{padding: isComing!=0 ? '10px':0}">
        <div :class="!myStyles?'formClass':''" v-if="!myStyle">
          <el-form v-if="isComing!=0" label-width="82px" :inline="true" :model="formInline" class="report_demo_form">
            <el-form-item label="任务号：" size="medium" style="width:19%">
              <el-input v-model="formInline.taskCode" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item label="受检单位：" size="medium" style="width:19%">
              <el-input v-model="formInline.companyCheck" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item label="样品名称：" size="medium" style="width:19%">
              <el-input v-model="formInline.sampleName" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item label="规格型号：" size="medium" style="width:19%">
              <el-input v-model="formInline.sampleType" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item label="报告编号：" size="medium" style="width:19%">
              <el-input :maxlength="20" v-model="formInline.itemscode" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item style="width:3%;height:36px;">
              <el-button v-if="showbut==0" @click="clickshowbut(1)" type="text" style="color:#32AFF0;">
                收起 <i class="el-icon-arrow-up"></i>
              </el-button>
              <el-button v-if="showbut!=0" @click="clickshowbut(0)" type="text" style="color:#32AFF0;">
                展开 <i class="el-icon-arrow-down"></i>
              </el-button>
            </el-form-item>
            <el-collapse-transition>
              <div v-show="show" style="margin-top:20px;">
                <el-form-item label="查询年份：" size="medium" style="width:19%">
                  <el-select v-model="formInline.searchdate" @keyup.enter.native="searchEnterFun">
                    <el-option v-for="(dataVal,i) in datasDatas" :key="i"
                               :label="dataVal.date" :value="dataVal.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="报告状态：" size="medium" style="width:19%">
                  <el-select v-model="formInline.zjsign" @keyup.enter.native="searchEnterFun">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="已完成" value="1"></el-option>
                    <el-option label="未完成" value="2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="归档状态：" size="medium" style="width:19%">
                  <el-select v-model="formInline.docStatus" @keyup.enter.native="searchEnterFun">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="已归档" value="1"></el-option>
                    <el-option label="未归档" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-collapse-transition>
            <el-row  class="myReportD">
              <el-col :span="20" style="border: none;padding:20px 0;">
                <div class="grid-content bg-purple">
                  <el-button size="mini" type="primary" @click="editClickUp">修改</el-button>
                  <el-button size="mini" type="primary" @click="filingRate">归档率</el-button>
                </div>
              </el-col>
              <el-col :span="4" style="border: none;padding:20px 0;">
                <div class="grid-content bg-purple">
                  <el-button style="float: right" size="mini" type="primary"
                             @click="onSubmit(formInline,1,10)">查询
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <!--表格-->
        <div :class="!myStyles?'table_pagination':''" style="width: 100%;">
          <div :class="!myStyles ? 'tableClass' : ''"
               :style="{
                  padding: isComing == 0 ? '20px':0,
                  background: '#ffffff',
               }">
            <el-table ref="table" class="form1" :row-key="row_key" v-loading="loadings"
                      :cell-style="cellStyle"
                      :header-cell-style="{'background-color': '#F3F6FD','color': '#606266','padding': '10px 0','text-align':'center'}"
                      border stripe highlight-current-row :data="tableData">
              <el-table-column type="selection" v-if="isComing!=0" :resizable="false"></el-table-column>
              <el-table-column align="center" label="序号" :resizable="false">
                <template slot-scope="scope"><span>{{scope.$index + 1}} </span></template>
              </el-table-column>
              <el-table-column label="任务号" prop="taskCode" :resizable="false"></el-table-column>
              <el-table-column label="类别" prop="checkTypeID" :resizable="false"></el-table-column>
              <el-table-column label="受检单位" prop="companyCheck" :show-overflow-tooltip="true" :resizable="false"></el-table-column>
              <el-table-column label="样品名称" prop="sampleName" :resizable="false"></el-table-column>
              <el-table-column label="样品规格型号" prop="sampleType" :resizable="false">
                <template slot-scope="scope">
                  <span>{{scope.row.sampleType == null?"--":scope.row.sampleType}}</span>
                </template>
              </el-table-column>
              <el-table-column label="科室" prop="department" :resizable="false">
                <template slot-scope="scope">
                  <span>{{scope.row.department == null?"--":scope.row.department}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="300px" :resizable="false">
                <template slot-scope="scope">
                  <el-button type="text" style="color:#32AFF0;marginLeft:6px;" @click="showInTable(scope.row)">
                    浏览&nbsp;
                  </el-button>
                  <el-button type="text" style="color:#32AFF0;marginLeft:6px;" @click="showInDetails(scope.row)">详细&nbsp;</el-button>
                  <el-button type="text" style="color:#32AFF0;marginLeft:6px;" @click="showGoFile(scope.row)">归档&nbsp;
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column type="expand" width="1" :resizable="false">
                <!--里面的隐藏表格-->
                <el-row :gutter="20">
                  <el-col :span="12" style="border: none">
                    <div class="grid-content bg-purple">
                      <el-button size="mini" type="primary" @click="uploadRord">下载Word</el-button>
                      <el-button size="mini" type="primary" @click="uploadPdfGo">下载PDF</el-button>
                      <el-button size="mini" type="primary" @click="onSubmitQuick()">快查</el-button>
                      <el-button size="mini" type="primary" @click="onDelete">设为可删除</el-button>
                      <el-button size="mini" type="primary" @click="onNoDelete">设为不可删除</el-button>
                    </div>
                  </el-col>
                </el-row>
                <el-table v-loading="loading2"
                          :header-cell-style="{'background-color': 'rgba(243,246,253,1)','color': '#606266','padding': '10px 0','text-align':'center'}"
                          :cell-style="cellStyle"
                          :data="tableData2" @selection-change="handleSelectionChange"
                          stripe border>
                  <el-table-column type="selection" :resizable="false"></el-table-column>
                  <el-table-column align="center" label="序号" :resizable="false">
                    <template slot-scope="scope"><span>{{scope.$index + 1}} </span></template>
                  </el-table-column>
                  <el-table-column prop="itemsCode" label="报告编号" :resizable="false"></el-table-column>
                  <el-table-column prop="itemsName" label="项目名称" :resizable="false"></el-table-column>
                  <el-table-column prop="procName" label="当前状态" :resizable="false"></el-table-column>
                  <el-table-column prop="docStatus" label="归档状态" :resizable="false">
                    <template slot-scope="scope">
                      <span v-if="scope.row.docStatus == '0'" style="color:red">未提交归档</span>
                      <span v-if="scope.row.docStatus == '1'" style="color:#00DD00">已归档</span>
                      <span v-if="scope.row.docStatus == '-1'">已提交归档</span>
                    </template>
                  </el-table-column>
                  <el-table-column fixed="right" label="操作" :resizable="false">
                    <template slot-scope="scope">
                      <el-button type="text" style="color:#32AFF0;marginLeft:6px;" @click="handleClick(scope.row)">查看
                      </el-button>
                      <el-button type="text" style="color:#32AFF0;marginLeft:6px;" @click="showGoRead(scope.row)">快查
                      </el-button>
                      <el-button type="text" style="color:#32AFF0;marginLeft:6px;" @click="showGoQRead(scope.row)">
                        重新生成快查
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-table-column>
            </el-table>
          </div>
          <!--分页器-->
          <div v-if="isComing!=0" class="pagination_clumun">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[10,20,30]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>

    <!--修改的对话框-->
    <el-dialog :close-on-click-modal="false" width="80%" title="修改" :visible.sync="dialogVisibleEdit" class="edit_dialog">
      <div class="edit_dialog_table">
        <el-table
          ref="twoTable"
          border
          stripe
          size="mini"
          :data="tabllist"
          :header-cell-style="{
                          'background-color': 'rgba(243,246,253,1)',
                          'color': '#606266',
                          'padding': '10px 0'
                      }">
          <el-table-column
            prop="itemsCode"
            label=" 检验项目编号"
            align="center"
            :resizable="false">
            <template slot-scope="scope">
              <el-button type="text" style="color:#000;" @click="clickOpenReport(scope.row)">{{scope.row.itemsCode}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" :resizable="false">
            <template slot-scope="scope">
              <el-button type="text" style="color:#32AFF0;" @click="handleCommit(scope.row)">提交</el-button>
              <el-button type="text" style="color:#32AFF0;" @click="handleReturn(scope.row)">流转</el-button>
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
    </el-dialog>

    <!--详细的对话框-->
    <el-dialog :close-on-click-modal="false" width="80%" title="详细" :visible.sync="dialogVisibleDetails">
      <entrustList ref="redactEntrustlist" saveType="3"></entrustList>
    </el-dialog>

    <!--归档的对话框-->
    <el-dialog title="归档" width="80%" :visible.sync="dialogTableVisible"
      :close-on-click-modal="false"
      :before-close="handleClose"
     v-if="hackReset"
    >
      <Archive :tableData2="tableData2" :renwu="renwu"
               :dialogTableVisible="dialogTableVisible"
               :rows="rows" :permissions="permissions"
               :tit="2" :lengtharr="lengtharr" :lzyobj="lzyobj"
      ></Archive>
    </el-dialog>

    <!--归档率的对话框-->
    <el-dialog :close-on-click-modal="false" width="80%" title="归档率" :visible.sync="dialogBinding" class="binding">
      <div class="bottom">
        <Archiverate :list="tableData4" :find="finds" @showCityName="select1" @showCityNames="select2"/>
      </div>
    </el-dialog>

    <!--查看详情的对话框-->
    <el-dialog :close-on-click-modal="false" width="80%" title="归档确认" :visible.sync="dialogReadDetaills">
      <el-form label-width="100px" :model="formInline" class="demo-form-inline form_inline">
        <el-form-item label="任务号" size="mini">
          <el-input v-model="formInline.taskCode" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="企业委托单" size="mini" :inline="true">
          <el-input v-model="formInline.companyCheck"></el-input>
          <el-button type="primary" size="mini"><i class="el-icon-search"></i>查看文件</el-button>
          <el-button type="primary" size="mini"><i class="el-icon-download"></i>下载文件</el-button>
        </el-form-item>
        <el-form-item label="任务单" size="mini" :inline="true">
          <el-input v-model="formInline.companyCheck"></el-input>
          <el-button type="primary" size="mini"><i class="el-icon-search"></i>查看文件</el-button>
          <el-button type="primary" size="mini"><i class="el-icon-download"></i>下载文件</el-button>
        </el-form-item>
        <el-tabs v-model="activeName" type="card" @tab-click="tabsCard">
          <el-tab-pane label="QA18M12Q11102" name="first">
            <el-form-item label="当前状态" size="mini">
              已提交归档
            </el-form-item>
            <el-form-item label="试验报告" size="mini" :inline="true">
              <el-input v-model="formInline.companyCheck"></el-input>
              <el-button type="primary" size="mini"><i class="el-icon-search"></i>查看文件</el-button>
              <el-button type="primary" size="mini"><i class="el-icon-download"></i>下载文件</el-button>
              <span>
                <el-form-item label="是否纸质归档" size="mini" :inline="true">
                <el-radio v-model="radio" label="1">是</el-radio>
                <el-button type="primary" size="mini">确认</el-button>
              </el-form-item>
              </span>
            </el-form-item>
            <el-form-item label="样品登记表" size="mini">
              <el-input v-model="formInline.companyCheck"></el-input>
              <el-button type="primary" size="mini"><i class=" el-icon-search"></i>查看文件</el-button>
              <el-button type="primary" size="mini"><i class=" el-icon-download"></i>下载文件</el-button>
            </el-form-item>
            <el-form-item label="样品照片" size="mini">
              <el-input v-model="formInline.companyCheck"></el-input>
              <el-radio v-model="radio" label="1">其他归档</el-radio>
              <el-button type="primary" size="mini">确认</el-button>
            </el-form-item>
            <el-form-item label="试验过程照片" size="mini">
              <el-radio v-model="radio" label="1">无</el-radio>
            </el-form-item>
            <el-form-item label="原始记录" size="mini">
              <el-radio v-model="radio" label="1">纸质归档</el-radio>
              <el-button type="primary" size="mini">确认</el-button>
            </el-form-item>
            <el-form-item label="其他文件" size="mini">
              <el-radio v-model="radio" label="1">无</el-radio>
            </el-form-item>
            <el-button>上一页</el-button>
            <el-button>下一页</el-button>
            <el-button>确认归档</el-button>
            <el-button>取消归档</el-button>
          </el-tab-pane>
          <el-tab-pane label="QA1888888888" name="second">配置管理</el-tab-pane>
          <el-tab-pane label="QA12222222222" name="third">角色管理</el-tab-pane>
        </el-tabs>
      </el-form>
    </el-dialog>

    <!--快查的对话框-->
    <el-dialog :close-on-press-escape="false" 
              :close-on-click-modal="false" width="80%" title="快速查看" 
              :visible.sync="dialogQuickly" 
              :before-close="handleDialogQuickly" class="dialog_quickly">
      <Quiickready @selectproductValue="selectproductValue" @nextReportBtn="nextReportBtn"
        :indexValueId="indexValueId" :percentage="percentage" :productValue="productValue" :initialState="initialState"
        :tableDataImg="tableDataImg" :numberData="number" :imgCountPage="imgCountPage"></Quiickready>
    </el-dialog>

    <!--下载word-pdf-查看调用对象-->
    <object id="WO3Word2" classid="clsid:561C5A99-71C8-48d4-A3E2-16FC4F9880BF" Width="0" Height="0"
            style="display:block"
    ></object>
  </div>
</template>

<script>
  import base from '@/api/base'
  // entrustList 全局引用模块
  import Archiverate from '@/components/Archiverate'
  import Quiickready from '@/components/Quiickready'
  import threeFlowTable from '@/components/threeFlowTable';
  import Archive from '@/components/Archive';

  export default {
    name: 'report',
    components: {Archiverate, Quiickready, threeFlowTable, Archive},
    props: ['myComing', 'myTableData_0', 'myLoading', 'myStyle'],
    watch: {
      myComing(value) {
        this.isComing = value;
      },
      myTableData_0(value) {
        this.tableData = value;
      },
      myLoading(value) {
        this.loadings = value;
      },
      myStyle(value) {
        this.myStyles = value;
      },
    },
    data() {
      return {
        lengtharr:'',
        lzyobj:{},
        initialState: false,
        hackReset: false,
        permissions:0,
        citys:{},
        rows:{},
        renwu:'',/*归档任务号*/
        dialogReadDetaills: false,
        show: false, /*展开收起*/
        showbut: 1, /*展开收起*/
        myStyles: false,
        isComing: 1,
        loadings: false,
        loading2: false,
        formClass: '',
        tableClass: '',
        deleteFunBr: '',
        threeTableList: [], // 流转数据
        userName: '',
        tabllist: [], /*修改表数据*/
        tablReturn: [], /*流转数据*/
        indexValueId: 0,
        activeName: 'first', /*归档内选项卡*/
        imgCountPage: '', /*图片页数*/
        radio: '1', /*归档单选*/
        number: [], /*快查下拉框*/
        multipleSelection: [], /*快查多选框*/
        showHidden: false,
        optionsRight: [
          {
            value: '0',
            label: '全部'
          }, {
            value: '1',
            label: '启用'
          }, {
            value: '2',
            label: '未启用'
          }],
        percentageValue: '', /*选择百分比*/
        percentage: [
          {value: '0', label: '40%'}, {value: '1', label: '70%'},
          {value: '2', label: '90%'}, {value: '3', label: '100%'},
          {value: '4', label: '130%'}, {value: '5', label: '150%'}], /*选择百分比*/
        productValue: '', /*快查我的报告编号*/
        dialogTableVisible: false,
        dialogBinding: false,
        dialogQuickly: false,
        dialogVisibleDetails: false, /*详细*/
        dialogVisibleEdit: false, /*修改*/
        currentPage4: 1, /*分页*/
        pageSize: 10,
        total: 0,
        pageSize1: 2, /*快查分页*/
        currentPage3: 1, /*分页*/
        GoFileData: [], /*归档对话框内表格*/
        BorrowFileData: [], /*借档对话框内表格*/
        tableData: [], /*外面表格数据*/
        tableDataImg: [], /*图片数组*/
        tableData2: [], /*内嵌表格数据*/
        tableData4: [], /*详细*/
        tableData5: [],
        finds: [],
        formaction: 'tj2',
        wttype: '',
        formInline: {
          taskCode: '',
          companyCheck: '',
          sampleName: '',
          searchdate: '',
          sampleType: '',
          zjsign: '',
          itemscode: '',
          docStatus: '',
        }, /*查询的表单数据*/
        datasDatas: [], /*查询年份*/
        arrDate_: [{id: '', date: '全部'}], /*查询年份*/
        ruleForm: {
          items_itme_name: '',
        },
        rules: {
          items_itme_name: [
            {required: true, message: '请输入项目名称', trigger: 'blur'}
          ]
        }, /*归档表单校检*/
      }
    },
    methods: {
      // 销毁组件
      handleClose(done){
        this.$confirm('确认关闭？')
          .then(_ => {
            
            this.hackReset = false;//销毁组件
            done();
          })
          .catch(_ => {});
      },
      initProps() {
        this.isComing = this.myComing;
        this.tableData = this.myTableData_0;
        this.loadings = this.myLoading;
        this.myStyles = this.myStyle;
      },
      // 点击收起/展开
      clickshowbut(num) {
        this.show = !this.show;
        this.showbut = num;
      },
      //设为可删除
      onDelete() {
        if (this.multipleSelection.length == 0) {
          this.$message({
            type: "waring",
            message: "请选择至少一条数据",
            duration: 1500
          })
        } else {
          var idDelete = this.multipleSelection.map(v => v.id);
          var deleteSelect = this.multipleSelection.every(v => v.process_instance_id == '7');
          var partitiondate;
          this.multipleSelection.forEach(it => {
            partitiondate = it.partitiondate
          });
          if (deleteSelect === true) {
            let params = {
              inspect_id: idDelete,
              partitiondate: partitiondate,
              sign: 0
            };
            this.$api.myReport.setDelete(params).then(res => {
              if (res.data.ok = true) {
                this.$message({type: 'success', message: res.data.data, duration: 1500})
              } else {
                this.$message({type: 'error', message: res.data.data, duration: 1500})
              }
            })
          } else {
            this.multipleSelection.forEach(it => {
              if (it.process_instance_id !== '7') {
                this.$message({type: 'info', message: `${it.itemsCode}报告未完成,请重新选择`, duration: 1500})
              }
            });
            return
          }

        }
      },
      //设为不可删除
      onNoDelete() {
        if (this.multipleSelection.length == 0) {
          this.$message({
            type: "waring",
            message: "请选择至少一条数据", 
            duration: 1500
          })
        } else {
          var idDelete = this.multipleSelection.map(v => v.id);
          var deleteSelect = this.multipleSelection.every(v => v.process_instance_id !== '7');
          var partitiondate;
          this.multipleSelection.forEach(it => {
            partitiondate = it.partitiondate
          });
          if (deleteSelect === true) {
            let params = {
              inspect_id: idDelete,
              partitiondate: partitiondate,
              sign: 1
            };
            this.$api.myReport.setDelete(params).then(res => {
              if (res.data.ok = true) {
                this.$message({type: 'success', message: res.data.data, duration: 1500})
              } else {
                this.$message({type: 'error', message: res.data.data, duration: 1500})
              }
            })
          } else {
            this.multipleSelection.forEach(it => {
              if (it.process_instance_id === '7') {
                this.$message({type: 'info', message: `${it.itemsCode}报告已完成,请重新选择`, duration: 1500})
              }
            });
          }
        }
      },
      //返回值1
      select1(data) {
        this.wttype = data;
        let obj = {
          formaction: this.formaction,
          wttype: this.wttype
        };
        this.$api.myReport.archivingRate(obj).then(res => {
          this.tableData4 = res.data.data.tinfo.list;
          this.tableData5 = res.data.data.tinfo;
          let ar = {
            orgName: '合计',
            attarch1: this.tableData5.attarch1,
            attarch2: this.tableData5.attarch2,
            attarch3: this.tableData5.attarch3,
            attarch4: this.tableData5.attarch4,
            attarch5: this.tableData5.attarch5,
            attarch6: this.tableData5.attarch6,
            attarch7: this.tableData5.attarch7,
            attarch8: this.tableData5.attarch8,
            finishAttarch: this.tableData5.finishAttarch,
            bfb: this.tableData5.bfb,
          };
          this.tableData4.push(ar)
        })
      },
      //返回值2
      select2(data) {
        this.formaction = data;
        let obj = {
          formaction: this.formaction,
          wttype: this.wttype
        };
        this.$api.myReport.archivingRate(obj).then(res => {
          this.tableData4 = res.data.data.tinfo.list;
          this.tableData4.forEach((item,index) => {
              item.iop = index
          });
          this.tableData5 = res.data.data.tinfo;
          let ar = {
            orgName: '合计',
            attarch1: this.tableData5.attarch1,
            attarch2: this.tableData5.attarch2,
            attarch3: this.tableData5.attarch3,
            attarch4: this.tableData5.attarch4,
            attarch5: this.tableData5.attarch5,
            attarch6: this.tableData5.attarch6,
            attarch7: this.tableData5.attarch7,
            attarch8: this.tableData5.attarch8,
            loginid: this.tableData5.loginid,
            name: this.tableData5.name,
            gdFinishAttarch: this.tableData5.gdFinishAttarch,
            finishAttarch: this.tableData5.finishAttarch,
            bfb: this.tableData5.bfb,
          };
          this.tableData4.push(ar)
        })
      },
      //点击归档率
      filingRate() {
        this.dialogBinding = true;
        this.$api.myReport.filingRate().then(res => {
          this.finds = res.data.data
        });
        let obj = {
          formaction: this.formaction,
          wttype: this.wttype,
          taskCode: this.formInline.taskCode,
          companyCheck: this.formInline.companyCheck,
          sampleName: this.formInline.sampleName,
          searchdate: this.formInline.searchdate,
          sampleType: this.formInline.sampleType,
          zjsign: this.formInline.zjsign,
          itemscode: this.formInline.itemscode,
          docStatus: this.formInline.docStatus,
        };
        this.$api.myReport.archivingRate(obj).then(res => {
          this.tableData4 = res.data.data.tinfo.list;
          this.tableData5 = res.data.data.tinfo;
          let ar = {
            orgName: '合计',
            attarch1: this.tableData5.attarch1,
            attarch2: this.tableData5.attarch2,
            attarch3: this.tableData5.attarch3,
            attarch4: this.tableData5.attarch4,
            attarch5: this.tableData5.attarch5,
            attarch6: this.tableData5.attarch6,
            attarch7: this.tableData5.attarch7,
            attarch8: this.tableData5.attarch8,
            finishAttarch: this.tableData5.finishAttarch,
            bfb: this.tableData5.bfb,
          };
          this.tableData4.push(ar)
        })
      },
      // 点击查询
      onSubmit(formInline, currentPage, pageSize) {
        this.loadings = true;
        if (this.formInline.zjsign === '全部') {
          this.formInline.zjsign = ''
        }
        this.currentPage4 = currentPage;
        this.pageSize = pageSize;
        formInline.currentPage = this.currentPage4;
        formInline.pageSize = this.pageSize;
        this.$api.myReport.queryProject(formInline).then(res => {
          this.tableData = res.data.data;
          this.tableData.length>0 ? this.total = this.tableData[0].total : this.total = 0;
          this.loadings = false;
        }).catch(error => {
          this.$message({type: 'error', message: error.data.message, duration: 1500});
          this.loadings = false;
        })
      },
      //回车查询
      searchEnterFun(e) {
        var keyCode = window.event ? e.keyCode : e.which;
        if (keyCode == 13) {
          this.onSubmit(this.formInline, 1, 10)
        }
      },
      //点击查看
      handleClick(row) {
        var obj = document.getElementById("WO3Word2");
        try {
          obj.setUid(this.userName);
          obj.setFileId(row.id);
          obj.setReportNo(row.itemsCode);
          obj.setProcess("7");
          obj.setRemoteIp(base.baseImgUrl);
          obj.ActiveStart()
        } catch (error) {
          if (confirm("您确认没有安装Word控件吗? 点确定您将下载setup.zip 解压后运行setup.exe即可")){
            window.open(base.baseImgUrl+"/docs/resources/donet/setup.zip");
          }
        }
      },
      //获取用户信息//获取前10年查询年份
      userMSG() {
        //获取前10年年分
        var myDate = new Date();
        var thisYear = myDate.getFullYear();
        var thisYearid = thisYear - 9;
        var Section = thisYear - thisYearid;
        var Yearis = 0;
        for (var i = 0; i <= Section; i++) {
          myDate = {
            id: Yearis++, date: thisYear--
          };
          this.arrDate_.push(myDate)
        }
        this.datasDatas = this.arrDate_
        //用户信息
        this.$api.login.pullUserInfo().then(res => {
          this.userName = res.data.data.loginName;
        })
      },
      //点击修改
      editClickUp() {
        this.dialogVisibleEdit = true;
        this.$api.myReport.editReportBtn().then(res => {
          if (res.data.ok == true) {
            this.tabllist = res.data.data;
          }
        })
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.onSubmit(this.formInline, this.currentPage4, this.pageSize)
      },
      handleCurrentChange(val) {
        this.currentPage4 = val;
        this.onSubmit(this.formInline, this.currentPage4, this.pageSize)
      },
      /*
      * 修改-点击编号-打开报告
      * */
      clickOpenReport (row) {
        // row.process_instance_id
        var obj = document.getElementById("WO3Word2");
        try {
          obj.setUid(this.userName);
          obj.setFileId(row.id);
          obj.setReportNo(row.itemsCode);
          obj.setProcess('7');
          obj.setRemoteIp(base.baseImgUrl);
          obj.ActiveStart()
        } catch (error) {
          if (confirm("您确认没有安装Word控件吗? 点确定您将下载setup.zip 解压后运行setup.exe即可")){
            window.open(base.baseImgUrl+"/docs/resources/donet/setup.zip");
          }
        }
      },
      //修改-提交
      handleCommit(row) {
        this.$confirm('确认要提交吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = new FormData()
              params.append('cachetype', 'new');
              params.append('inspectids', row.id);
              params.append('operateFlag', 'save');
          this.$api.myReport.editReportRead(params).then(res => {
            if(res.data.ok){
               this.$message({type: 'success', message: '提交成功', duration: 1500});
               this.editClickUp();
            }
          }).catch(error => {
            this.$message({type: 'error', message: error.data.message, duration: 1500})
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提交', 
            duration: 1500
          });
        });
      },
      //修改-流转
      handleReturn(row) {
        let params = {
          id: row.id
        };
        this.$api.taskmanage.apiFindWorkLog(params).then(res => {
          this.threeTableList = res.data.data.list;
          $twoTable.toggleRowExpansion(row);
        });
        let $twoTable = this.$refs.twoTable;
        this.tabllist.map(item => {
          if (row.id != item.id) {
              $twoTable.toggleRowExpansion(item, false)
          }
        })
      },
      //点击查看详情
      handleClickDetails() {
        this.dialogReadDetaills = true;
      },
      row_key(row) {
        return row.id;
      },
      //点击浏览
      showInTable(row) {
        this.multipleSelection = [];
        // this.deleteFunBr = row.process_instance_id
        this.loading2 = true;
        this.$api.myReport.readEveryReport(row.id).then(res => {
          if (res.data.ok == true) {
            this.tableData2 = res.data.data.list;
            this.number = res.data.data.list;
            $table.toggleRowExpansion(row);
          } else {
            this.$message({type: 'error', message: '查询失败', duration: 1500})
          }
          this.loading2 = false;
        }).catch(err => {
          this.$message({type: 'error', message: '查询失败', duration: 1500});
          this.loading2 = false;
        });
        let $table = this.$refs.table;
        this.tableData.map(item => {
          if (row.id != item.id) {
            $table.toggleRowExpansion(item, false);
          }
        })
      },
      //重新生成快查
      showGoQRead(row) {
        this.$api.myReport.againReport(row.id).then(res => {
          if (res.data.ok == true) {
            this.$message({type: 'success', message: res.data.data, duration: 1500})
          } else {
            this.$message({type: 'error', message: res.data.data, duration: 1500})
          }
        })
      },
      //点击详细
      showInDetails(row) {
        let that = this;
        that.dialogVisibleDetails = true;
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
              res.data.data.inspectContentList[i].wlist[j].itemsCode = res.data.data.inspectContentList[i].itemsCode;
            }
            new_wlist = new_wlist.concat(res.data.data.inspectContentList[i].wlist);
            res.data.data.inspectContentList[i].isModify = "2";
          }
          that.$refs.redactEntrustlist.$refs.projectInfo.tableData = res.data.data.inspectContentList;
          that.$refs.redactEntrustlist.information.fitem = res.data.data.fitem.list;
          that.$refs.redactEntrustlist.$refs.circulationInfo.tableData = new_wlist;
          that.$refs.redactEntrustlist.information.muster = res.data.data.muster;
          if (that.$refs.taskDetail.information.tinfo.checkTypeID === 'QA' || that.$refs.taskDetail.information.tinfo.checkTypeID === 'ZD'){
              that.$refs.taskDetail.isStaticyear=true;
              that.$refs.taskDetail.isStatCode=true;
          }else{
              that.$refs.taskDetail.isStaticyear=false;
              that.$refs.taskDetail.isStatCode=false;
          }
          if (res.data.data.tinfo.companyCheck == res.data.data.tinfo.consignor) {
            that.$refs.redactEntrustlist.$refs.baseInfo.wtdw = false;
            that.$refs.redactEntrustlist.$refs.baseInfo.isChecked = true;
          } else {
            that.$refs.redactEntrustlist.$refs.baseInfo.wtdw = true;
            that.$refs.redactEntrustlist.$refs.baseInfo.isChecked = false;
          }
        }).catch(error => {
          this.$message({type: 'error', message: error.data.message, duration: 1500});
        })
      },
      //点击归档
      showGoFile(row) {
        this.$nextTick(() => {
            this.hackReset = true;//重建组件
        });
        
        this.$api.myReport.readEveryReport(row.id).then(res => {
          if( res.data.data.list.length == 0){
            this.lengtharr = '0'
            this.lzyobj = res.data.data
            this.tableData2 = res.data.data.list;
            this.rows = row
            this.dialogTableVisible = true
          } else {
            this.lengtharr = '1'
            this.rows = row
            this.tableData2 = res.data.data.list;
            this.renwu = row.taskCode
            this.dialogTableVisible = true
          }
        })
        this.$api.taskmanage.power(row.id).then(res => {
            this.permissions = res.data.data
        })
      },
      tabsCard(tab, event) {
        console.log(tab, event);
      },
      //点击快查
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
            this.$message({type: 'info', message: '暂无生成', duration: 1500})
          }else{
            if(pagecount > 0){
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
          this.$message({type: 'error', message: "查看失败", duration: 1500})
        })

      },
      //点击下一份报告
      nextReportBtn(data) {
        if (this.number.length == 1) {
          this.$message({type: 'info', message: '当前只有一份报告', duration: 1500})
        } else {
          if(this.indexValueId < this.number.length-1){
            let indexValueId = this.indexValueId + 1;
            this.number.forEach((val, index) => {
              if (indexValueId === index) {
                this.productValue = val.id;
              }
              this.indexValueId = indexValueId;
            });
          }else{
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
        if(this.multipleSelection.length>0){
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
              this.$message({type: 'info', message: '暂无生成', duration: 1500})
            }
            if(pagecount > 0){
              for (var imgIndexImg = 1; imgIndexImg <= pagecount; imgIndexImg++) {
                var objImg = {
                  v: imgIndexImg,
                  url: `${base.baseImgUrl}docs/gif/${floder}/${imgDataId}_${imgIndexImg}.jpg`
                };
                this.tableDataImg.push(objImg)
              }
            }
          }).catch(err => {
            this.$message({type: 'error', message: "查看失败", duration: 1500})
          })
      },
      //点击全局快查
      onSubmitQuick() {
        this.initialState = true;
        this.indexValueId = 0;
        if (this.multipleSelection.length == 0) {
          this.$message({type: "waring", message: "请选择至少一条数据", duration: 1500})
        } else {
          this.productValue = this.multipleSelection[0].id;
          this.tableDataImg = [];
          this.imgCountPage = '';

          var itemsCodes = this.multipleSelection.map(v => v.itemsCode);
          this.multipleSelection.forEach(item => {
            if (itemsCodes.includes(item.itemsCode)) {
              this.number = this.multipleSelection
            }

          });
          this.$api.myReport.quicklyQuickly(this.productValue).then(res => {
            var floder = res.data.data.floder,
              pagecount = res.data.data.pagecount,
              imgDataId = res.data.data.id;
            this.imgCountPage = pagecount ? pagecount.toString() : '0';
            if (floder == null || pagecount == null || imgDataId == null) {
              this.$message({type: 'info', message: '暂无生成', duration: 1500})
            }else{
              if(pagecount > 0){
                for (var imgIndexImg = 1; imgIndexImg <= pagecount; imgIndexImg++) {
                  var objImg = {
                    v: imgIndexImg,
                    url: `${base.baseImgUrl}docs/gif/${floder}/${imgDataId}_${imgIndexImg}.jpg`
                  };
                  this.tableDataImg.push(objImg)
                }
              }
              if (this.imgCountPage < 1 || this.tableDataImg == []) {
                this.$message({type: 'error', message: `${itemsCodes}暂未生成快查`, duration: 1500});
                return false
              } else {
                this.dialogQuickly = true;
              }
            }
          }).catch(err => {
            this.$message({type: 'error', message: "查看失败", duration: 1500})
          })
        }
      },
      //全选
      handleSelectionChange(data) {
        this.multipleSelection = data;
      },
      cellStyle({row, column, rowIndex, columnIndex}) {
        return "text-align:center"
      },
      //下载word
      uploadRord(url) {
        url = '0';
        this.uploadFile(url)
      },
      // 下载pdf
      uploadPdfGo(url) {
        url = '1';
        this.uploadFile(url)
      },
      uploadFile(url) {
        if (this.multipleSelection.length == 0) {
          this.$message({
            type: "waring",
            message: "请选择至少一条数据", 
            duration: 1500
          })
        } else {
          var arrIDITE = [];
          this.multipleSelection.forEach(item => {
            arrIDITE.push(`${item.id}:${item.itemsCode}`)

          });
          arrIDITE.join("");
          this.$api.myReport.uploadWordTo(arrIDITE).then(res => {
            if (res.data.data == '0') {
              this.$confirm('确认要下载吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                var obj = document.getElementById("WO3Word2");
                try {
                  obj.setExecuteaction(url);
                  obj.setServerIP(`${base.baseImgUrl}`);
                  obj.setIds(arrIDITE);
                  obj.downStart();
                } catch (error) {
                  if (confirm("您确认没有安装Word控件吗? 点确定您将下载setup.zip 解压后运行setup.exe即可")){
                    window.open(base.baseImgUrl+"/docs/resources/donet/setup.zip");
                  }
                }
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '插件异常,已取消下载', 
                  duration: 1500
                });
              });
            } else {
              this.$message({
                type: 'info',
                message: '报告正在处理中', 
                duration: 1500
              });
            }
          })
        }
      },

    },
    created() {
      this.userMSG();
    },
    mounted() {
      this.initProps();
    }
  }
</script>

<style lang="less" scoped>
  .table_pagination {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    overflow: hidden;
    padding: 0 20px 20px 20px;
    .tableClass {
      flex: 1;
      overflow-y: scroll;
    }

    .pagination_clumun {
      margin-top: 20px;
      box-sizing: border-box;
      width: 100%;
      background: #ffffff;
      align-items: center;
      display: flex;

      span {
        font-size: 13px;
        font-weight: 400;
        color: #606266;
      }
    }
  }

  .el-button--primary {
    height: 30px;
    padding: 0 10px;
    margin: 0;
    background: linear-gradient(90deg, rgba(96, 157, 248, 1), rgba(84, 183, 235, 1));
  }

  .box {
    .form_inline {
      .el-input {
        width: 274px;
        height: 54px;
      }
    }

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
      padding: 10px;
      box-sizing: border-box;

      img {
        width: 337px;
      }
    }

    .wrap {
      width: 100%;
      height: 100%;
      background: #eee;
      display: flex;
      flex-direction: column;
      overflow: hidden;

      .el-main {
        display: flex;
        flex-direction: column;
      }

      .formClass {
        width: 100%;
        background-color: #fff;
        padding: 20px;
        .el-form--inline .el-form-item {
          margin: 0;
        }
      }

      .el-main {
        .demo-form-inline {
          border-bottom: 1px solid rgba(0, 0, 0, .1);
        }

        .el-form-item .el-input, .el-select {
          width: 150px;
        }

        .demo-table-expand {
          font-size: 0;
        }

        .demo-table-expand label {
          width: 90px;
          color: #99a9bf;
        }

        .demo-table-expand .el-form-item {
          margin-right: 0;
          margin-bottom: 0;
          width: 50%;
        }

        .myReportD {
          margin: 0;
        }
      }

    }
  }
/deep/ .report_demo_form .el-form-item__content {
    width: 60% !important;
}
/deep/ .report_demo_form .el-form-item__content .el-date-editor, .report_demo_form .el-form-item__content .el-input, .report_demo_form .el-form-item__content .el-input__inner, .report_demo_form .el-form-item__content .el-select {
    width: 100% !important;
}
.report_demo_form .el-form--inline .el-form-item{
    margin: 0;
}
.edit_dialog {
  overflow: hidden;
  padding: 100px 0;
}
/deep/ .edit_dialog .el-dialog{
  height: 100% !important;
  margin: 0 auto !important;
  overflow: hidden !important;
  display: flex;
  flex-direction: column;
}
/deep/ .edit_dialog .el-dialog .el-dialog__body{
  flex: 1 !important;
  overflow: hidden !important;
  padding: 20px;
}
/deep/ .edit_dialog .el-dialog .el-dialog__footer{
  padding: 0 20px 20px 20px;
}
.edit_dialog .edit_dialog_table {
  height: 100%;
  overflow-y: auto;
}
/deep/ .el-form {
  width: 100% !important;
}
.dialog_quickly {
  overflow: hidden;
  padding: 160px 0;
}
/deep/ .dialog_quickly .el-dialog{
  height: 100% !important;
  margin: 0 auto !important;
  overflow: hidden !important;
  display: flex;
  flex-direction: column;
}
/deep/ .dialog_quickly .el-dialog .el-dialog__body{
  flex: 1 !important;
  overflow: hidden !important;
  padding: 20px;
}
/deep/ .binding {
  width: 100%;
  height: 100%;
  padding: 100px 0;
  overflow: hidden;
}
/deep/ .binding .el-dialog {
  height: 100% !important;
  overflow: hidden !important;
  margin: 0  auto !important;
  display: flex;
  flex-direction: column;
}
/deep/ .binding .el-dialog .el-dialog__body {
  flex: 1 !important;
  overflow: hidden !important;
}
/deep/ .binding .el-dialog .el-dialog__body .bottom {
  height: 100% !important;
  overflow: hidden !important;
}
/deep/ .binding .el-dialog .el-dialog__body .bottom .archiverate_box {
  height: 100% !important;
  overflow: hidden !important;
  display: flex;
  flex-direction: column;
}
/deep/ .binding .el-dialog .el-dialog__body .bottom .roughly_tabel {
  flex: 1;
  overflow-y: auto;
}
</style>
