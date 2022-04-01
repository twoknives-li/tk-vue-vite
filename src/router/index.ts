import { createRouter, createWebHistory } from "vue-router";
import Home from '../pages/home.vue';

const routes = [
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
