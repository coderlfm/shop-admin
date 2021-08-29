import type { Option } from '@/types';

export const columns = [
  { label: 'id', key: 'id' },
  { label: '角色名称', key: 'title' },
  { label: '备注', key: 'remark' },
  { label: '创建时间', key: 'createdAt', slotName: 'createdAt' },
  { label: '更新时间', key: 'updatedAt', slotName: 'updatedAt' },
  { label: '操作', key: '', slotName: 'handle' },
];

export const form = () => ({
  search: [{ wrap: { label: '角色名称', prop: 'roleName' }, props: { placeholder: '请输入角色名称' } }],
});

export const model = ({ permissionOptions = [] }: { permissionOptions?: Option[] }) => ({
  formProps: {
    'label-width': 100,
    rules: {
      title: [{ required: true, message: '该项为必填', trigger: 'blur' }],
      permissionIds: [{ required: true, message: '该项为必填', trigger: 'blur' }],
    },
  },
  formList: [
    { wrap: { label: '角色名称', prop: 'title' }, props: { placeholder: '请输入角色名称' } },
    {
      wrap: { label: '角色权限', prop: 'permissionIds', type: 'select' },
      props: { placeholder: '请选择角色权限', options: permissionOptions, multiple: true },
    },
    { wrap: { label: '备注', prop: 'remark' }, props: { placeholder: '请输入备注', type: 'textarea' } },
  ],
});
