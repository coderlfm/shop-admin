import { createApp } from 'vue';
import App from './App.vue';
import { registerElementPlus, registerDayjs } from '@/global';
import regitstrRouter from '@/utils/regitstrRouter';
import router from './router';
import store, { setupStore } from './store';
import 'remixicon/fonts/remixicon.css';
import './assets/css/index.css';

const app = createApp(App);
registerElementPlus(app);
registerDayjs(app);
regitstrRouter();
app.use(store).use(router).mount('#app');
setupStore();
