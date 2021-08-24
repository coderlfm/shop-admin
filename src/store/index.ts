import { createStore } from 'vuex';
import { getPermissionApi } from '@/service';

const store = createStore({
  state: {
    permission: null,
  },
  mutations: {
    changePermission(state, payload) {
      state.permission = payload;
    },
  },
  actions: {
    async changePermissionAction({ commit }) {
      const { code, data } = await getPermissionApi();
      console.log(code, data);
    },
  },
  modules: {},
});

export const setupStore = async () => {
  await store.dispatch('changePermissionAction');
};

export default store;
