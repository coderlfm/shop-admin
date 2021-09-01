import { createStore } from 'vuex';
import { RouteRecordRaw } from 'vue-router';
import { getPermissionApi } from '@/service';
import regitstrRouter, { registerDynamicRoute } from '@/utils/regitstrRouter';
import router from '@/router';

const store = createStore({
  state: {
    permission: null, // 权限
  },
  mutations: {
    // 修改权限
    changePermission(state, payload) {
      state.permission = payload;
    },
  },
  actions: {
    async changePermissionAction({ commit }) {
      const { code, data } = await getPermissionApi();
      // 注册路由
      const allRouter = regitstrRouter();
      registerDynamicRoute(data.menus, allRouter, router);
      localStorage.setItem('routes', JSON.stringify(data.menus));

      commit('changePermission', data);
    },
  },
  modules: {},
});

export const setupStore = async () => {
  if (!localStorage.getItem('token')) return;
  await store.dispatch('changePermissionAction');
};

export default store;
