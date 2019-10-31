<template>
    <!-- 归档确认 -->
    <div>
        <el-form label-width="100px" :model="formInline" class="demo-form-inline form_inline">
            <el-form-item label="任务号 :"  >
                 <el-input v-model="formInline.taskCode" placeholder=""  :disabled="true"></el-input>
            </el-form-item>
            <div class="enterprise">
                <el-form-item label="企业委托单 :" size="mini" :inline="true">
                            <div class="div6"></div>
                            <el-upload
                                :disabled="disa"
                                style="display:inline-block;"
                                class="upload-demo"
                                action="1"
                                :on-preview="handlePreview6"
                                :before-remove="beforeRemove6"
                                :before-upload="beforeUpload6"
                                multiple
                                :limit="100"
                                :on-exceed="handleExceed6"
                                :file-list="fileList6">
                                <el-button size="small" type="primary" style="display:inline-block;" :disabled="disa">上传文件</el-button>
                            </el-upload>
                            <el-button size="small" type="primary"  style="display:inline-block;margin:0 10px;" @click="downloadEnterprise">下载文件</el-button>
                            <el-radio-group v-model="radioss" @change="radiotop" :disabled="disagroud">
                                    <el-radio  label="1" >电子归档</el-radio>
                                    <el-radio  label="2" >纸质归档</el-radio>
                                    <el-radio  label="3" >其他归档</el-radio>
                            </el-radio-group>
                            <i class="el-icon-warning" v-if="iconArry.icons6.warning"></i>
                            <i class="el-icon-success" v-if="iconArry.icons6.success"></i>
                </el-form-item>
            </div>
            <el-form-item label="任务单 :" size="mini">
                <p style="display:inline-block;width:25%;">任务单.docx</p>
                <el-button size="small" type="primary"  style="display:inline-block;margin-left:20px;" @click="CheckFile">查看文件</el-button>
            </el-form-item>
            <el-tabs v-model="activeName" type="card" v-if="isflase">
                <div class="spans" >
                    <span v-for="(item,i) in tableData2" :key="i" @click="btnpane(i)" :class="i === xb ? 'active' : ''">{{item.itemsCode}}</span>
                </div>
                <el-form-item label="当前状态 :" size="mini" style="background:#eee;padding:5px 0;">{{onead}}</el-form-item>
                 <el-form-item label="试验报告 :" size="mini">
                  <div class="bao" style="display:inline-block;padding:0;border:0;">实验报告.docx</div>
                  <el-button size="small" type="primary"  style="display:inline-block;margin-left:20px;" @click="look">查看文件</el-button>
                    <el-button size="small" type="primary"  style="display:inline-block;" @click="downactiveName">下载文件</el-button>
                    <p style="display:inline-block;margin:0 20px 0 10px;">是否纸质归档</p>
                    <el-radio-group v-model="radiox" @change="radiobot">
                        <el-radio  :label="radiox">{{labelx}}</el-radio>
                    </el-radio-group>
                     <el-button size="small" type="primary"  style="display:inline-block;margin-left:10px;" @click="determineactiveName">{{activeNameconfim}}</el-button>
                </el-form-item>
                <div class="mmm">
                    <el-form-item v-if="blooer == true" label="样品登记表 :" size="mini" :inline="true">
                            <div class="div1"></div>
                            <el-upload
                            :disabled="true"
                            style="display:inline-block;"
                                class="upload-demo"
                                action="1"
                                multiple
                                :limit="100"
                                :file-list="fileList">
                            </el-upload>
                            <el-button size="small" type="primary" @click="downmmm">点击下载</el-button>
                    </el-form-item>
                    <el-form-item v-if="blooer == false" label="样品登记表 :" size="mini" :inline="true">
                        <el-radio-group v-model="radio1" >
                            <el-radio  :label="radio1">{{label1}}</el-radio>
                        </el-radio-group>
                        <el-button size="small" type="primary"  style="margin-left:10px;" v-if="btnok" @click="determinemmm">{{mmmconfim}}</el-button>
                    </el-form-item>
                </div>
                <!-- 样品照片 -->
                <div class="sample">
                    <el-form-item v-if="blooer2 == true" label="样品照片 :" size="mini" :inline="true">
                            <div class="div2"></div>
                            <el-upload
                            :disabled="true"
                            style="display:inline-block;"
                                class="upload-demo"
                                action="1"
                                multiple
                                :limit="100"
                                :file-list="fileList2">
                            </el-upload>
                            <el-button size="small" type="primary" @click="downsample">点击下载</el-button>
                    </el-form-item>
                    <el-form-item v-if="blooer2 == false" label="样品照片 :" size="mini" :inline="true">
                        <el-radio-group v-model="radio2" >
                            <el-radio  :label="radio2">{{label2}}</el-radio>
                        </el-radio-group>
                        <el-button size="small" type="primary" style="margin-left:10px;" v-if="btnok1"  @click="determinesample">{{sampleconfim}}</el-button>
                    </el-form-item>
                </div>
                <!-- 试验过程照片 -->
                <div class="experiment">
                    <el-form-item label="试验过程照片 :" v-if="blooer3 == true" size="mini" :inline="true" >
                                <div class="div3"></div>
                                <el-upload
                                :disabled="true"
                                style="display:inline-block;"
                                    class="upload-demo"
                                    action="1"
                                    multiple
                                    :limit="100"
                                    :file-list="fileList3">
                                </el-upload>
                                <el-button size="small" type="primary" @click="downexperiment">点击下载</el-button>
                    </el-form-item>
                    <el-form-item v-if="blooer3 == false" label="试验过程照片 :" size="mini" :inline="true">
                        <el-radio-group v-model="radio3">
                            <el-radio  :label="radio3">{{label3}}</el-radio>
                        </el-radio-group>
                        <el-button size="small" type="primary" style="margin-left:10px;"  v-if="btnok2" @click="determinexperiment">{{experimentconfim}}</el-button>
                    </el-form-item>
                </div>
                <!-- 原始记录 -->
                <div class="original">
                    <el-form-item label="原始记录 :" v-if="blooer4 == true" size="mini" :inline="true" >
                                <div class="div4"></div>
                                <el-upload
                                :disabled="true"
                                style="display:inline-block;"
                                    class="upload-demo"
                                    action="1"
                                    multiple
                                    :limit="100"
                                    :file-list="fileList4">
                                </el-upload>
                                <el-button size="small" type="primary" @click="downeoriginal">点击下载</el-button>
                    </el-form-item>
                    <el-form-item v-if="blooer4 == false" label="原始记录 :" size="mini" :inline="true">
                        <el-radio-group v-model="radio4">
                            <el-radio  :label="radio4">{{label4}}</el-radio>
                        </el-radio-group>
                        <el-button size="small" type="primary" style="margin-left:10px;"  v-if="btnok3" @click="determineoriginal">{{originalconfim}}</el-button>
                    </el-form-item>
                </div>
                <!-- 其他文件 -->
                <div class="otherFiles">
                    <el-form-item label="其他文件 :" v-if="blooer5 == true" size="mini" :inline="true" >
                                <div class="div5"></div>
                                <el-upload
                                :disabled="true"
                                style="display:inline-block;"
                                    class="upload-demo"
                                    action="1"
                                    multiple
                                    :limit="100"
                                    :file-list="fileList5">
                                </el-upload>
                                <el-button size="small" type="primary" @click="downotherFiles">点击下载</el-button>
                    </el-form-item>
                    <el-form-item v-if="blooer5 == false" label="其他文件 :" size="mini" :inline="true">
                        <el-radio-group v-model="radio5">
                            <el-radio  :label="radio5">{{label5}}</el-radio>
                        </el-radio-group>
                        <el-button size="small" type="primary" style="margin-left:10px;"  v-if="btnok4" @click="determineotherFiles">{{otherFilesconfim}}</el-button>
                    </el-form-item>
                </div>
            </el-tabs>
            <div style="width:100%;text-align:center;">
                <el-button @click="previous()" :disabled="previ" v-if="isflase">上一页</el-button>
                <el-button @click="nexts()" :disabled="next" v-if="isflase">下一页</el-button>
                <el-button @click="parmaConfrim()" v-if="isflase" :disabled="Isparma">确认归档</el-button>
                <el-button @click="delparma()" v-if="isflase">取消归档</el-button>
                <el-button @click="Confrimlzy()" v-if="istrue">确认归档</el-button>
            </div>
        </el-form>
        <object id="WO3Word2" classid="clsid:561C5A99-71C8-48d4-A3E2-16FC4F9880BF" Width="0" Height="0"
            style="display:block">
        </object>
    </div>
