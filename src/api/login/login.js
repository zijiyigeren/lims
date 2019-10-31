import base from '../base'
import axios from '../../utils/http'

const login = {
    // 登录
    login(userVo) {
        return axios.post(`${base.hanlei}/login`, userVo)
    },
    // 退出
    logout() {
        return axios.get(`${base.hanlei}/logout`)
    },
    pullUserInfo() {
        return axios.get(`${base.wang}/userInfo`)
    },
    // 修改密码
    modifyPass(passVo) {
        return axios.post(`${base.hanlei}/moidfyPass`, passVo)
    },
    // 导航菜单
    userMenu() {
        return axios.get(`${base.hanlei}/userMenu`)
    },

}

export default login