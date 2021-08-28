import type { Option } from '@/types';
import FormType from 'element-plus/lib/el-form/src/form.vue';

export const columns = [
  { label: '商品id', key: 'id' },
  { label: '所属分类', key: 'cateTitle' },
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

export const model: () => { formProps?: ThisType<typeof FormType>; formList: any[] } = () => ({
  formProps: {
    'label-width': 100,
  },
  formList: [
    { wrap: { label: '商品名称', prop: 'title' }, props: { placeholder: '请输入商品名称' } },
    { wrap: { label: '商品原价', prop: 'marketPrice' }, props: { placeholder: '请输入商品原价' } },
    { wrap: { label: '商品优惠价', prop: 'discountPrice' }, props: { placeholder: '请输入商品优惠价' } },
    { wrap: { label: '商品库存', prop: 'sum' }, props: { placeholder: '请输入商品库存' } },
    { wrap: { label: '商品图片', prop: 'coverUrl' }, props: { placeholder: '请输入商品图片' } },
  ],
});