</template>

<script>
var m = 0;
var n = 0;
import base from "@/api/base.js"
export default {
    props:['tableData2','renwu','rows','permissions','bysdj','lengtharr','lzyobj'],
    data(){
        return {
            Isparma:false,
            // prises:true,
            isflase:true,
            istrue:true,
            radioss:'1',
            disa:true,
            disagroud:true,
            ti:'查看',
            Archivedialog:false,
            citys:{},
            formInline: {
                taskCode: ''
            },
            onead:'',
            fileList6:[],
            fileList: [],
            fileList2:[],
            fileList3:[],
            fileList4:[],
            fileList5:[],
            xb:0,
            id:0,
            activeName: "0", /*归档内选项卡*/
            radiox:'1',
            labelx:'1',
            radio1:'1',
            label1:'',
            radio2:'1',
            label2:'',
            radio3:'1',
            label3:'',
            radio4:'1',
            label4:'',
            radio5:'1',
            label5:'',
            blooer:true,
            blooer2:true,
            blooer3:true,
            blooer4:true,
            blooer5:true,
            previ:false,
            next:false,
            btnok:true,
            btnok1:true,
            btnok2:true,
            btnok3:true,
            btnok4:true,
            pathFolder:'',
            uidName:'',
            activeNameconfim:'',
            mmmconfim:'',
            sampleconfim:'',
            experimentconfim:'',
            originalconfim:'',
            otherFilesconfim:'',
            filename:'',
            activeNameconfimid:0,
            mmmconfimid:0,
            sampleconfimid:0,
            experimentconfimid:0,
            originalconfimid:0,
            otherFilesconfimid:0,
            radiobtntop:true,
            iconArry:{
                icons6:{
                    warning:false,
                    success:false
                }
            }
        }
    },
    created(){
        this.ids()
        this.initdata()
        this.confirmdel()
        
    },
    mounted(){
        this.par()
        this.getUid()
        this.clearState()
        this.initlzy()
    },
    methods:{
        //已归档  已提交归档
        isIsparma(){

        },
        initlzy(){
            this.fileList6 = []
            if(this.lzyobj.taskSheet){
                this.fileList6.push({name:this.lzyobj.taskSheet})
                let divone6 = document.querySelector(".div6");
                let uploadLlist6 = document.querySelector(".enterprise .el-upload-list");
                uploadLlist6.style.width = divone6.offsetWidth + 'px';
            }
        },
        clearState(){
            this.iconArry.icons6.warning = false;
            this.iconArry.icons6.success = false;
        },
        radiotop(value){
            console.log(value)
            this.radioss = value
            if(this.radioss != '1'){
                this.disa = true
            }else{
                this.disa = false
            }
        },
         //企业委托单上传文件
        handleRemove6(file, fileList6) {
        },
        handlePreview6(file) {
            console.log(file);
        },
        handleExceed6(files, fileList6) {
            this.$message.warning(`本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList6.length} 个文件`);
        },
        beforeRemove6(file, fileList6) {
            if(this.onead != 1){
                this.$message.warning(`该文件不可以删除`);
                return false
            }else{
                return this.$confirm(`确定移除 ${ file.name }？`);
            }
        },
        beforeUpload6(file){
            this.fileList6 = []
            let itmeName = this.fileList6.filter(item => {
                return file.name == item.name
            }).length
            if(itmeName != 0){
                this.$alert('不能上传相同的文件', {
                        dangerouslyUseHTMLString: true
                });
                return
            }
            this.fileList6.push({name:file.name})
            let data = {
                "file":file
            }
            this.filename = file.name
            let fd = new FormData();
            fd.append("file", file);
            fd.append("type",1)
            fd.append("taskId",this.rows.id)
            this.handledata(fd)
           
        },
        //上传
        handledata(fd){
            // this.fileList6 = []
            this.$api.taskmanage.uploadAttach(fd).then(res => {
                let data = res.data
                if(data.respCode == 0){
                    this.$alert(res.data.message, {
                        dangerouslyUseHTMLString: true
                    });
                    this.isNum = true;
                    if(this.lengtharr != '0'){
                         this.fileList6 = []
                    }
                    this.par()
                    this.iconArry.icons6.warning = false;
                    this.iconArry.icons6.success = false;
                   // this.fileList6.push({name:this.filename})
                    let divone6 = document.querySelector(".div6");
                    let uploadLlist6 = document.querySelector(".enterprise .el-upload-list");
                    uploadLlist6.style.width = divone6.offsetWidth + 'px';
                }
            }).catch(res=>{
                let data = res.data
                this.$alert(res.data.message, {
                    dangerouslyUseHTMLString: true
                });
            })
        },
        //初始化确认取消
        confirmdel(){
            if(this.lengtharr == '0'){
                if(this.lzyobj.taskSheetStatus == null || this.lzyobj.taskSheetStatus == "1"){
                this.radioss = '1'
                this.disa = false
                }else{
                    this.radioss = JSON.stringify(this.lzyobj.taskSheetStatus)
                    this.disa = true
                }
            }else{
                if(this.citys.taskSheetStatus == null || this.citys.taskSheetStatus == "1"){
                this.radioss = '1'
                this.disa = false
                }else{
                    this.radioss = JSON.stringify(this.citys.taskSheetStatus)
                    this.disa = true
                }
            }
            //试验报告
            if(this.citys.testReportConfirm == null || this.citys.testReportConfirm == 0){
                this.activeNameconfim = '确认'
                this.activeNameconfimid = 0
            }else{
                this.activeNameconfim = '取消确认'
                this.activeNameconfimid = 1
            }
            //样品登记表确认
            if(this.citys.sampleRegistrationConfirm  == null || this.citys.sampleRegistrationConfirm  == 0){
                this.mmmconfim = '确认'
                this.mmmconfimid = 0
            }else{
                this.mmmconfim = '取消确认'
                this.mmmconfimid = 1
            }
            //样品登照片确认
            if(this.citys.samplePicConfirm  == null || this.citys.samplePicConfirm  == 0){
                this.sampleconfim = '确认'
                this.sampleconfimid = 0
            }else{
                this.sampleconfim = '取消确认'
                this.sampleconfimid = 1
            }
            //过程照片确认
            if(this.citys.processPicConfirm  == null || this.citys.processPicConfirm  == 0){
                this.experimentconfim = '确认'
                this.experimentconfimid = 0
            }else{
                this.experimentconfim = '取消确认'
                this.experimentconfimid = 1
            }
            //原始记录确认
            if(this.citys.originalRecordConfirm  == null || this.citys.originalRecordConfirm  == 0){
                this.originalconfim = '确认'
                this.originalconfimid = 0
            }else{
                this.originalconfim = '取消确认'
                this.originalconfimid = 1
            }
            //其他文件确认
            if(this.citys.otherFilesConfirm  == null || this.citys.otherFilesConfirm  == 0){
                this.otherFilesconfim = '确认'
                this.otherFilesconfimid = 0
            }else{
                this.otherFilesconfim = '取消确认'
                this.otherFilesconfimid = 1
            }
        },
        //方法确认
        confirmMethod(num,type){
            if(num == null || num == 0){
                num = 1
            }else if(num == 1){
                num = 0
            }
            let params = {
                isConfirm:num,
                taskContentId:this.id,
                taskId:this.rows.id,
                type:type
            }
            this.$api.taskmanage.confirmOrCancel(params).then(res=>{
                console.log(res)
                this.pars()
                this.$message({ type: 'success', message: res.data.message });
            }).catch(error => {
                this.$message.error(error.data.message);
            })
        },
        //点击确认 -- 其他文件
        determineotherFiles(){
            let ber = this.citys.otherFilesConfirm
            this.confirmMethod(ber,6)
        },
        //点击确认 -- 原始记录确认
        determineoriginal(){
            let ber = this.citys.originalRecordConfirm
            this.confirmMethod(ber,5)
        },
        //点击确认 -- 过程照片确认
        determinexperiment(){
            let ber = this.citys.processPicConfirm
            this.confirmMethod(ber,4)
        },
        //点击确认 -- 样品照片确认
        determinesample(){
            let ber = this.citys.samplePicConfirm
            this.confirmMethod(ber,3)
        },
        //点击确认 -- 样品登记表确认
        determinemmm(){
            let ber = this.citys.sampleRegistrationConfirm
            this.confirmMethod(ber,2)
        },
        //点击确认 -- 试验报告确认
        determineactiveName(){
            let ber = this.citys.testReportConfirm
            this.confirmMethod(ber,7)
        },
        getUid(){ //获取登陆者id
            this.$api.lxtinitial.uid().then(res => {
                this.uidName = res.data.data.loginName
            }).catch(res=>{
                this.$alert(res.data.message, '信息提示', {
                     dangerouslyUseHTMLString: true
                });
            })
        },
        //查看报告
        look(item){  //查看报告
        var serial_number = this.tableData2[this.xb].itemsCode;
            const row = {
                id : this.id,
                process_instance_id : "7",
                taskid:serial_number
            }
            console.log(row)
            this.clickOpenReport(row)
        },
        clickOpenReport(row) { // 查看-打开报告
            let params = {
                instanceId: row.id,
                provessinstanceId: row.process_instance_id,
                taskId: row.taskid
            }
            if(row.process_instance_id=="5" || row.process_instance_id=="6"){
                this.$api.taskmanage.apiGoOpenWordForTask(params).then(res => {
                    if(!res.data.data){
                        this.goOpenWord(row.id, row.taskid, row.process_instance_id);
                    }else{
                        this.$message.error(res.data.data);
                    }
                })
            }else{
                this.goOpenWord(row.id, row.taskid, row.process_instance_id);
            }
        },
        goOpenWord(instanceID, report_no, process) {
            let loginName = this.uidName;
            let obj = document.getElementById("WO3Word2");
            if(loginName){
                this.$api.surveyissue.apiSetSession(instanceID).then(res => {
                    if(res.data.data == "1"){
                        try {
                            obj.setUid(loginName);
                            obj.setFileId(instanceID);
                            obj.setReportNo(report_no);
                            console.log(report_no)
                            obj.setProcess(process);
                            obj.setRemoteIp(base.baseImgTable);
                            obj.ActiveStart();
                        }catch(error){
                           console.log(error)
                            if (confirm("您确认没有安装Word控件吗? 点确定您将下载setup.zip 解压后运行setup.exe即可")){
                                window.open(base.baseImgTable+"/resources/donet/setup.zip");
                            }
                        }
                    }else if(res.data.data == "2"){
                        this.$message.error('该小批量报告 已经被打开，或打开没有正常关闭');
                    }else {
                        this.$message.error('已经超时，请重新登录');
                    }
                }).catch(error => {
                    this.$message.error(error);
                });
            }
	    },
      /*
      * 功能: 归档确认 _ 任务单 _ 查看文件
      * */
      CheckFile() {
        console.log(this.rows.id);
        this.$api.taskmanage.printXlsByTaskId(this.rows.id).then(res => {
          if (res.data.data && res.data.ok && Object.keys(res.data.data).length != 0) {
            var objj = encodeURI(JSON.stringify(res.data.data));
            var routeData = this.$router.resolve({
              name: "print",
              query: {lzy: objj}
            });
            window.open(routeData.href, '_blank');
          } else {
            this.$alert(res.data.message, {
              dangerouslyUseHTMLString: true
            });
          }
        })
      },
        //方法下载
        interface(params){
          var formEle = document.createElement('form');
          formEle.setAttribute('id','formId')
          formEle.setAttribute('method','POST');
          formEle.setAttribute('action',this.$api.taskmanage.getdownloadpath());
          document.body.appendChild(formEle);

          //input元素
          var input1 = document.createElement('input');
          input1.setAttribute('type','hidden');
          input1.setAttribute('name','fileName');
          input1.setAttribute('value', params.fileName);
          formEle.appendChild(input1);

          var input2 = document.createElement('input');
          input2.setAttribute('type','hidden');
          input2.setAttribute('name','pathFolder');
          input2.setAttribute('value', params.pathFolder);
          formEle.appendChild(input2);

          var input3 = document.createElement('input');
          input3.setAttribute('type','hidden');
          input3.setAttribute('name','taskContentId');
          input3.setAttribute('value', params.taskContentId);
          formEle.appendChild(input3);

          var input4 = document.createElement('input');
          input4.setAttribute('type','hidden');
          input4.setAttribute('name','type');
          input4.setAttribute('value', params.type);
          formEle.appendChild(input4);

          var input5 = document.createElement('input');
          input5.setAttribute('type','hidden');
          input5.setAttribute('name','taskId');
          input5.setAttribute('value',this.rows.id);
          formEle.appendChild(input5);

          var formId = document.getElementById('formId');
          formId.submit();
          document.body.removeChild(formEle);
        },
        //传值
        lzymini(data,type){
            if(data.length == 0){
                 this.$alert('请上传文件后下载', {
                    dangerouslyUseHTMLString: true
                });
            }else if(data.length == 1){
                let params = {
                    fileName: this.strs(data),   //要下载的文件名
                    pathFolder: this.pathFolder,   //文件夹名称，来源为 |我的报告|归档|信息回显
                    // /api/TaskReport/viewGd/{taskContentId} 接口里面的pathFolder，可为空
                    taskContentId: this.id,  //报告任务id
                    type: type ,
                }
                this.interface(params)
            }else{
                let params = {
                    fileName:'',
                    pathFolder: this.pathFolder,   //文件夹名称，来源为 |我的报告|归档|信息回显
                    // /api/TaskReport/viewGd/{taskContentId} 接口里面的pathFolder，可为空
                    taskContentId: this.id,  //报告任务id
                    type: type ,
                }
                this.interface(params)
            }
        },
        //下载企业委托单
        downloadEnterprise(){
            this.lzymini(this.fileList6,1)
        },
        //下载报告
        downactiveName(){
            this.$api.lxtinitial.downReport(this.id).then(res => {
              if(res.data.data == 0){
                this.$alert('没有文件', '信息提示', {
                    dangerouslyUseHTMLString: true
                });
              }else if(res.data.data == 2){
                this.$alert('请稍后，服务器正在处理文件', '信息提示', {
                    dangerouslyUseHTMLString: true
                });
              }else{
                this.downfile(res.data.data)
              }
            }).catch(res => {
                 this.$alert("下载失败", '信息提示', {
                        dangerouslyUseHTMLString: true
                });
            })
        },
        downfile(data) {
            var obj = document.getElementById("WO3Word2");
			obj.setDownType("1");
			obj.setExecuteaction("0");
			obj.setServerIP(base.baseImgTable);
			obj.setIds(data);
			obj.downStart();
        },
        //下载样品登记
        downmmm(){
            this.lzymini(this.fileList,2)
        },
        //下载样品照片
        downsample(){
            this.lzymini(this.fileList2,3)
        },
        //试验照片下载
        downexperiment(){
            this.lzymini(this.fileList3,4)
        },
        //原始记录
        downeoriginal(){
            this.lzymini(this.fileList4,5)
        },
        //其他文件
        downotherFiles(){
            this.lzymini(this.fileList5,6)
        },
        //列表无数据的时候
        Confrimlzy(){
            let params = {
                taskSheetStatus:this.radioss,
                taskId: this.rows.id,   //任务id
                taskSheet:this.strs(this.fileList6)
            }
            if(this.fileList6.length==0 && this.radioss == 1){
                    this.iconArry.icons6.warning = true;
                    this.iconArry.icons6.success = false;
                }else if(this.radioss != 1){
                    this.iconArry.icons6.warning = false;
                    this.iconArry.icons6.success = false
                }else{
                    this.iconArry.icons6.warning = false;
                    this.iconArry.icons6.success = true
                }
                 if(this.radioss == 1 && this.fileList6.length != 0){
                    m++;
                }
                if(this.radioss == 1 ){
                    n++;
                }
                if(m != n){
                    this.$alert('请上传所有信息', {
                        dangerouslyUseHTMLString: true
                    });
                    m=0;
                    n=0;
                    return;
                }
            this.$api.taskmanage.confirmGd(params).then(res=>{
                if(res.data.respCode == '0'){
                    this.$alert(res.data.message, {
                        dangerouslyUseHTMLString: true
                    });
                    this.lzyobj = res.data.data
                    console.log(this.lzyobj)
                    this.fileList6 = []
                    this.initlzy()
                    this.iconArry.icons6.warning = false;
                    this.iconArry.icons6.success = true;
                }
            }).catch(error=>{
                this.$alert(error.data.message, {
                    dangerouslyUseHTMLString: true
                });
                this.iconArry.icons6.warning = true;
                this.iconArry.icons6.success = false
            })
        },
        //确认归档
        list(parms){
            let listpu = []
            if(parms.length == 0){
                  return listpu
            }else{
                parms.map(item=>{
                   listpu.push(item.name)
                })
                return listpu
            }
        },
        strs(params){
            let strlist;
            if(params.length == 0){
                strlist = null
            }else{
                strlist = params[0].name
            }
            return strlist
        },
        parmaConfrim(){
            let params = {
                taskSheetStatus:this.radioss,
                taskContentId:this.id,          //任务报告id(主键，唯一)
                testReportStatus: this.radiox,       //试验报告，是否为纸质归档 0 否 1是
                sampleRegistrationStatus: this.radio,    //样品登记表状态  1电子归档 2纸质归档 3其他归档 4 无
                samplePicStatus: this.radio1,  //样品照片状态  1电子归档 2纸质归档 3其他归档 4 无
                processPicStatus: this.radio2, //过程照片状态  1电子归档 2纸质归档 3其他归档 4 无
                originalRecordStatus: this.radio3,     //原始记录表状态  1电子归档 2纸质归档 3其他归档 4 无
                otherFilesStatus: this.radio4,     //其他文件状态  1电子归档 2纸质归档 3其他归档 4 无
                sampleRegistrationList: this.list(this.fileList),       //样品登记表上传的文件信息，数组类型，
                samplePicList: this.list(this.fileList2),     //样品照片上传的文件信息，数组类型，
                processPicList: this.list(this.fileList3),    //过程照片上传的文件信息，数组类型，
                originalRecordList: this.list(this.fileList4),   //原始文件表上传的文件信息，数组类型，
                otherFilesList: this.list(this.fileList5),   //其他文件上传的文件信息，数组类型，下面有字符串类型
                taskId: this.rows.id,   //任务id
                taskSheet:this.strs(this.fileList6)
            }
            
            if(this.bysdj != '2'){
                if(this.fileList6.length==0 && this.radioss == 1){
                    this.iconArry.icons6.warning = true;
                    this.iconArry.icons6.success = false;
                }else if(this.radioss != 1){
                    this.iconArry.icons6.warning = false;
                    this.iconArry.icons6.success = false
                }else{
                    this.iconArry.icons6.warning = false;
                    this.iconArry.icons6.success = true
                }
                 if(this.radioss == 1 && this.fileList6.length != 0){
                    m++;
                }
                if(this.radioss == 1 ){
                    n++;
                }
            }
            if(m != n){
                this.$alert('请上传所有信息', {
                    dangerouslyUseHTMLString: true
                });
                m=0;
                n=0;
                return;
            }
            //
            if(this.fileList6.length==0 && this.radioss == 1){
                    this.iconArry.icons6.warning = true;
                    this.iconArry.icons6.success = false;
                }else if(this.radioss != 1){
                    this.iconArry.icons6.warning = false;
                    this.iconArry.icons6.success = false
                }else{
                    this.iconArry.icons6.warning = false;
                    this.iconArry.icons6.success = true
                }
                 if(this.radioss == 1 && this.fileList6.length != 0){
                    m++;
                }
                if(this.radioss == 1 ){
                    n++;
                }
                if(m != n){
                    this.$alert('请上传所有信息', {
                        dangerouslyUseHTMLString: true
                    });
                    m=0;
                    n=0;
                    return;
                }
            this.$api.taskmanage.confirmGd(params).then(res=>{
                console.log(res)
                if(res.data.respCode == '0'){
                    this.$alert(res.data.message, {
                        dangerouslyUseHTMLString: true
                    });
                    this.fileList6 = []
                    this.par()
                    this.confirmdel()
                    if(this.onead == '已提交归档'){
                        this.iconArry.icons6.warning = false;
                        this.iconArry.icons6.success = true;
                    }else{
                        this.iconArry.icons6.warning = false;
                        this.iconArry.icons6.success = false;
                    }
                    
                }
            }).catch(error=>{
                this.$alert(error.data.message, {
                    dangerouslyUseHTMLString: true
                });
                if(this.onead == '已提交归档'){
                    this.iconArry.icons6.warning = false;
                    this.iconArry.icons6.success = true;
                }else{
                    this.iconArry.icons6.warning = false;
                    this.iconArry.icons6.success = false;
                }
            })
        },
        //取消归档
        delparma(){
            console.log(this.id)
            this.$api.taskmanage.cancelGd(this.id).then(res=>{
                this.$alert(res.data.message, {
                    dangerouslyUseHTMLString: true
                });
                this.fileList6 = []
                this.par()
                this.iconArry.icons6.warning = false;
                    this.iconArry.icons6.success = false;
            }).catch(error=>{
                this.$alert(error.data.message, {
                    dangerouslyUseHTMLString: true
                });
                this.iconArry.icons6.warning = false;
                    this.iconArry.icons6.success = false;
            })
        },
        initdata(){
            if(this.citys.sampleRegistrationList){
                    let _height = 25;
                    let _top = 10;
                    let bb = this.citys.sampleRegistrationList
                    console.log(bb)
                    
                    bb.map(item=>{
                        this.fileList.push({name:item})
                    })
                    let divone1 = document.querySelector(".div1");
                    let uploadLlist1 = document.querySelector(".mmm .el-upload-list");
                    divone1.style.height = this.citys.sampleRegistrationList.length * (_height+_top) + 'px';
                    uploadLlist1.style.width = divone1.offsetWidth + 'px';
            }
        // console.log(this.id,this.rows.id)
        let params = {
          fileName: this.strs(this.fileList6),   //要下载的文件名
          pathFolder: this.pathFolder,   //文件夹名称，来源为 |我的报告|归档|信息回显
          // /api/TaskReport/viewGd/{taskContentId} 接口里面的pathFolder，可为空
          taskContentId: this.id,  //报告任务id
          type: 1,
          taskid: this.row.id
        }
      },
      //提交归档
      list(parms) {
        let listpu = []
        if (parms.length == 0) {
          return listpu
        } else {
          parms.map(item => {
            listpu.push(item.name)
          })
          return listpu
        }
      },
      strs(params) {
        let strlist;
        if (params.length == 0) {
          strlist = null
        } else {
          strlist = params[0].name
        }
        return strlist
      },
      initdata() {
        if (this.citys.sampleRegistrationList) {
          let _height = 25;
          let _top = 10;
          let bb = this.citys.sampleRegistrationList;
          // console.log(bb);
          bb.map(item => {
            this.fileList.push({name: item})
          })
          let divone1 = document.querySelector(".div1");
          let uploadLlist1 = document.querySelector(".mmm .el-upload-list");
          divone1.style.height = this.citys.sampleRegistrationList.length * (_height + _top) + 'px';
          uploadLlist1.style.width = divone1.offsetWidth + 'px';
        }

        if (this.citys.samplePicList) {
          let _height = 25;
          let _top = 10;
          let bb = this.citys.samplePicList;
          bb.map(item => {
            this.fileList2.push({name: item})
          });
          let divone1 = document.querySelector(".div2");
          let uploadLlist1 = document.querySelector(".sample .el-upload-list");
          divone1.style.height = this.citys.samplePicList.length * (_height + _top) + 'px';
          uploadLlist1.style.width = divone1.offsetWidth + 'px';
        }

        if (this.citys.processPicList) {
          let _height = 25;
          let _top = 10;
          let bb = this.citys.processPicList;
          // console.log(bb);
          bb.map(item => {
            this.fileList3.push({name: item})
          });
          let divone1 = document.querySelector(".div3");
          let uploadLlist1 = document.querySelector(".experiment .el-upload-list");
          divone1.style.height = this.citys.processPicList.length * (_height + _top) + 'px';
          uploadLlist1.style.width = divone1.offsetWidth + 'px';
        }

        if (this.citys.originalRecordList) {
          let _height = 25;
          let _top = 10;
          let bb = this.citys.originalRecordList;
          // console.log(bb);
          bb.map(item => {
            this.fileList4.push({name: item})
          })
          let divone1 = document.querySelector(".div4");
          let uploadLlist1 = document.querySelector(".original .el-upload-list");
          divone1.style.height = this.citys.originalRecordList.length * (_height + _top) + 'px';
          uploadLlist1.style.width = divone1.offsetWidth + 'px';
        }

        if (this.citys.otherFilesList) {
          let _height = 25;
          let _top = 10;
          let bb = this.citys.otherFilesList;
          console.log(bb);
          bb.map(item => {
            this.fileList5.push({name: item})
          });
          let divone1 = document.querySelector(".div5");
          let uploadLlist1 = document.querySelector(".otherFiles .el-upload-list");
          divone1.style.height = this.citys.otherFilesList.length * (_height + _top) + 'px';
          uploadLlist1.style.width = divone1.offsetWidth + 'px';
        }
      },
      iflist() {

          if(this.citys.taskSheetStatus == null || this.citys.taskSheetStatus == "1"){
            this.radioss = '1'
            if(this.permissions == 0){
                this.disd = true
            }else{
                this.disd = false
            }
        }else{
            this.radioss = JSON.stringify(this.citys.taskSheetStatus)
            this.disd = true
        }


        if (this.citys.sampleRegistrationStatus === null || this.citys.sampleRegistrationStatus == '1') {
          this.blooer = true
        } else {
          this.blooer = false;
          if (this.citys.sampleRegistrationStatus == '2') {
            this.radio1 = '2';
            this.label1 = '纸质归档'
            this.btnok = true;
          } else if (this.citys.sampleRegistrationStatus == '3') {
            this.radio1 = '3';
            this.label1 = '其他归档'
            this.btnok = true;
          } else {
            this.btnok = false;
            this.radio1 = '4';
            this.label1 = '无'
          }
        }

        if (this.citys.samplePicStatus === null || this.citys.samplePicStatus == '1') {
          this.blooer2 = true
        } else {
          this.blooer2 = false;
          if (this.citys.samplePicStatus == '2') {
            this.radio2 = '2';
            this.label2 = '纸质归档'
            this.btnok1 = true;
          } else if (this.citys.samplePicStatus == '3') {
            this.radio2 = '3';
            this.label2 = '其他归档'
            this.btnok1 = true;
          } else {
            this.btnok1 = false;
            this.radio2 = '4';
            this.label2 = '无';
          }
        }

        if (this.citys.processPicStatus === null || this.citys.processPicStatus == '1') {
          this.blooer3 = true
        } else {
          this.blooer3 = false;
          if (this.citys.processPicStatus == '2') {
            this.radio3 = '3';
            this.label3 = '纸质归档'
            this.btnok2 = true
          } else if (this.citys.processPicStatus == '3') {
            this.radio3 = '3';
            this.label3 = '其他归档'
            this.btnok2 = true
          } else {
            this.radio3 = '4';
            this.label3 = '无';
            this.btnok2 = false
          }
        }

        if (this.citys.originalRecordStatus === null || this.citys.originalRecordStatus == '1') {
          this.blooer4 = true
        } else {
          this.blooer4 = false;
          if (this.citys.originalRecordStatus == '2') {
            this.radio4 = '2';
            this.label4 = '纸质归档'
            this.btnok3 = true
          } else if (this.citys.originalRecordStatus == '3') {
            this.radio4 = '3';
            this.label4 = '其他归档'
            this.btnok3 = true
          } else {
            this.radio4 = '4';
            this.label4 = '无';
            this.btnok3 = false
          }
        }

            if(this.citys.testReportStatus === null || this.citys.testReportStatus == '1'){
                this.radiox= '1'
                this.labelx = '是'
            }else{
                this.radiox= '2'
                this.labelx = '否'
            }

            if(this.citys.otherFilesStatus === null || this.citys.otherFilesStatus == '1'){
                this.blooer5 = true
            }else{
                this.blooer5 = false
                if(this.citys.otherFilesStatus == '2'){
                    this.radio5= '2'
                    this.label5 = '纸质归档'
                    this.btnok4 = true
                }else if(this.citys.otherFilesStatus == '3'){
                    this.radio5= '3'
                    this.label5 = '其他归档'
                    this.btnok4 = true
                }else{
                    this.radio5= '4'
                    this.label5 = '无'
                    this.btnok4 = false
                }
            }
        },
        ids(){
            this.previ = true
            if(this.tableData2.length == 1){
                this.previ = true
                this.next = true
            }
            console.log(this.lengtharr)
            if(this.lengtharr == '0'){
                this.isflase = false
                this.istrue = true
            }else{
                this.isflase = true
                this.istrue = false
                this.id = this.tableData2[0].id
            }
        },
        par(b){
            // this.fileList6 = []
            this.fileList = []
            this.fileList2 = []
            this.fileList3 = []
            this.fileList4 = []
            this.fileList5 = []
            this.formInline.taskCode = this.renwu
            var m = 0;
            var n = 0;
            if(this.bysdj == '2'){
                if(this.fileList6.length == 0 && this.radioss == 1){
                    this.iconArry.icons6.warning = true;
                    this.iconArry.icons6.success = false;
                }else if(this.radioss != 1){
                    this.iconArry.icons6.warning = false;
                    this.iconArry.icons6.success = false
                }else{
                    this.iconArry.icons6.warning = false;
                    this.iconArry.icons6.success = true
                }
                 if(this.radioss == 1 && this.fileList6.length != 0){
                        m++;
                    }
                if(this.radioss == 1 ){
                        n++;
                }
                // this.prises = false
                this.disa = false
                this.disagroud = false
            }

            this.$api.taskmanage.TaskReport(this.id).then(res=>{
                console.log(res.data.data)
                    this.citys = res.data.data
                    if(b != 1){
                        if(this.citys.taskSheet){
                            this.fileList6.push({name:this.citys.taskSheet})
                            let divone6 = document.querySelector(".div6");
                            let uploadLlist6 = document.querySelector(".enterprise .el-upload-list");
                            uploadLlist6.style.width = divone6.offsetWidth + 'px';
                        }
                    }
                    
                    this.pathFolder = res.data.data.pathFolder
                    console.log(this.citys)
                    if(this.citys.docStatus == '1'){
                        this.onead = '已归档'
                    }else if(this.citys.docStatus == '-1'){
                        this.onead = '已提交归档'
                        this.Isparma = true
                    }else{
                        this.onead = '未提交归档'
                    }
                this.initdata()
                this.iflist()
                this.confirmdel()
            })

        },
        pars(){
            this.$api.taskmanage.TaskReport(this.id).then(res=>{
                this.citys = res.data.data
                this.confirmdel()
            })
        },
        btnpane(i){
            this.xb = i
            let numbers = this.tableData2.length-1
            if(i === numbers *1){
                this.next = true
                this.previ = false
            }else if(i === 0){
                this.next = false
                this.previ = true
            }else{
                this.next = false
                this.previ = false
            }
            console.log(i,numbers)
            this.fileList = []
            this.fileList2 = []
            this.fileList3 = []
            this.fileList4 = []
            this.fileList5 = []
            // this.fileList6 = []
            this.id = this.tableData2[i].id
            this.par(1)
            this.iconArry.icons6.warning = false;
            this.iconArry.icons6.success = false;
        },
        radiobot(value){
            console.log(value)
            this.radiox = value
        },
        //下一页
        nexts(){
            console.log(this.xb)
            this.clearState()
            let i = this.xb*1
            let num = 1
            let strnum = Number(this.activeName)+num
            if(i+1 === this.tableData2.length-1){
                this.next = true
                this.previ = false
            }else{
                this.next = false
                this.previ = false
            }
            if(i < this.tableData2.length-1){
                this.id = this.tableData2[i+1].id
                 console.log(this.tableData2[i+1].id)
                i+1;
                this.xb = this.xb+1
                this.activeName =strnum.toString()
                // this.fileList6 = []
                this.par(1)
                this.iflist()
                this.iconArry.icons6.warning = false;
                this.iconArry.icons6.success = false
                this.confirmdel()
                console.log(this.tableData2.length-1,i)
            }else{
                this.xb = this.tableData2.length-1
            }
        },
        // 上一页
        previous(){
            console.log(this.xb)
            this.clearState()
            let i = this.xb*1
            if(i-1 === 0){
                this.next = false
                this.previ = true
            }else{
                this.next = false
                this.previ = false
            }
            console.log(i)
            if(i > 0){
                this.id = this.tableData2[i-1].id
                i-1;
                this.xb = this.xb -1
                this.activeName =JSON.stringify(Number(this.activeName-1))
                // this.previ = false
                // this.next = false
                // this.fileList6 = []
                this.par(1)
                this.pars()
                this.iconArry.icons6.warning = false;
                this.iconArry.icons6.success = false
                this.confirmdel()
            }else{
                this.xb = 0
                // this.previ = false
                // this.next = false
            }
        },
    },
  }
