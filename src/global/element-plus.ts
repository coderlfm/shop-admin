import type { App } from 'vue';
import { ElAside, ElButton, ElContainer, ElForm, ElFormItem, ElHeader, ElInput, ElMain } from 'element-plus';
import 'element-plus/lib/theme-chalk/base.css';

const components = [ElButton, ElForm, ElFormItem, ElInput, ElContainer, ElAside, ElHeader, ElMain];

export default function (app: App) {
  for (const component of components) {
    app.component(component.name, component);
  }
}
