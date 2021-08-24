import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import regitstrRouter from '@/utils/regitstrRouter';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    component: () => import(/* webpackChunkName: "main" */ '../views/main/index.vue'),
    children: [],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found/index.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 登录判断
router.beforeEach((to, from) => {
  if (to.path !== '/login' && !localStorage.getItem('token')) return '/login';
});

// 注册所有路由
regitstrRouter().forEach((item) => router.addRoute('main', item));

router.addRoute('main', {
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  component: () => import('@/views/not-found/index.vue'),
});
export default router;
