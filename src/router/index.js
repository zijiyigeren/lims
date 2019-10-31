import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Laylout from '@/laylout/Laylout'
// import Home from '@/views/home/Home.vue'
import Home from '@/views/system/componentsview/publicationmodel/publicationpage.vue'


Vue.use(Router)

let routers = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      hidden: true,
      component: Login,
      meta: {
        title: '登录'
      }
    },
    {
      // 首页
      path: '/home',
      name: 'home',
      component: Laylout,
      meta: {
        title: '首页'
      },
      redirect: {
        path: '/home'
        // path: '/system/publicationpage'
      },
      children: [{
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
          title: '首页'
        }
      }]
    },
    {
      // 我的报告
      path: '/report',
      name: 'report',
      meta: {
        title: '我的报告'
      },
      component: Laylout,
      redirect: {
        path: '/report'
      },
      children: [{
        path: '/report',
        name: 'report',
        component: () => import('@/views/report/Report.vue'),
        meta: {
          title: '我的报告'
        }
      }],
    },
    {
      // 检验委托
      path: '/entrust',
      name: 'entrust',
      meta: {
        title: '检验委托'
      },
      component: () => import('@/laylout/Laylout.vue'),
      children: [
        {
          // 任务下达
          path: '/entrust/list',
          name: 'entrustlist',
          meta: {
            title: '任务下达'
          },
          component: () => import('@/views/entrust/componentsview/Entrustlist.vue')
        },
        {
          // 任务草稿
          path: '/entrust/draft',
          name: 'entrustdraft',
          meta: {
            title: '任务草稿'
          },
          component: () => import('@/views/entrust/componentsview/Entrustdraft.vue')
        },
        {
          // 修改单管理
          path: '/entrust/amend',
          name: 'entrustamend',
          meta: {
            title: '修改单管理'
          },
          component: () => import('@/views/entrust/componentsview/Entrustamend.vue')
        }
      ]
    },
    {
      // 检验任务
      path: '/task',
      name: 'task',
      meta: {
        title: '检验任务'
      },
      component: () => import('@/laylout/Laylout.vue'),
      children: [
        {
          // 任务管理
          path: '/task/manage',
          name: 'taskmanage',
          meta: {
            title: '任务管理'
          },
          component: () => import('@/views/task/componentsview/Taskmanage.vue')
        },
        {
          // 任务分配
          path: '/task/allot',
          name: 'taskallot',
          meta: {
            title: '任务分配'
          },
          component: () => import('@/views/task/componentsview/Taskallot.vue')
        }
      ]
    },
    {
      // 检验报告
      path: '/surveyreport',
      name: 'surveyreport',
      meta: {
        title: '检验报告'
      },
      component: () => import('@/laylout/Laylout.vue'),
      children: [
        {
          // 问题报告
          path: '/surveyreport/issue',
          name: 'surveyissue',
          meta: {
            title: '问题报告'
          },
          component: () => import('@/views/survey/componentsview/Surveyissue.vue')
        },
        {
          // 报告编辑
          path: '/surveyreport/redact',
          name: 'surveyredact',
          meta: {
            title: '报告编辑'
          },
          component: () => import('@/views/survey/componentsview/Surveyredact/Surveyredact.vue')
        },
        {
          // 报告初校
          path: '/surveyreport/verify',
          name: 'surveyverify',
          meta: {
            title: '报告初校'
          },
          component: () => import('@/views/survey/componentsview/Surveyverify/Surveyverify.vue')
        },
        {
          // 报告校验
          path: '/surveyreport/parity',
          name: 'surveyparity',
          meta: {
            title: '报告校验'
          },
          component: () => import('@/views/survey/componentsview/parity/Surveyparity.vue')
        },
        {
          // 报告审核
          path: '/surveyreport/audit',
          name: 'surveyaudit',
          meta: {
            title: '报告审核'
          },
          component: () => import('@/views/survey/componentsview/Surveyaudit/Surveyaudit.vue')
        },
        {
          // 报告批准
          path: '/surveyreport/ratify',
          name: 'surveyratify',
          meta: {
            title: '报告批准'
          },
          component: () => import('@/views/survey/componentsview/Surveyratify/Surveyratify.vue')
        },
        {
          // 报告归档
          path: '/pigeonhole',
          name: 'pigeonhole',
          meta: {
            title: '报告归档'
          },
          component: () => import('@/views/pigeonhole/Pigeonhole.vue'),
        }
      ]
    },
    {
      // 系统管理
      path: '/system',
      name: 'system',
      meta: {
        title: '系统管理'
      },
      component: () => import('@/laylout/Laylout.vue'),
      children: [
        {
          // 组织机构管理
          path: '/system/organization',
          name: 'systemation',
          meta: {
            title: '组织机构管理'
          },
          component: () => import('@/views/system/componentsview/Systemation.vue')
        },
        {
          // 系统角色管理
          path: '/system/role',
          name: 'systemrole',
          meta: {
            title: '系统角色管理'
          },
          component: () => import('@/views/system/componentsview/Systemrole.vue')
        },
        {
          // 系统菜单管理
          path: '/system/menu',
          name: 'systemmenu',
          meta: {
            title: '系统菜单管理'
          },
          component: () => import('@/views/system/componentsview/Systemmenu.vue')
        },
        {
          // 系统用户管理
          path: '/system/user',
          name: 'systemuser',
          meta: {
            title: '系统用户管理'
          },
          component: () => import('@/views/system/componentsview/Systemuser.vue')
        },
        {
          // 检验项目管理
          path: '/system/project',
          name: 'systemproject',
          meta: {
            title: '检验项目管理'
          },
          component: () => import('@/views/system/componentsview/Systemproject.vue')
        },
        {
          // 检验类型管理
          path: '/system/genre',
          name: 'systemgenre',
          meta: {
            title: '检验类型管理'
          },
          component: () => import('@/views/system/componentsview/Systemgenre.vue')
        },
        {
          // 检验参数管理
          path: '/system/params',
          name: 'systemparams',
          meta: {
            title: '检验参数管理'
          },
          component: () => import('@/views/system/componentsview/Systemparams.vue')
        },
        {
          // 号段管理
          path: '/system/roughly',
          name: 'systemroughly',
          meta: {
            title: '号段管理'
          },
          component: () => import('@/views/system/componentsview/Systemroughly.vue')
        },
        {
          // 公章图片
          path: '/system/cachetimg',
          name: 'systemcachetimg',
          meta: {
            title: '公章图片'
          },
          component: () => import('@/views/system/componentsview/Systemcachetimg.vue')
        },
        {
          // 公章类型
          path: '/system/cachetallot',
          name: 'systemcachetallot',
          meta: {
            title: '公章类型'
          },
          component: () => import('@/views/system/componentsview/Systemcachetallot.vue')
        },
        {
          // 日志管理
          path: '/system/logmanagement',
          name: 'systemlogmanagement',
          meta: {
            title: '日志管理'
          },
          component: () => import('@/views/system/componentsview/Systemlogmanagement.vue')
        },
      ]
    },
    {
      path: '/print',
      name: 'print',
      meta: {
        title: '打印'
      },
      component: () => import('@/views/print/print.vue')
    },
  ]
})
export default routers
