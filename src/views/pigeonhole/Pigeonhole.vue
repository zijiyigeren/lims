<template>
  <!-- 报告归档 -->
  <div style="background: #eeeeee;padding: 10px;">
    <div class="pigeon">
      <div class="pigeon1">
        <div style="display: flex;">
          <el-form ref="form" :model="sizeForm" size="small" style="flex: 1;" label-width="90px">
            <div style="width:100%;display:flex;margin:1% 0;justify-content: space-between;">
              <el-form-item label="开始任务号 :" style="width:22%;margin-bottom:0;">
                <el-input v-model="sizeForm.starttask" style="width:90%;" @keyup.enter.native="searchEnterFun"></el-input>
              </el-form-item>
              <el-form-item label="结束任务号 :" style="width:22%;margin-bottom:0;">
                <el-input v-model="sizeForm.endtask" style="width:90%;" @keyup.enter.native="searchEnterFun"></el-input>
              </el-form-item>
              <!-- <el-form-item label="申请编号 :" style="width:22%;margin-bottom:0;">
                  <el-input v-model="sizeForm.application_number" style="width:90%;" @keyup.enter.native="searchEnterFun"></el-input>
              </el-form-item> -->
              <el-form-item label="报告编号 :" style="width:22%;margin-bottom:0;">
                <el-input v-model="sizeForm.report" style="width:90%;"
                          @keyup.enter.native="searchEnterFun"
                ></el-input>
              </el-form-item>
              <el-form-item label="归档类型 :" style="width:22%;margin-bottom:0;">
                <el-select v-model="sizeForm.status" placeholder="请选择" style="width:90%;">
                  <el-option v-for="item in archiving_type" :key="item.id"
                             :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <el-collapse-transition>
              <div v-show="show">
                <div style="margin:0 auto;width:100%;display:flex;justify-content: space-between;" class="temp2">
                  <el-form-item label="下达日期 :" style="width:22%;margin-bottom:0;">
                    <div style="display: flex;width: 90%;">
                      <el-input v-model="sizeForm.one_starttask" style="width:47%;"
                                placeholder="YYYYMMDD"
                                @keyup.enter.native="searchEnterFun"></el-input>
                      <span style="flex: 1;text-align: center;">-</span>
                      <el-input v-model="sizeForm.two_endtask" style="width:47%;"
                                placeholder="YYYYMMDD"
                                @keyup.enter.native="searchEnterFun"></el-input>
                    </div>
                  </el-form-item>
                  <el-form-item label="签发日期 :" style="width:22%;margin-bottom:0;">
                    <div style="display: flex;width: 90%;">
                      <el-input v-model="sizeForm.one_startissue" style="width:47%;"
                                placeholder="YYYY-MM-DD"
                                @keyup.enter.native="searchEnterFun"></el-input>
                      <span style="flex: 1;text-align: center;">-</span>
                      <el-input v-model="sizeForm.two_endissue" style="width:47%;"
                                placeholder="YYYY-MM-DD"
                                @keyup.enter.native="searchEnterFun"></el-input>
                    </div>
                  </el-form-item>
                  <el-form-item label="归档日期 :" style="width:22%;margin-bottom:0;">
                    <div style="display: flex;width: 90%;">
                      <el-input v-model="sizeForm.one_startfile" style="width:47%;"
                                @keyup.enter.native="searchEnterFun"
                                placeholder="YYYY-MM-DD"></el-input>
                      <span style="flex: 1;text-align: center;">-</span>
                      <el-input v-model="sizeForm.two_startfile" style="width:47%;" @keyup.enter.native="searchEnterFun"
                                placeholder="YYYY-MM-DD"></el-input>
                    </div>
                  </el-form-item>
                  <el-form-item label="齐全日期 :" style="width:22%;margin-bottom:0;">
                    <div style="display: flex;width: 90%;">
                      <el-input v-model="sizeForm.one_startreadiness" style="width:47%;"
                                placeholder="YYYYMMDD"
                                @keyup.enter.native="searchEnterFun"></el-input>
                      <span style="flex: 1;text-align: center;">-</span>
                      <el-input v-model="sizeForm.two_endtreadiness" style="width:47%;"
                                placeholder="YYYYMMDD"
                                @keyup.enter.native="searchEnterFun"></el-input>
                    </div>
                  </el-form-item>
                </div>
                <div style="margin:0 auto;width:100%;display:flex;justify-content: space-between;">
                  <el-form-item label="年份 :" style="width:22%;margin-bottom:0;margin-top:1%;">
                    <el-select v-model="sizeForm.year" placeholder="请选择" style="width:90%;">
                      <el-option v-for="item in yearlist" :key="item.id" :label="item.year" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="主检 :" style="width:22%;margin-bottom:0;margin-top:1%;">
                    <el-input v-model="sizeForm.zjian" style="width:90%;" @keyup.enter.native="searchEnterFun"></el-input>
                  </el-form-item>
                  <el-form-item label="归档状态 :" style="width:22%;margin-bottom:0;margin-top:1%;">
                    <el-select v-model="sizeForm.type" placeholder="请选择" style="width:90%;">
                      <el-option v-for="item in typeL" :key="item.id" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="科室 :" style="width:22%;margin-bottom:0;margin-top:1%;">
                    <el-select v-model="sizeForm.inspection_type" placeholder="请选择" style="width:90%;">
                      <el-option v-for="(item,i) in types" :key="i" :label="item.org_name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div style="width:100%;display:flex;justify-content: space-between;margin-bottom: 20px;">
                  <el-form-item label="受检单位 :" style="width:22%;margin-bottom:0;margin-top:1%;">
                    <el-input v-model="sizeForm.companyCheck" style="width:90%;"
                              @keyup.enter.native="searchEnterFun"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="样品名称 :" style="width:22%;margin-bottom:0;margin-top:1%;">
                    <el-input v-model="sizeForm.sampleName" style="width:90%;"
                              @keyup.enter.native="searchEnterFun"></el-input>
                  </el-form-item>
                  <el-form-item label="规格型号 :" style="width:22%;margin-bottom:0;margin-top:1%;">
                    <el-input v-model="sizeForm.sampleType" style="width:90%;"
                              @keyup.enter.native="searchEnterFun"></el-input>
                  </el-form-item>
                  <div style="width:22%;margin-bottom:0;margin-top:1%;"></div>
                </div>
              </div>
            </el-collapse-transition>
          </el-form>
          <div style="min-width: 55px;text-align: right;margin: 1% 0;display: flex;align-items: center">
            <el-button v-if="showbut==0" @click="clickshowbut(1)" type="text" style="color:#32AFF0;padding: 0;">
              收起 <i class="el-icon-arrow-up"></i>
            </el-button>
            <el-button v-if="showbut!=0" @click="clickshowbut(0)" type="text" style="color:#32AFF0;padding: 0;">
              展开 <i class="el-icon-arrow-down"></i>
            </el-button>
          </div>
        </div>
        <div class="btns">
          <el-button type="primary" @click="archiving" style="
                      height: 30px;
                      padding: 0 20px;
                      margin: 0;
                      background: linear-gradient(90deg, rgba(96, 157, 248, 1), rgba(84, 183, 235, 1));
                      color:#fff;
                  ">归档率</el-button>
          <el-button type="primary" @click="onSubmit(1,10)"
                     style="
                     height: 30px;padding: 0 20px;margin: 0;
                     background: linear-gradient(90deg, rgba(96, 157, 248, 1), rgba(84, 183, 235, 1));
                     color:#fff;float: right;"
          >查询</el-button>
        </div>
      </div>

      <div class="roughly_tabel">
        <div class="table-box">
          <el-table
            ref="table"
            border
            v-loading="loading"
            :data="tableData"
            stripe
            :header-cell-style="{
                'background-color': 'rgba(243,246,253,1)',
                'color': '#606266',
                'padding': '10px 0'
            }">
            <el-table-column type="index" align="center" label="序号" width="70%" :resizable="false"></el-table-column>
            <el-table-column prop="taskCode" label="任务号" align="center" :resizable="false"></el-table-column>
            <el-table-column prop="checkTypeID" label="检验类别" align="center"
                             :show-overflow-tooltip="true" :resizable="false"
            ></el-table-column>
            <el-table-column prop="sampleType" label="样品规格型号" align="center" :resizable="false"></el-table-column>
            <el-table-column prop="sampleName" label="样品名称" align="center"
              :show-overflow-tooltip="true" :resizable="false"
            ></el-table-column>
            <el-table-column prop="companyCheck" label="受检单位" align="center"
                             :show-overflow-tooltip="true" :resizable="false"
            ></el-table-column>
            <el-table-column label="操作" align="center" width="200" :resizable="false">
              <template slot-scope="scope">
                <el-button type="text" style="color:#32AFF0;marginLeft:6px;" @click="toogleExpand(scope.row)">浏览
                </el-button>
                <el-button type="text" style="color:#32AFF0;marginLeft:6px;" @click="TExpand(scope.row)">归档确认</el-button>
              </template>
            </el-table-column>

            <el-table-column type="expand" width="1" :resizable="false">
              <template slot-scope="scope">
                <!-- 二级弹出 -->
                <div class="lxt_title" style="margin-bottom:10px;">
                  <el-button type="primary" @click="onClickXgdReport(scope.row)" style="
                                        height: 30px;
                                        padding: 5px 20px;
                                        margin: 0;
                                        background: linear-gradient(90deg, rgba(96, 157, 248, 1), rgba(84, 183, 235, 1));
                                        color:#fff;
                                    ">下载word
                  </el-button>
                  <el-button type="primary" @click="onClickfallback(scope.row)" style="
                                        height: 30px;
                                        padding: 5px 20px;
                                        margin: 0;
                                        background: linear-gradient(90deg, rgba(96, 157, 248, 1), rgba(84, 183, 235, 1));
                                        color:#fff;
                                    ">下载PDF
                  </el-button>
                </div>
                <div>
                  <el-table
                    ref="Table2"
                    border
                    stripe
                    @selection-change="dataSelect"
                    :data="tableData2"
                    :header-cell-style="{
                                            'background-color': 'rgba(243,246,253,1)',
                                            'color': '#606266',
                                            'padding': '10px 0'
                                        }">
                    <el-table-column
                      type="index"
                      align="center"
                      label="序号"
                      width="70%"
                    >
                    </el-table-column>
                    <el-table-column
                      type="selection"
                      align="center">
                    </el-table-column>
                    <el-table-column
                      prop="itemsCode"
                      label="报告编号"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="itemsName"
                      label="项目名称"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="orgName"
                      label="科室"
                      align="center">
                    </el-table-column>
                    <el-table-column
                      prop=""
                      label="标记状态"
                      align="center">
                      <template slot-scope="scope">
                        <p :class="tableData2[scope.$index].docStatus === 1 ? 'active' : 'actives'">
                          {{tableData2[scope.$index].docStatus === 1 ? '已归档' : '未归档'}}</p>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      align="center"
                      style="color:#32AFF0;">
                      <template slot-scope="scope">
                        <el-button type="text" style="color:#32AFF0;marginLeft:6px;" @click="clickFindWorkLog(scope.row)">
                          流转
                        </el-button>
                        <el-button type="text" style="color:#32AFF0;marginLeft:6px;" @click="showGoRead(scope.row)">快查
                        </el-button>
                      </template>
                    </el-table-column>

                    <el-table-column type="expand" width="1">
                      <template>
                        <!-- 三级弹出 -->
                        <el-table
                          border
                          :data="tableData3"
                          stripe
                          :show-header="false"
                          style="width: 100%">
                          <el-table-column
                            type="index"
                            align="center"
                            label="序号"
                            width="70%"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="flowname"
                            align="center"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="name"
                            align="center"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="create_date"
                            align="center"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="end_date"
                            align="center"
                          >
                          </el-table-column>
                        </el-table>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10,20,30]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          style="height:50px;line-height:50px;"
        ></el-pagination>
      </div>
    </div>

    <!-- 归档 -->
    <el-dialog
      :title="ti"
      v-if="hackResets"
      :visible.sync="Archivedialog"
      width="80%"
      :before-close="handleClose"
    >
      <Archive :tableData2="tableData2" :renwu="renwu" :Archivedialog="Archivedialog" :rows="rows"
               :permissions="permissionss" :tit="3" :bysdj="bysdj" :lengtharr="lengtharr" :lzyobj="lzyobj"
      ></Archive>
    </el-dialog>

    <!-- 归档率 -->
    <el-dialog
      :title="title"
      :visible.sync="dialogBinding"
      width="80%"
      class="lzylist"
    >
      <Archiverate :list="tableData4" :find="finds"
                   @showCityName="select1" @showCityNames="select2"
      ></Archiverate>
    </el-dialog>

    <!--快查的对话框-->
    <el-dialog :close-on-press-escape="false"
               :close-on-click-modal="false" width="80%" title="快速查看"
               :visible.sync="dialogQuickly"
               :before-close="handleDialogQuickly" class="dialog_quickly">
      <Quiickready @selectproductValue="selectproductValue" @nextReportBtn="nextReportBtn"
                   :indexValueId="indexValueId" :percentage="percentage" :productValue="productValue"
                   :initialState="initialState"
                   :tableDataImg="tableDataImg" :numberData="number" :imgCountPage="imgCountPage"
      ></Quiickready>
    </el-dialog>

    <object id="WO3Word2" classid="clsid:561C5A99-71C8-48d4-A3E2-16FC4F9880BF"
            width="0" height="0"
            style="display:block"
    ></object>

    <!-- 归档确认 -->
    <el-dialog
      :title="titleFileConfirm"
      :before-close="handleCloses"
      :visible.sync="dialogFileConfirm"
      v-if="hackReset"
      width="80%">
      <FileConfirm :tableData2="tableData2" :renwu="renwu" :rows="rows" :permissionss="permissionss" :bysdj="bysdj"
                   :lengtharr="lengtharr" :lzyobj="lzyobj"
      ></FileConfirm>
    </el-dialog>
  </div>

