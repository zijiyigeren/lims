import base from '../base'
import axios from '../../utils/http'
// 问题报告

const surveyissue = {
    // 获取列表数据
    apiFindList() { 
        return axios.get(`${base.entrustamend}/sysword/findList`)
    },
    // 重新执行
    apiReexecuteEeport(params) {
        return axios.put(`${base.entrustamend}/sysword/reexecuteEeport?execid=${params}`)
    },
    // 回退报告
    apiBackReport(params) {
        return axios.put(`${base.entrustamend}/sysword/backReport?execid=${params.execid}&inspectid=${params.inspectid}`)
    },
    apiSetSession(params) { 
        return axios.get(`${base.entrustamend}/TaskAjax/setSession/${params}`)
    },
}

export default surveyissue