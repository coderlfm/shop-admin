import type { Option } from '@/types';

export const columns = [
  { label: '商品id', key: 'id' },
  { label: '所属分类', key: 'categories', slotName: 'categories' },
  { label: '商品名称', key: 'title' },
  { label: '商品数量', key: 'sum' },
  { label: '封面图', key: 'coverUrl', slotName: 'image' },
  { label: '优惠价', key: 'discountPrice', slotName: 'discountPrice' },
  { label: '原价', key: 'marketPrice', slotName: 'marketPrice' },
  { label: '创建时间', key: 'createdAt', slotName: 'createdAt' },
  { label: '更新时间', key: 'updatedAt', slotName: 'updatedAt' },
  { label: '操作', key: '', slotName: 'handle' },
];

export const form = ({ categoryOptions = [] }: { categoryOptions?: Option[] }) => ({
  search: [
    { wrap: { label: '商品名称', prop: 'keyword' }, props: { placeholder: '请输入商品名称' } },
    {
      wrap: { label: '所属分类', prop: 'categoryId', type: 'select' },
      props: { placeholder: '请选择分类', options: categoryOptions },
    },
  ],
});

export const model = ({ categoryOptions = [] }: { categoryOptions?: Option[] }) => ({
  formProps: {
    'label-width': 100,
    rules: {
      title: [{ required: true, message: '该项为必填', trigger: 'blur' }],
      categoryIds: [{ required: true, message: '该项为必填', trigger: 'blur' }],
      marketPrice: [{ required: true, message: '该项为必填', trigger: 'change' }],
      discountPrice: [{ required: true, message: '该项为必填', trigger: 'change' }],
      sum: [{ required: true, message: '该项为必填', trigger: 'change' }],
      coverUrl: [{ required: true, message: '该项为必填', trigger: 'change' }],
    },
  },
  formList: [
    { wrap: { label: '商品名称', prop: 'title' }, props: { placeholder: '请输入商品名称' } },
    {
      wrap: { label: '所属分类', prop: 'categoryIds', type: 'select' },
      props: { placeholder: '请选择所属分类', multiple: true, options: categoryOptions },
    },
    { wrap: { label: '商品原价', prop: 'marketPrice' }, props: { placeholder: '请输入商品原价' } },
    { wrap: { label: '商品优惠价', prop: 'discountPrice' }, props: { placeholder: '请输入商品优惠价' } },
    { wrap: { label: '商品库存', prop: 'sum' }, props: { placeholder: '请输入商品库存' } },
    { wrap: { label: '商品图片', prop: 'coverUrl' }, props: { placeholder: '请输入商品图片' } },
  ],
});
