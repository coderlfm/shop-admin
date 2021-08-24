import { createStore } from 'vuex';
import { getPermissionApi } from '@/service';

const store = createStore({
  state: {
    permission: null,   // 权限
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
      console.log(code, data);
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
