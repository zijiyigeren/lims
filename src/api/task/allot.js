import base from '../base'
import axios from '../../utils/http'


const allot = {
    //报告类型
    findworkflow(){
        return axios.get(`${base.wang}/job/task/findWorkFlow/`+ '2')
    },
    findtasklist(obj){
        return axios.post(`${base.wang}/job/task/findTaskList`,obj)
    },
    //检验类型
    findCheckType(){
        return axios.get(`${base.wang}/job/task/findCheckType`)
    },
    //点击阅览
    findJobContent(obj){
        return axios.post(`${base.wang}/job/task/findJobContent?taskid=`+obj.iddd,obj)
    },
    //点击子浏览
    findWorkLog(id){
        return axios.get(`${base.wang}/taskmanager/findWorkLog?id=`+id)
    },
    //提交
    taskToDoNext(obj){
        return axios.post(`${base.wang}/job/task/taskToDoNext`,obj)
    },
    //回退
    findBackFlow(params){
        return axios.get(`${base.wang}/job/task/findBackFlow/`+params.processinstance)
    },
    //确定回退
    goBack(params){
        return axios.post(`${base.wang}/job/task/goBack`,params)
    }
}
export default allot;