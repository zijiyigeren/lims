/**
 * api接口的统一出口
 */
// 文章模块接口
import role from '@/api/system/role'
import menu from '@/api/system/menu'
import login from '@/api/login/login'
import entrust from '@/api/entrust/entrust'

// import myReport from '@/api/myReport'
// import systemProject from '@/api/systemProject'
import roughly from '@/api/system/roughly'
import cachetallot from '@/api/system/cachetallot'
import draft from '@/api/system/draft'

import myReport from '@/api/myReport/myReport'
import systemProject from '@/api/system/systemProject'
import systemdepartmentrinquire from '@/api/system/systemdepartmentrinquire'
import systemuserinquire from '@/api/system/systemuserinquire'
import allot from '@/api/task/allot'
import pigeohole from '@/api/pigeohole/pigeohole'

import entrustamend from '@/api/entrust/entrustamend'
import systemgenre from '@/api/system/systemgenre'
import systemparams from '@/api/system/systemparams'
import systemcachetimg from '@/api/system/systemcachetimg'
import taskmanage from '@/api/task/taskmanage'
import surveyissue from '@/api/survey/surveyissue'
/*
* menglingyan
* 2019/9/18
* 看板页展示模块_接口
* */
import systemPublicationpage from '@/api/system/systemPublicationpage'
// 其他模块的接口……

/*检验报告*/
import lxtinitial from '@/api/surve/surveyverify'

// 导出接口
export default {
    role,
    menu,
    login,
    entrust,
    myReport,
    systemProject,
    roughly,
    cachetallot,
    draft,
    entrustamend,
    systemgenre,
    systemparams,
    systemcachetimg,
    systemdepartmentrinquire,
    systemuserinquire,
    allot,
    pigeohole,
    taskmanage,
    // 看板页展示
    systemPublicationpage,
    lxtinitial,// 初校报告 报告编辑  报告校对
    surveyissue
}
