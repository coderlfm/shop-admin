import { createApp } from 'vue';
import App from './App.vue';
import registerElementPlus from '@/global/element-plus';
import router from './router';
import store from './store';
import './assets/css/index.css';

const app = createApp(App);
registerElementPlus(app);

app.use(store).use(router).mount('#app');
