import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import regitstrRouter from '@/utils/regitstrRouter';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    component: () => import(/* webpackChunkName: "main" */ '../views/main/index.vue'),
    children: [
      // {
      //   path: '/order',
      //   name: 'order',
      //   component: () => import(/* webpackChunkName: "order" */ '../views/orders/index.vue'),
      // },
      // {
      //   path: '/product',
      //   name: 'product',
      //   component: () => import(/* webpackChunkName: "product" */ '../views/products/index.vue'),
      // },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/index.vue'),
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

export default router;
