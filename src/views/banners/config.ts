import type { Option } from '@/types';

export const columns = [
  { type: 'selection', align: 'center', width: '60' },
  { label: 'id', key: 'id' },
  { label: 'banner图', key: 'url', width: '300', slotName: 'url' },
  { label: '商品id', key: 'productId' },
  { label: '状态', key: 'bannerStatus', slotName: 'bannerStatus' },
  { label: '创建时间', key: 'createdAt', slotName: 'createdAt' },
  { label: '更新时间', key: 'updatedAt', slotName: 'updatedAt' },
  { label: '操作', key: '', slotName: 'handle' },
];

export const form = () => ({
  search: [],
});

export const model = () => ({
  formProps: {
    'label-width': 100,
    rules: {
      url: [{ required: true, message: '该项为必填', trigger: 'blur' }],
      productId: [{ required: true, message: '该项为必填', trigger: 'blur' }],
    },
  },
  formList: [
    { wrap: { label: 'banner图', prop: 'url' }, props: { placeholder: '请上传banner图' } },
    { wrap: { label: '关联商品id', prop: 'productId' }, props: { placeholder: '请输入该banner图关联的商品id' } },
  ],
});
