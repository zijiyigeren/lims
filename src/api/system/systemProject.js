import base from '../base'
import axios from '../../utils/http'
const systemProject=
 {
    //展示车辆类型数据
   readCarProject(typeflag){
     return axios.get(`${base.baseUrl}/CheckcarttypeController/findCheckCartTypes?typeflag=${typeflag}`)
   },
    //展示新增内科室下拉框数据
    readProject(){
        return axios.get(`${base.baseUrl}/sysCheckbox/findOffice`)
    },
    //展示新增内所属类型下拉框数据
    readProjectItem(){
        return axios.get(`${base.baseUrl}/item/findItemcatalog`)
    },
    //展示树形控件数据
    readProjectTree(){
        return axios.get(`${base.baseUrl}/item/find/treeList`)
    },
    //表格展示数据
    readProjectTable(catalogId,inUse,cartype){
        return axios.get(`${base.baseUrl}/item/findItemsByCatalog?catalogId=${ catalogId}&inUse=${inUse}&cartype=${cartype}`)
    },
    //新增
    addProject(data){
        return axios.post(`${base.baseUrl}/item/saveItem`,data)
    },
    //删除
    deleteProject(ids){
        return axios.delete(`${base.baseUrl}/item/${ids}`)
    },
    //导出
    returnProject(){
        return axios.get(`${base.baseUrl}/item/export`)
    },
    //拷贝
    copyProject(data){
        return axios.post(`${base.baseUrl}/item/copyItem`,data)
    }
}
export default systemProject
