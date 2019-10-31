import base from '../base'
import axios from '../../utils/http'

const data = {
    lxtreport(params) {  // 获取报告类型列表数据 公共接口
        return axios.get(`${base.lxtbaseUrl}/job/task/findWorkFlow/`+params)
    },
    queryselect(params) {  // 查询按钮
        return axios.post(`${base.lxtbaseUrl}/job/task/findTaskList`,params)
    },
    gitTestdata(params) {  // 检验类型列表数据 公共接口
        return axios.get(`${base.lxtbaseUrl}/job/task/findCheckType`,{params})
    },
    getwomuntow(id,params) {  // 二级列表展示数据 公共接口
        return axios.post(`${base.lxtbaseUrl}/job/task/findJobContent?taskid=`+id,params)
    },
    getwomunthree(params) {  //三级列表展示数据 公共接口
        return axios.get(`${base.lxtbaseUrl}/taskmanager/findWorkLog`,{params})
    },
    gotonext(params) {  //提交下一步
        return axios.post(`${base.lxtbaseUrl}/job/task/taskToDoNext`,params)
    },
    gotonext2(params) {  //提交下一步  有被回退的信息
        return axios.post(`${base.lxtbaseUrl}/job/task/taskToDoNext2`,params)
    },
    goupload(params) {  //上传按钮
        console.log(params)
        return axios.post(`${base.lxtbaseUrl}/job/task/uploadLocalFile`,params)
    },
    infortion(id) {  //检验类型数据展示
        return axios.get(`${base.lxtbaseUrl}/job/task/findTemplate/`+id)
    },
    testop(params) {  //通过检验类型下拉选中的值 来请求 已有模板 的数据展示
        return axios.get(`${base.lxtbaseUrl}/job/task/findTemplateName/`+params)
    },
    reportaudit() {  // 获取报告类型 检验类型 的列表数据   报告审核
        return axios.get(`${base.lxtbaseUrl}/task/audit/findOptions`)
    },
    approval() {  // 获取报告类型 检验类型 的列表数据   报告审批
        return axios.get(`${base.lxtbaseUrl}/task/approve/findOptions`)
    },
    replace(params){  //替换按钮
        return axios.get(`${base.lxtbaseUrl}/job/task/uploadReplaceFile`,{params})
    },
    cqcrestore(params){ // CQC文件还原
        return axios.get(`${base.lxtbaseUrl}/job/task/restoreCQC/`+params)
    },
    flow(params){  //回退按钮弹框里面下拉的内容信息
        return axios.get(`${base.lxtbaseUrl}/job/task/findBackFlow/`+params)
    },
    goBack(params){  //回退按钮功能实现
        return axios.post(`${base.lxtbaseUrl}/job/task/goBack`,params)
    },
    goBackClear(params){  //回退（退回弹框里面的内容信息）之前 调用清除缓存接口
        return axios.put(`${base.lxtbaseUrl}/TaskAjax/goClearWord?ids=${params}`)
    },
    downReport(params){ // 批量下载报告
        return axios.get(`${base.lxtbaseUrl}/job/task/downCheck/`+params)
    },
    uploadReport(params){ // 批量上传报告
        return axios.get(`${base.lxtbaseUrl}/job/task/uploadCheck/`+params)
    },
    uid(){ // 批量上传报告
        return axios.get(`${base.lxtbaseUrl}/userInfo`)
    },
    detailed(a,b,c){  //详细
        return axios.post(`${base.lxtbaseUrl}/Indextask/taskDetail?taskid=${a}&searchdate=${b}&processInstanceId=${c}`)
    },
    examination (a,b,c){  //查看报告    审核，审批 专属接口
        return axios.get(`${base.lxtbaseUrl}/TaskAjax/goOpenWordForTask?instanceId=${a}&provessinstanceId=${b}&taskId=${c}`)
    },

    

}

export default data