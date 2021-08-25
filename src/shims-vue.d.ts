/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare let defineProps: any;
declare let $filters: {
  formatDate: (date: string) => string;
};
