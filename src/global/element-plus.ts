import type { App } from 'vue';
import { ElButton, ElForm, ElFormItem, ElInput } from 'element-plus';
import 'element-plus/lib/theme-chalk/base.css';

const components = [ElButton, ElForm, ElFormItem, ElInput];

export default function (app: App) {
  for (const component of components) {
    app.component(component.name, component);
  }
}
