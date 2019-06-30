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
        meta: { title: '利润表项目维护', icon: 'form', roles: ['finance'] }
      }
    ]
  },

  {
    path: '/sales',
    component: Layout,
    name: 'sales',
    meta: { title: '营运报表', icon: 'example', roles: ['finance', 'marketing', 'branch'] },
    children: [
      {
        path: 'cashreport',
        name: 'cashreport',
        component: () => import('@/views/sales/cashreport'),
        meta: { title: '营业收入报表', icon: 'table', roles: ['finance', 'marketing', 'branch'] }
      },
      {
        path: 'cashperiodreport',
        name: 'cashperiodreport',
        component: () => import('@/views/sales/cashperiodreport'),
        meta: { title: '现金收入报表', icon: 'tree', roles: ['finance', 'marketing', 'branch'] }
      },
      {
        path: 'salesreport',
        name: 'salesreport',
        component: () => import('@/views/sales/salesreport'),
        meta: { title: '产品销售报表', icon: 'tree', roles: ['finance', 'marketing', 'branch'] }
      },
      {
        path: 'cashsummaryreport',
        name: 'cashsummaryreport',
        component: () => import('@/views/sales/cashsummaryreport'),
        meta: { title: '营业汇总报表', icon: 'table', roles: ['admin'] }
      },
      {
        path: 'salessummaryreport',
        name: 'salessummaryreport',
        component: () => import('@/views/sales/productsalesummaryreport'),
        meta: { title: '产品销售汇总报表', icon: 'table', roles: ['admin'] }
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
        path: 'mtProduct',
        name: 'mtProduct',
        component: () => import('@/views/mt/Product'),
        meta: { title: '美团产品(new)', icon: 'table', roles: [ 'marketing'] }
      },
      {
        path: 'mtBindBranch',
        name: 'mtBindBranch',
        component: () => import('@/views/mt/bindBranch'),
        meta: { title: '绑定门店', icon: 'table', roles: ['admin', 'marketing1'] }
      },
      {
        path: 'mtunBindBranch',
        name: 'mtunBindBranch',
        component: () => import('@/views/mt/unbindBranch'),
        meta: { title: '门店解绑', icon: 'table', roles: ['admin', 'marketing1'] }
      }
    ]
  },
  {
    path: '/po',
    component: Layout,
    meta: { title: '订货系统', icon: 'example', roles: ['admin'] },
    children: [
      {
        path: 'poentry',
        name: 'poentry',
        component: () => import('@/views/qywx/UserList'),
        meta: { title: '订货单维护', icon: 'table', roles: ['admin', 'branch1'] }
      },
      {
        path: 'polist',
        name: 'polist',
        component: () => import('@/views/qywx/UserList'),
        meta: { title: '订货单列表', icon: 'table', roles: ['admin', 'branch1'] }
      },
      {
        path: 'branchinvlist',
        name: 'branchinvlist',
        component: () => import('@/views/qywx/UserList'),
        meta: { title: '入库单列表', icon: 'table', roles: ['admin'] }
      },
      {
        path: 'poreport',
        name: 'poreport',
        component: () => import('@/views/qywx/UserList'),
        meta: { title: '采购汇总表', icon: 'table', roles: ['admin'] }
      },
      {
        path: 'branchinvreport',
        name: 'branchinvreport',
        component: () => import('@/views/qywx/UserList'),
        meta: { title: '物料盘点表', icon: 'table', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/card',
    component: Layout,
    meta: { title: '会员卡', icon: 'example', roles: ['admin', 'marketing'] },
    children: [
      {
        path: 'cardList',
        name: 'cardList',
        component: () => import('@/views/card/CardList'),
        meta: { title: '会员卡列表', icon: 'table', roles: ['admin', 'marketing'] }
      },
      {
        path: 'cardStat',
        name: 'cardStat',
        component: () => import('@/views/card/CardStat'),
        meta: { title: '门店新卡统计', icon: 'table', roles: ['admin', 'marketing'] }
      },
      {
        path: 'cardQuery',
        name: 'cardQuery',
        component: () => import('@/views/card/CardQuery'),
        meta: { title: '会员卡查询', icon: 'table', roles: ['admin'] }
      },
      {
        path: 'cardRechargeStat',
        name: 'cardRechargeStat',
        component: () => import('@/views/card/CardRechargeStat'),
        meta: { title: '充值统计', icon: 'table', roles: ['admin'] }
      },
      {
        path: 'cardTransactionStat',
        name: 'cardTransactionStat',
        component: () => import('@/views/card/CardTransactionStat'),
        meta: { title: '消费统计', icon: 'table', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    meta: { title: '系统设置', icon: 'example', roles: ['admin'] },
    children: [
      {
        path: 'branchList',
        name: 'branchList',
        component: () => import('@/views/admin/BranchList'),
        meta: { title: '门店设置', icon: 'table', roles: ['admin'] }
      },
      {
        path: 'productList',
        name: 'productList',
        component: () => import('@/views/admin/ProductList'),
        meta: { title: '产品设置', icon: 'table', roles: ['admin'] }
      },
      {
        path: 'branchProductList',
        name: 'branchProductList',
        component: () => import('@/views/admin/BranchProductList'),
        meta: { title: '门店产品设置', icon: 'table', roles: ['admin'] }
      }
    ]
  },
  // {
  //   path: '/wxcard',
  //   component: Layout,
  //   meta: { title: '微信卡券', icon: 'example', roles: ['admin'] },
  //   // component: () => import('@/views/doc/documnts'),
  //   children: [
  //     {
  //       path: 'wxcardlist',
  //       name: 'wxcardlist',
  //       component: () => import('@/views/wx/wxCardList'),
  //       meta: { title: '所有卡券', icon: 'table', roles: ['admin'] }
  //     },
  //     {
  //       path: 'wxbranchcardlist',
  //       name: 'wxbranchcardlist',
  //       component: () => import('@/views/wx/wxCardList'),
  //       meta: { title: '门店卡券', icon: 'table', roles: ['admin'] }
  //     }
  //   ]
  // },
  {
    path: '/doc',
    component: Layout,
    meta: { title: '帮助文档', icon: 'example', roles: ['admin'] },
    // component: () => import('@/views/doc/documnts'),
    children: [
      {
        path: 'help',
        name: 'help',
        component: () => import('@/views/doc/documnts'),
        meta: { title: '门店设置', icon: 'table', roles: ['admin'] }
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
