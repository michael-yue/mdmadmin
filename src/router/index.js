import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  }
]

export const asyncRouterMap = [
  {
    path: '/finreport',
    component: Layout,
    name: 'finreport',
    meta: { title: '利润报表', icon: 'table', roles: ['finance'] },
    children: [
      {
        path: 'profilereport',
        name: 'ProfileReport',
        component: () => import('@/views/fin/ProfileReport'),
        meta: { title: '利润报表', icon: 'table', roles: ['finance'] }
      },
      {
        path: 'ProfileReportMaintain',
        name: 'ProfileReportMaintain',
        component: () => import('@/views/fin/ProfileReportMaintain'),
        meta: { title: '利润表维护', icon: 'form', roles: ['finance'] }
      },
      {
        path: 'ProfileReportSetup',
        name: 'ProfileReportSetup',
        component: () => import('@/views/fin/ProfileReportSetup'),
        meta: { title: '利润表项目维护', icon: 'example', roles: ['finance'] }
      }
    ]
  },

  {
    path: '/sales',
    component: Layout,
    name: 'sales',
    meta: { title: '营运报表', icon: 'example', roles: ['admin'] },
    children: [
      {
        path: 'cashreport',
        name: 'cashreport',
        component: () => import('@/views/sales/cashreport'),
        meta: { title: '营业收入报表', icon: 'table', roles: ['admin'] }
      },
      {
        path: 'cashperiodreport',
        name: 'cashperiodreport',
        component: () => import('@/views/sales/cashperiodreport'),
        meta: { title: '现金收入报表', icon: 'tree', roles: ['admin'] }
      },
      {
        path: 'salesreport',
        name: 'salesreport',
        component: () => import('@/views/sales/salesreport'),
        meta: { title: '产品销售报表', icon: 'tree', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/wx',
    component: Layout,
    name: 'wx',
    meta: { title: '微信', icon: 'example', roles: ['branch', 'marketing'] },
    children: [
      {
        path: 'wxUpdateProduct',
        name: 'wxUpdateProduct',
        component: () => import('@/views/wx/UpdateProduct'),
        meta: { title: '微信产品', icon: 'table', roles: ['branch', 'marketing'] }
      },
      {
        path: 'wxOrderList',
        name: 'wxOrderList',
        component: () => import('@/views/wx/OrderList'),
        meta: { title: '微信订单', icon: 'tree', roles: ['branch', 'marketing'] }
      }
    ]
  },
  // {
  //   path: '/qywx',
  //   component: Layout,
  //   meta: { title: '企业微信', icon: 'example', roles: ['admin'] },
  //   children: [
  //     {
  //       path: 'qywxUserList',
  //       name: 'qywxUserList',
  //       component: () => import('@/views/qywx/UserList'),
  //       meta: { title: '用户设置', icon: 'table', roles: ['admin'] }
  //     }
  //   ]
  // },
  {
    path: '/mt',
    component: Layout,
    name: 'mt',
    meta: { title: '美团', icon: 'example', roles: ['branch', 'marketing'] },
    children: [
      {
        path: 'mtUpdateProduct',
        name: 'mtUpdateProduct',
        component: () => import('@/views/mt/UpdateMTProduct'),
        meta: { title: '美团产品', icon: 'table', roles: ['branch', 'marketing'] }
      },
      {
        path: 'mtOrderList',
        name: 'mtOrderList',
        component: () => import('@/views/mt/OrderList'),
        meta: { title: '美团订单', icon: 'tree', roles: ['branch', 'marketing'] }
      },
      {
        path: 'mtBindBranch',
        name: 'mtBindBranch',
        component: () => import('@/views/mt/bindBranch'),
        meta: { title: '绑定门店', icon: 'table', roles: ['admin', 'marketing'] }
      },
      {
        path: 'mtunBindBranch',
        name: 'mtunBindBranch',
        component: () => import('@/views/mt/unbindBranch'),
        meta: { title: '门店解绑', icon: 'table', roles: ['admin', 'marketing'] }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
