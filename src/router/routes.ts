import type { RouteRecordRaw } from 'vue-router'

// 对外暴露路由（常量路由）
export const constantRoute: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login', //命名路由
    meta: {
      title: '登录', // 路由元信息，以后用于菜单标题
      hidden: true, // 以后用于控制是否在菜单中显示
      icon: 'User', //菜单左侧图标，支持element-plus全部图标
    },
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    redirect: '/home',
    meta: {
      title: 'layout',
      hidden: false,
      icon: 'HomeFilled',
    },
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true,
      icon: 'CloseBold',
    },
  },
  // 任意路由：匹配所有不符合上面规则的路径，全部重定向到 404
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: '任意路由',
      hidden: true,
      icon: 'CloseBold',
    },
  },
]
