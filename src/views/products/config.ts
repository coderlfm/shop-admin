export const columns = [
  { label: '商品id', key: 'id' },
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
    { label: '名称', prop: '名称' },
    { label: '分类', prop: '分类' },
    { label: '价格', prop: '价格' },
  ],
};
