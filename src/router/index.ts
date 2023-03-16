import { createRouter, createWebHistory } from "vue-router";
import Home from '../pages/home.vue';

const routes:any[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../pages/about/about.vue'),
  },
  {
    path: '/news-list',
    name: 'News',
    component: () => import(/* webpackChunkName: "about" */ '../pages/news/news-list.vue'),
  },
  {
    path: '/form-list',
    name: 'Form',
    component: () => import(/* webpackChunkName: "about" */ '../pages/form/form-list.vue'),
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import(/* webpackChunkName: "about" */ '../pages/map/map.vue'),
  },
  {
    path: '/table',
    name: 'Table',
    component: () => import('../pages/table/table.vue'),
  },
  {
    path: '/file',
    name: 'File',
    component: () => import('../pages/file/file-list.vue'),
  },
  {
    path: '/liveChat',
    name: 'LiveChat',
    component: () => import('../pages/liveChat/index.vue'),
  },
  {
    path: '/table-input',
    name: 'TableInput',
    component: () => import('../pages/table-input/index.vue'),
  },
  {
    path: '/new-input',
    name: 'NewInput',
    component: () => import('../pages/form/new-form.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