</script>
<style lang="scss" scoped>
  .form_inline {
    .el-input {
      width: 274px;
      height: 54px;
    }
  }

  .spans {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    overflow-x: scroll;
    span {
      height: 100%;
      padding: 15px 15px;
      flex-shrink: 0;
      text-align: center;
      border: 1px solid #eee;
    }
}
.bao{
width: 25%;
        height: auto;
        padding: 20px 0;
        border: 1px solid #ccc;
        border-radius: 5px;
        display:inline-block;
}
.div6,.div1,.div2,.div3,.div4,.div5{
        width: 25%;
        height: auto;
        padding: 20px 0;
        border: 1px solid #ccc;
        border-radius: 5px;
        display:inline-block;
        // position: relative;
        // top: 15px;
        
}
.spans span:hover{
    cursor:pointer
}
.active{
    color:blue;
    background:#fff;
}
.enterprise,.mmm,.sample,.experiment,.original,.otherFiles{ position: relative;}
/deep/ .enterprise .el-form-item .el-form-item__content .upload-demo .el-upload-list { position:absolute; left:0;top:-4px;}
/deep/ .mmm .el-form-item .el-form-item__content .upload-demo .el-upload-list { position:absolute; left:0;top:-4px;}
/deep/ .sample .el-form-item .el-form-item__content .upload-demo .el-upload-list { position:absolute; left:0;top:-4px;}
/deep/ .experiment .el-form-item .el-form-item__content .upload-demo .el-upload-list { position:absolute; left:0;top:-4px;}
/deep/ .original .el-form-item .el-form-item__content .upload-demo .el-upload-list { position:absolute; left:0;top:-4px;}
/deep/ .otherFiles .el-form-item .el-form-item__content .upload-demo .el-upload-list { position:absolute; left:0;top:-4px;}
/deep/.el-icon-warning{ color:red; font-size: 30px; position: relative; top: 5px; left: 5px;}
/deep/.el-icon-success{ color:#67c23a; font-size: 30px; position: relative; top: 5px; left: 5px;}

.el-form-item{
    display: flex;
    align-items: center;
}
/deep/ .form_inline .el-form-item__label {
    width: 10% !important;
}
/deep/ .form_inline .el-form-item__content {
    margin: 0 !important;
    display: flex;
    align-items: center;
    width: 100% !important;
}
/deep/ .form_inline .el-form-item__content .upload-demo {
    margin-left: 20px;
}
</style>
