import base from '../base'
import axios from '../../utils/http'

const role = {
    // 获取角色列表
    getRoleList(roleVo) {
        return axios.get(`${base.hanlei}/roleManagement/findList`, {
            params: {
                roleCode: roleVo.rolecode,
                roleName: roleVo.rolename
            }
        })
    },
    // 增加角色
    addRole(roleVo) {
        return axios.post(`${base.hanlei}/roleManagement/addRole`, roleVo)
    },

    // 修改角色
    editRole(roleVo) {
        return axios.put(`${base.hanlei}/roleManagement/editRole`, roleVo)
    },

    // 删除角色
    deleteRole(ids) {
        return axios.delete(`${base.hanlei}/roleManagement/${ids}`)
    }
}

export default role;
