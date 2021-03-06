import type { App } from 'vue';
import {
  ElAside,
  ElButton,
  ElContainer,
  ElForm,
  ElFormItem,
  ElHeader,
  ElInput,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElSubmenu,
  ElTable,
  ElTableColumn,
  ElCard,
  ElImage,
  ElRow,
  ElCol,
  ElSelect,
  ElOption,
  ElPagination,
  ElConfigProvider,
  ElSpace,
  ElDialog,
  ElTag,
  ElCascader,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElResult,
  ElUpload,
} from 'element-plus';
import 'element-plus/lib/theme-chalk/base.css';

const components = [
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElSubmenu,
  ElMenuItem,
  ElTable,
  ElTableColumn,
  ElCard,
  ElImage,
  ElRow,
  ElCol,
  ElSelect,
  ElOption,
  ElPagination,
  ElConfigProvider,
  ElSpace,
  ElDialog,
  ElTag,
  ElCascader,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElResult,
  ElUpload
];

export default function (app: App) {
  for (const component of components) {
    app.component(component.name, component);
  }
}
