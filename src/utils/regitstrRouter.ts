import { RouteRecordRaw } from 'vue-router';
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
