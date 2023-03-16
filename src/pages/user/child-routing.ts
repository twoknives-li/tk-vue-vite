
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export const PERFORMANCE_ROUTES: RouteRecordRaw[] = [
  {
    path: 'user/user',
    component: () => import('./component/user/user.component.vue'),
    meta: {
      title: '用户中心',
      name: 'usercenter',
      acl: false
    }
  }
];

export default PERFORMANCE_ROUTES;
