import type { Option } from '@/types';

export const columns = [
  { type: 'selection', align: 'center', width: '60' },
  { label: 'id', key: 'id' },
  { label: '账号', key: 'account' },
  { label: '使用人', key: 'name' },
  { label: '账号备注', key: 'remark' },
  { label: '所属角色', key: 'role', slotName: 'role' },
  { label: '状态', key: 'status', slotName: 'status' },
  { label: '创建时间', key: 'createdAt', slotName: 'createdAt' },
  { label: '更新时间', key: 'updatedAt', slotName: 'updatedAt' },
  { label: '操作', key: '', slotName: 'handle', width: '250' },
];

export const form = () => ({
  search: [],
});

export const model = ({ roleOptions = [] }: { roleOptions?: Option[] }) => ({
  formProps: {
    'label-width': 100,
    rules: {
      account: [{ required: true, message: '该项为必填', trigger: 'blur' }],
      name: [{ required: true, message: '该项为必填', trigger: 'blur' }],
      roleId: [{ required: true, message: '该项为必填', trigger: 'blur' }],
    },
  },
  formList: [
    { wrap: { label: '账号名', prop: 'account' }, props: { placeholder: '请输入账号名' } },
    { wrap: { label: '使用人', prop: 'name' }, props: { placeholder: '请输入账号使用人' } },
    {
      wrap: { label: '归属角色', prop: 'roleId', type: 'select' },
      props: { placeholder: '请选择账号归属角色', options: roleOptions },
    },
    { wrap: { label: '备注', prop: 'remark' }, props: { placeholder: '请输入备注' } },
  ],
});
