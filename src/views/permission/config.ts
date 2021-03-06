import type { Option } from '@/types';

const permissionOptions = [
  { label: '操作权限', value: 0 },
  { label: '1 级菜单', value: 1 },
  { label: '2 级菜单', value: 2 },
];

export const columns = [
  { label: '权限id', key: 'id' },
  { label: '权限描述', key: 'title' },
  { label: '类型', key: 'type', slotName: 'type' },
  { label: 'icon', key: 'icon', slotName: 'icon' },
  { label: '父级权限id', key: 'pId' },
  { label: `path (前端路由)`, key: 'path' },
  { label: 'authKey (后端路由)', key: 'authKey' },
  // { label: '创建时间', key: 'createdAt', slotName: 'createdAt' },
  // { label: '更新时间', key: 'updatedAt', slotName: 'updatedAt' },
  { label: '操作', key: '', slotName: 'handle' },
];

export const form = () => ({
  search: [
    {
      wrap: { label: '权限类型', prop: 'type', type: 'select' },
      props: { placeholder: '请选择权限类型', options: permissionOptions },
    },
  ],
});

export const model = ({
  interfaceOptions = [],
  typeSelectChange,
}: {
  interfaceOptions?: Option[];
  typeSelectChange: (val: any) => void;
}) => ({
  formProps: {
    'label-width': 100,
    rules: {
      title: [{ required: true, message: '该项为必填', trigger: 'blur' }],
      type: [{ required: true, message: '该项为必填', trigger: 'blur' }],
      authKey: [{ required: true, message: '该项为必填', trigger: 'blur' }],
      pId: [{ required: true, message: '该项为必填', trigger: 'blur' }],
      icon: [{ required: true, message: '该项为必填', trigger: 'blur' }],
      path: [{ required: true, message: '该项为必填', trigger: 'blur' }],
    },
  },
  formList: [
    {
      wrap: { label: '接口地址', prop: 'authKey', type: 'cascader' },
      props: {
        placeholder: '请选择接口地址',
        options: interfaceOptions,
        filterable: true,
        clearable: true,
        props: { expandTrigger: 'hover', emitPath: false, label: 'description', value: 'url' },
      },
      hidden: false,
    },
    {
      wrap: { label: '权限类型', prop: 'type', type: 'select' },
      props: { placeholder: '请选择权限类型', options: permissionOptions, change: typeSelectChange },
    },
    { wrap: { label: '权限描述', prop: 'title' }, props: { placeholder: '请输入权限描述' } },
    { wrap: { label: '父级权限', prop: 'pId' }, props: { placeholder: '请输入父级权限id' }, hidden: false },
    { wrap: { label: '权限图标', prop: 'icon' }, props: { placeholder: '请输入图标类名' }, hidden: false },
    { wrap: { label: '路由路径', prop: 'path' }, props: { placeholder: '请输入前端路由路径' }, hidden: false },
  ],
});
