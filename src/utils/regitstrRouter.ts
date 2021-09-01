import { mainRouter } from '@/router';
import { RouteRecordRaw, Router } from 'vue-router';
interface IRouterItem {
  path: string;
  name: string;
  component: () => Promise<any>;
  children: any[];
}

export default function () {
  const views = require.context('../views', true, /index.vue$/);
  const routerArr: RouteRecordRaw[] = [];

  views.keys().forEach((item) => {
    const originItem = item.slice(1); // 去除前缀 ./
    item = originItem.split('/').slice(0, -1).join('/'); // 通过 / 分割成数组，然后去除 index.vue, 再通过 / 合并

    if (item !== '/login' && item !== '/main') {
      routerArr.push({
        path: item,
        name: item,
        component: () => import(`@/views${originItem}`),
        children: [],
      });
    }
  });
  return routerArr;
}

/**
 * 注册当前用户所拥有的路由
 * @param routes 当前账户所拥有的路由
 * @param allRoutes 所有的路由匹配表
 * @param router 路由对象
 */
export function registerDynamicRoute(routes: any[], allRoutes: any[], router: Router) {

  // 退出登录后需要重新添加路由
  !router.hasRoute('main') && router.addRoute(mainRouter);

  routes.forEach((item: any) => {
    const route = allRoutes.find((route) => item.path === route.path);
    if (route) {
      router.addRoute('main', route);
    }
  });

  router.addRoute('main', {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found/index.vue'),
  });
}