</template>
<script>
  import base from '../../api/base'
  import Archiverate from '@/components/Archiverate'
  import Quiickready from '@/components/Quiickready.vue'
  import Archive from '@/components/Archive'
  import FileConfirm from '@/components/FileConfirm'

  export default {
    name: 'pigeonhole',
    data() {
      return {
        lzyobj: {},
        loading: false,
        initialState: false,
        dialogQuickly: false,
        indexValueId: 0,
        productValue: '',
        bysdj: '',
        hackReset: false,
        hackResets: false,
        permissionss: 0,
        renwu: '',
        rows: {},
        Archivedialog: false,
        ti: '归档确认',
        show: false,
        showbut: 1,
        currentPage: 1,
        pageSize: 10,
        dialogFormTitle: '快查',
        dialogFormVisible: false,
        fileList: [
          {
            name: 'food2.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }
        ],
        radio: '1',
        title: '归档率',
        dialogBinding: false,
        number: [],
        sizeForm: {  //表单
          starttask: '',
          endtask: '',
          application_number: '',
          report: '',
          one_starttask: '',
          two_endtask: '',
          one_startissue: '',
          two_endissue: '',
          one_startfile: '',
          two_startfile: '',
          one_startreadiness: '',
          two_endtreadiness: '',
          year: '',
          zjian: '',
          type: '',
          inspection_type: '',
          companyCheck: '',
          sampleName: '',
          sampleType: '',
          status: '',
        },
        percentageValue: '', /*选择百分比*/
        percentage: [
          {value: '0', label: '40%'},
          {value: '1', label: '70%'},
          {value: '2', label: '90%'},
          {value: '3', label: '100%'},
          {value: '4', label: '130%'},
          {value: '5', label: '150%'}
        ], /*选择百分比*/
        imgCountPage: '', /*图片页数*/
        tableDataImg: [], /*图片数组*/
        archiving_type: [
          {id: 0, label: '全部', value: ''},
          {id: 1, label: '报告未归档', value: '0'},
          {id: 2, label: '报告已归档', value: '1'}
        ],
        yearlist: [
          {id: "", year: '全部'}
        ],
        typeL: [
          {id: 0, label: '全部', value: ''},
          {id: 1, label: '未完成', value: '2'},
          {id: 2, label: '已完成', value: '1'}
        ],
        finds: [],
        types: [],
        tableData: [],
        tableData2: [],
        tableData3: [],
        tableData4: [],
        tableData5: [],
        doc: Number,
        formaction: 'tj2',
        wttype: '',
        multipleSelection: [],
        multipleSelections: [],
        str: '',
        total: 0,
        titleFileConfirm: '归档确认',
        dialogFileConfirm: false,
        lengtharr: ''
      }
    },
    components: {
      Archiverate,
      Quiickready,
      Archive,
      FileConfirm
    },
    created() {
      this.yearDate();
      this.typebie();
    },
    methods: {
      /*
      * 功能:当前可选年份范围
      * */
      yearDate() {
        // 遍历年份 从2007开始到当前年份
        const myDate = new Date();
        let thisYear = myDate.getFullYear();
        let Section = thisYear - 2007;
        for (let i = 0; i <= Section; i++) {
          let _thisYear = thisYear--;
          let obj = {id: _thisYear, year: _thisYear};
          this.yearlist.push(obj);
        }
      },

      handleCloses(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.hackReset = false;//销毁组件
            done();
            this.onSubmit()
          })
          .catch(_ => {
          });
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.$nextTick(() => {
              this.hackResets = false;//销毁组件
            });
            done();
          })
          .catch(_ => {
          });
      },
      //归档  计划员 --- 归档员
      TExpand(row) {
        let obj = {
          docStatus: row.docStatus,
          task_status: row.task_status,
          vdeptid: row.deptid,
          partitiondate: row.partitiondate,
          taskId: row.id,
          checkTypeID: row.checkTypeID
        };
        this.$nextTick(() => {
          this.hackReset = true;//重建组件
        });
        // console.log(row.id);
        this.$api.pigeohole.findJobContentByGdAttarch(obj).then(res => {
          // console.log(res);
          if (res.data.data.list.length == 0) {
            this.lengtharr = '0';
            this.lzyobj = res.data.data;
            this.rows = row;
            this.tableData2 = res.data.data.list;
            this.renwu = row.taskCode;
            // console.log(this.permissionss);
            if (this.permissionss == 2 || this.permissionss == 3) {
              if (this.permissionss == 3) {
                this.dialogFileConfirm = true;
                this.bysdj = '2';
                this.hackResets = true; //重建组件 既是计划员又是计划员  显示上传
              } else {
                this.dialogFileConfirm = true; //归档确认 报告归档页面
                this.hackReset = true; //重建组件
              }
            } else if (this.permissionss == 1) {
              this.Archivedialog = true;
              this.bysdj = '1';
              this.hackResets = true;//重建组件 我的报告页面
            } else {
              this.$message({type: 'error', message: "没有权限", duration: 1500})
            }
          } else {
            this.lengtharr = '1';
            this.rows = row;
            this.tableData2 = res.data.data.list;
            this.renwu = row.taskCode;
            // console.log(this.permissionss);
            if (this.permissionss == 2 || this.permissionss == 3) {
              if (this.permissionss == 3) {
                this.dialogFileConfirm = true;
                this.bysdj = '2';
                this.hackResets = true;//重建组件 既是计划员又是计划员  显示上传
              } else {
                this.dialogFileConfirm = true;//归档确认 报告归档页面
                this.hackReset = true;//重建组件
              }
            } else if (this.permissionss == 1) {
              this.Archivedialog = true;
              this.bysdj = '1';
              this.hackResets = true;//重建组件 我的报告页面
            } else {
              this.$message({type: 'error', message: "没有权限", duration: 1500})
            }
          }
          //         this.rows = row
          //         this.tableData2 = res.data.data.list;
          //         this.renwu = row.taskCode
          //         console.log(this.permissionss)
          //         if(this.permissionss == 2 || this.permissionss == 3){
          //             if( this.permissionss == 3){
          //                 this.dialogFileConfirm = true;
          //                 this.bysdj = '2'
          //                 this.hackResets = true;//重建组件 既是计划员又是计划员  显示上传
          //             }else{
          //                 this.dialogFileConfirm = true//归档确认 报告归档页面
          //                 this.hackReset = true;//重建组件
          //             }
          //         }else if(this.permissionss == 1){
          //             this.Archivedialog = true;
          //             this.bysdj = '1'
          //             this.hackResets = true;//重建组件 我的报告页面
          //         }else{
          //             this.$message({type: 'error', message: "没有权限",duration: 1500})
          //         }
        }).catch(err=>{
          console.log(err,'error');
        })
        // console.log(this.permissionss)

      },
      // 点击收起/展开
      clickshowbut(num) {
        this.show = !this.show;
        this.showbut = num;
      },
      //回车
      searchEnterFun(e) {
        var keyCode = window.event ? e.keyCode : e.which;
        if (keyCode == 13) {
          this.onSubmit(1, 10)
        }
      },
      //上传
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      //返回值1
      select1(data) {
        // console.log(data)
        this.wttype = data;
        let obj = {
          formaction: this.formaction,
          wttype: this.wttype,
          taskCode: this.sizeForm.starttask,  //开始任务号
          taskCode2: this.sizeForm.endtask,   //结束任务号
          checkYear: this.sizeForm.application_number, //申请编号
          itemscode: this.sizeForm.report, //报告号
          searchdate2: this.sizeForm.one_starttask,//下达日期2
          searchdate3: this.sizeForm.two_endtask,//下达日期3
          itemsItemIssuanceDate1: this.sizeForm.one_startissue,//签发日期1
          itemsItemIssuanceDate2: this.sizeForm.two_endissue,//签发日期2
          attarchDateStart: this.sizeForm.one_startfile,//归档日期
          attarchDateEnd: this.sizeForm.two_startfile,//归档日期1
          completeDateStart: this.sizeForm.one_startreadiness, //齐全日期
          completeDateEnd: this.sizeForm.two_endtreadiness, //齐全日期2
          searchdate: this.sizeForm.year, //年份
          master: this.sizeForm.zjian, //主检
          task_status: this.sizeForm.type, //类别
          deptid: this.sizeForm.inspection_type, //类型
          companyCheck: this.sizeForm.companyCheck, //受检单位
          sampleName: this.sizeForm.sampleName, //样品名称
          sampleType: this.sizeForm.sampleType, //规格型号
          docStatus: this.sizeForm.status, //归档状态
        };
        // console.log(obj);
        this.$api.pigeohole.archivingRate(obj).then(res => {
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
        // console.log(data);
        this.formaction = data;
        let obj = {
          formaction: this.formaction,
          wttype: this.wttype,
          taskCode: this.sizeForm.starttask,  //开始任务号
          taskCode2: this.sizeForm.endtask,   //结束任务号
          checkYear: this.sizeForm.application_number, //申请编号
          itemscode: this.sizeForm.report, //报告号
          searchdate2: this.sizeForm.one_starttask,//下达日期2
          searchdate3: this.sizeForm.two_endtask,//下达日期3
          itemsItemIssuanceDate1: this.sizeForm.one_startissue,//签发日期1
          itemsItemIssuanceDate2: this.sizeForm.two_endissue,//签发日期2
          attarchDateStart: this.sizeForm.one_startfile,//归档日期
          attarchDateEnd: this.sizeForm.two_startfile,//归档日期1
          completeDateStart: this.sizeForm.one_startreadiness, //齐全日期
          completeDateEnd: this.sizeForm.two_endtreadiness, //齐全日期2
          searchdate: this.sizeForm.year, //年份
          master: this.sizeForm.zjian, //主检
          task_status: this.sizeForm.type, //类别
          deptid: this.sizeForm.inspection_type, //类型
          companyCheck: this.sizeForm.companyCheck, //受检单位
          sampleName: this.sizeForm.sampleName, //样品名称
          sampleType: this.sizeForm.sampleType, //规格型号
          docStatus: this.sizeForm.status, //归档状态
        };
        this.$api.pigeohole.archivingRate(obj).then(res => {
          this.tableData4 = res.data.data.tinfo.list;
          this.tableData4.forEach((item, index) => {
            item.iop = index
          });
          //console.log(this.tableData4)
          this.tableData5 = res.data.data.tinfo
          if (this.tableData4 == []) {
            this.tableData4 = []
          } else {
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
          }
          console.log(this.tableData4)
        })
      },
      //选中
      dataSelect(val) {
        this.multipleSelection = val;
        this.multipleSelections = [];
        val.map(item => {
          this.multipleSelections.push(item.id + ':' + item.itemsCode)
        });
        this.str = this.multipleSelections.join(',');
        // console.log(this.str);
        // console.log(this.multipleSelection);
      },
      //类型
      typebie() {
        let obj = {
          org_name: '全部',
          id: ''
        };
        let bie = [];
        let bies = [];
        this.$api.pigeohole.getReportBaseInformation().then(res => {
          bies = res.data.data.dept.list;
          bie.push(obj);
          this.types = bie.concat(bies)
        });
        this.$api.taskmanage.power().then(res => {
          // console.log(res.data.data);
          this.permissionss = res.data.data
        })
      },
      //点击查询
      onSubmit(currentPage, pageSize) {
        this.loading = true;
        this.currentPage = currentPage;
        this.pageSize = pageSize;
        let obj = {
          taskCode: this.sizeForm.starttask,  //开始任务号
          taskCode2: this.sizeForm.endtask,   //结束任务号
          checkYear: this.sizeForm.application_number, //申请编号
          itemscode: this.sizeForm.report, //报告号
          searchdate2: this.sizeForm.one_starttask,//下达日期2
          searchdate3: this.sizeForm.two_endtask,//下达日期3
          itemsItemIssuanceDate1: this.sizeForm.one_startissue,//签发日期1
          itemsItemIssuanceDate2: this.sizeForm.two_endissue,//签发日期2
          attarchDateStart: this.sizeForm.one_startfile,//归档日期
          attarchDateEnd: this.sizeForm.two_startfile,//归档日期1
          completeDateStart: this.sizeForm.one_startreadiness, //齐全日期
          completeDateEnd: this.sizeForm.two_endtreadiness, //齐全日期2
          searchdate: this.sizeForm.year, //年份
          master: this.sizeForm.zjian, //主检
          task_status: this.sizeForm.type, //类别
          deptid: this.sizeForm.inspection_type, //类型
          companyCheck: this.sizeForm.companyCheck, //受检单位
          sampleName: this.sizeForm.sampleName, //样品名称
          sampleType: this.sizeForm.sampleType, //规格型号
          docStatus: this.sizeForm.status, //归档状态
          currentPage: currentPage,
          pageSize: pageSize
        };
        this.$api.pigeohole.attarch(obj).then(res => {
          // console.log(res);
          this.tableData = res.data.data.tinfo.list;
          if (res.data.respCode == '0') {
            this.loading = false
          }
          if (this.tableData.length > 0) {
            this.tableData.map(item => {
              this.total = item.total
            })
          } else {
            this.total = 0
          }
        })

      },
      //点击归档率
      archiving() {
        this.dialogBinding = true;
        let objs = {
          typeName: '全部',
          typeABC: '',
          id: 0
        };
        let fi = [];
        let ff = [];
        this.$api.pigeohole.findCheckType().then(res => {
          // console.log(res.data.data);
          fi = res.data.data;
          ff.push(objs);
          this.finds = ff.concat(fi)
        });
        let obj = {
          formaction: this.formaction,
          wttype: this.wttype,
          taskCode: this.sizeForm.starttask,  //开始任务号
          taskCode2: this.sizeForm.endtask,   //结束任务号
          checkYear: this.sizeForm.application_number, //申请编号
          itemscode: this.sizeForm.report, //报告号
          searchdate2: this.sizeForm.one_starttask,//下达日期2
          searchdate3: this.sizeForm.two_endtask,//下达日期3
          itemsItemIssuanceDate1: this.sizeForm.one_startissue,//签发日期1
          itemsItemIssuanceDate2: this.sizeForm.two_endissue,//签发日期2
          attarchDateStart: this.sizeForm.one_startfile,//归档日期
          attarchDateEnd: this.sizeForm.two_startfile,//归档日期1
          completeDateStart: this.sizeForm.one_startreadiness, //齐全日期
          completeDateEnd: this.sizeForm.two_endtreadiness, //齐全日期2
          searchdate: this.sizeForm.year, //年份
          master: this.sizeForm.zjian, //主检
          task_status: this.sizeForm.type, //类别
          deptid: this.sizeForm.inspection_type, //类型
          companyCheck: this.sizeForm.companyCheck, //受检单位
          sampleName: this.sizeForm.sampleName, //样品名称
          sampleType: this.sizeForm.sampleType, //规格型号
          docStatus: this.sizeForm.status, //归档状态
        };
        this.$api.pigeohole.archivingRate(obj).then(res => {
          this.tableData4 = res.data.data.tinfo.list;


          this.tableData5 = res.data.data.tinfo;
          // console.log(this.tableData5);
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
      //下载word
      onClickXgdReport() {
        this.dialogdata('0')
      },
      //下载PDF
      onClickfallback() {
        this.dialogdata('1')
      },
      dialogdata(url) {
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
          //   arrIDITE.join("");
          let sts = '"' + this.str + '"';
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
                  if (confirm("您确认没有安装Word控件吗? 点确定您将下载setup.zip 解压后运行setup.exe即可")) {
                    window.open(base.baseImgUrl + "/docs/resources/donet/setup.zip");
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
      toogleExpand(row) {  // 第一个弹出层

        let obj = {
          docStatus: row.docStatus,
          task_status: row.task_status,
          vdeptid: row.deptid,
          partitiondate: row.partitiondate,
          taskId: row.id,
          checkTypeID: row.checkTypeID
        };
        this.$api.pigeohole.findJobContentByAttarch(obj).then(res => {
          this.tableData2 = res.data.data.list
          let content;
          this.tableData2.map(item => {
            if (item.cvItemsCode != null && item.cvItemsCode.length == 10) {
              content = item.cvItemsCode + "(" + item.itemsCode + ")";
            } else {
              content = item.itemsCode;
            }
          });
          $table.toggleRowExpansion(row);
        });
        this.tableData2.map(item => {
          this.doc = item.docStatus

        });
        let $table = this.$refs.table;
        this.tableData.map((item) => {
          if (row.id != item.id) {
            $table.toggleRowExpansion(item, false)
          }
        })
      },
      clickFindWorkLog(row) { // 第二个弹出层
        let inspectid = row.id;
        var that = this;
        this.$api.pigeohole.findWorkLog(inspectid).then(res => {
          that.tableData3 = res.data.data.list;
          $table2.toggleRowExpansion(row);
        });
        // console.log(this.tableData3);
        let $table2 = this.$refs.Table2;
        this.tableData2.map((item) => {
          if (row.id != item.id) {
            $table2.toggleRowExpansion(item, false)
          }
        })
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
          this.$message({type: 'error', message: "查看失败", duration: 1500})
        })

      },
      //点击下一份报告
      nextReportBtn(data) {
        if (this.number.length == 1) {
          this.$message({type: 'info', message: '当前只有一份报告', duration: 1500})
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
            this.$message({type: 'info', message: '暂无生成', duration: 1500})
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
          this.$message({type: 'error', message: "查看失败", duration: 1500})
        })
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.onSubmit(this.currentPage, this.pageSize)
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.onSubmit(this.currentPage, this.pageSize)
      },
    }
  }
</script>
<style lang="scss" scoped>
  .pigeon {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    padding: 0 20px 10px 20px;
  }

  .pigeon1 {
    /*background: #fff;*/
    /*margin: 10px 0;*/
  }

  .roughly_tabel {
    margin-top: 20px;
    flex: 1;
    overflow-y: auto;
  }

  .block {
    height: 50px;
    background: #fff;
    margin-top: 10px;
  }

  .binding {
    width: 130%;
  }

  .binding .bottom {
    width: 100%;
  }

  .active {
    color: green;
  }

  .actives {
    color: red;
  }
  .btns{
    overflow: hidden;
    min-height: 30px;
    padding-bottom: 19px;
    border-bottom: 1px solid rgba(0,0,0,0.1);
  }

  /deep/ .el-table__expanded-cell .el-table .el-table__header-wrapper table {
    width: 100% !important;
    overflow-x: hidden;
  }

  /deep/ .el-table__expanded-cell .el-table .el-table__body-wrapper table {
    width: 100% !important;
    overflow-x: hidden;
  }

  .el-table .warning-row {
    background: #FAFAFA
  }

  /deep/ .el-pagination {
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
  }

  /deep/ .el-pager {
    display: flex;
    align-items: center;
  }

  /deep/ .lzylist {
    width: 100%;
    height: 100%;
    padding: 100px 0;
    overflow: hidden;
  }

  /deep/ .lzylist .el-dialog {
    height: 100% !important;
    overflow: hidden !important;
    margin: 0 auto !important;
    display: flex;
    flex-direction: column;
  }

  /deep/ .lzylist .el-dialog .el-dialog__body {
    flex: 1 !important;
    overflow: hidden !important;
  }

  /deep/ .lzylist .el-dialog .el-dialog__body .bottom {
    height: 100% !important;
    overflow: hidden !important;
  }

  /deep/ .lzylist .el-dialog .el-dialog__body .bottom .archiverate_box {
    height: 100% !important;
    overflow: hidden !important;
    display: flex;
    flex-direction: column;
  }

  /deep/ .lzylist .el-dialog .el-dialog__body .bottom .roughly_tabel {
    flex: 1;
    overflow-y: auto;
  }

  .dialog_quickly {
    overflow: hidden;
    padding: 160px 0;
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
  /deep/ .temp2 .el-form-item .el-form-item__content .el-input .el-input__inner::-webkit-input-placeholder {
    font-size: 10px;
  }

  // /deep/.el-message-box__wrapper .el-message-box .el-message-box__header{
  //     height: 50px;
  // }
</style>
