export const columns = [
  { label: '商品id', key: 'id' },
  { label: '所属分类', key: 'cateTitle' },
  { label: '商品名称', key: 'title' },
  { label: '商品数量', key: 'sum' },
  {
    label: '封面图',
    key: 'coverUrl',
    slotName: 'image',
  },
  { label: '优惠价', key: 'discountPrice', slotName: 'discountPrice' },
  { label: '原价', key: 'marketPrice', slotName: 'marketPrice' },
  { label: '创建时间', key: 'createdAt', slotName: 'createdAt' },
  { label: '更新时间', key: 'updatedAt', slotName: 'updatedAt' },
  { label: '操作', key: '', slotName: 'handle' },
];

export const form = {
  search: [
    { label: 'id', prop: 'id' },
    { label: '名称', prop: 'keyword' },
    { label: '分类', prop: 'categoryId' },
    { label: '价格', prop: 'price' },
  ],
};
