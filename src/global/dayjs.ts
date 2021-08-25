import type { App } from 'vue';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export default (app: App) => {
  app.config.globalProperties.$filters = {
    formatDate: (date: string) => {
      return dayjs.utc(date).format('YYYY-MM-DD HH:mm:ss');
    },
  };
};
