import base from '../base'
import axios from '../../utils/http'


const draft = {
    // 查询列表
    findList(obj) {
        return axios.get(`${base.lin}/Indextask/list1`, {
            params: {
                taskCode: obj.taskCode,
                companyCheck: obj.companyCheck,
                sampleName: obj.sampleName,
                sampleType: obj.sampleType,
                commiterId: obj.commiterId,
                entPage: 0,
                currentPage:obj.currentPage,
                pageSize:obj.pageSize
            }
        })
    },
    //批量删除
    deleteIndextaskList(str) {
        return axios.post(`${base.lin}/Indextask/deleteIndextaskList?taskid=` + str)
    },
    //点击绑定显示
    bindzdList(obj) {
        return axios.get(`${base.lin}/Indextask/bindzdList?taskid=` + obj.id + '&currentPage=' + obj.currentPage4s + '&pageSize=' + obj.pageSizes)
    },
    //点击绑定
    bindTask(obj) {
        return axios.get(`${base.lin}/Indextask/bindTask`, {
            params: {
                taskid: obj.taskid,
                inspectID: obj.inspectID
            }
        })
    },
    //点击删除
    delete(id) {
        return axios.delete(`${base.lin}/Indextask/` + id)
    },
    // 查询详情
    getDetail(taskid) {
        return axios.get(`${base.lin}/Indextask/IndextasDetail`, {
            params: {
                taskid: taskid
            }
        })
    },
    //任务分配
    taskDetails(ovj){
        return axios.post(`${base.wang}/Indextask/taskDetail?taskid=`+ovj.taskid+'&processInstanceId='+ovj.processInstanceId+'&searchdate='+ovj.searchdate)
    }
}

export default draft;