import { createApp } from 'vue';
import App from './App.vue';
import registerElementPlus from '@/global/element-plus';
import regitstrRouter from '@/utils/regitstrRouter';
import router from './router';
import store, { setupStore } from './store';
import './assets/css/index.css';

const app = createApp(App);
registerElementPlus(app);
regitstrRouter();
app.use(store).use(router).mount('#app');
setupStore();
