import type { Option } from '@/types';

export const columns = [
  { type: 'expand', slotName: 'expand' },
  { type: 'selection', align: 'center', width: '60' },
  { label: 'id', key: 'id' },
  { label: '头像', key: 'avatar', slotName: 'avatar' },
  { label: '用户账号', key: 'username' },
  { label: '用户昵称', key: 'nickName' },
  { label: '手机号', key: 'mobile' },
  { label: '状态', key: 'status', slotName: 'status' },
  { label: '创建时间', key: 'createdAt', slotName: 'createdAt' },
  { label: '更新时间', key: 'updatedAt', slotName: 'updatedAt' },
  { label: '操作', key: '', slotName: 'handle' },
];

export const form = () => ({
  search: [
    { wrap: { label: '用户账号', prop: 'username' }, props: { placeholder: '请输入用户账号' } },
    { wrap: { label: '用户昵称', prop: 'nickName' }, props: { placeholder: '请输入用户昵称' } },
    { wrap: { label: '手机号', prop: 'mobile' }, props: { placeholder: '请输入手机号' } },
    // { wrap: { label: '状态', prop: 'status' }, props: { placeholder: '请选择状态' } },
  ],
});

export const model = () => ({
  formProps: {
    'label-width': 100,
    rules: {
      avatar: [{ required: true, message: '该项为必填', trigger: 'blur' }],
      mobile: [{ required: true, message: '该项为必填', trigger: 'blur' }],
    },
  },
  formList: [
    { wrap: { label: '头像', prop: 'avatar' }, props: { placeholder: '请选择头像' } },
    { wrap: { label: '手机号', prop: 'mobile' }, props: { placeholder: '请输入手机号' } },
  ],
});
