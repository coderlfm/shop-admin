import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import regitstrRouter, { registerDynamicRoute } from '@/utils/regitstrRouter';

export const mainRouter: RouteRecordRaw = {
  path: '/',
  name: 'main',
  redirect: '/products',
  component: () => import(/* webpackChunkName: "main" */ '../views/main/index.vue'),
  children: [],
};

const routes: Array<RouteRecordRaw> = [
  mainRouter,
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

// 注册路由
const currentAccountRouters = JSON.parse(localStorage.getItem('routes') as string) ?? []; // 当前账号所有的路由
const allRouter = regitstrRouter(); // 所有路由

registerDynamicRoute(currentAccountRouters, allRouter, router);

export default router;
