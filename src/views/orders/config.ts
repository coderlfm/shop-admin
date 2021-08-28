import type { Option } from '@/types';

export const columns = [
  { label: 'id', key: 'id' },
  { label: '用户id', key: 'userId' },
  { label: '下单用户', key: 'nickName' },
  { label: '订单金额', key: 'totalPrice' },
  { label: '订单状态', key: 'status', slotName: 'status' },
  { label: '物流号', key: 'logisticsNumber' },
  { label: '收件人姓名', key: 'name' },
  { label: '收件人手机号', key: 'mobile' },
  { label: '收件人地址', key: 'address' },
  { label: '交易快照', key: 'snapshoot', slotName: 'snapshoot' },
  { label: '备注', key: 'remark' },
  { label: '创建时间', key: 'createdAt', slotName: 'createdAt' },
  { label: '更新时间', key: 'updatedAt', slotName: 'updatedAt' },
  { label: '操作', key: '', slotName: 'handle' },
];

export const form = () => ({
  search: [
    { wrap: { label: '订单id', prop: 'orderId' }, props: { placeholder: '请输入订单id' } },
    { wrap: { label: '用户昵称', prop: 'nickName' }, props: { placeholder: '请输入用户昵称' } },
    { wrap: { label: '物流号', prop: 'logisticsNumber' }, props: { placeholder: '请输入物流号' } },
    { wrap: { label: '收件人姓名', prop: 'name' }, props: { placeholder: '请输入收件人姓名' } },
    { wrap: { label: '收件人手机号', prop: 'mobile' }, props: { placeholder: '请输入收件人手机号' } },
    {
      wrap: { label: '订单状态', prop: 'status', type: 'select' },
      props: {
        placeholder: '请选择订单状态',
        options: [
          { label: '待付款', value: '1' },
          { label: '待发货', value: '2' },
          { label: '已发货', value: '3' },
          { label: '已取消', value: '4' },
          { label: '已完成', value: '5' },
        ],
      },
    },
  ],
});

export const model = () => ({
  formProps: { 'label-width': 100 },
  formList: [
    { wrap: { label: '物流号', prop: 'logisticsNumber' }, props: { placeholder: '请输入物流号' } },
    { wrap: { label: '收件人姓名', prop: 'name' }, props: { placeholder: '请输入收件人姓名' } },
    { wrap: { label: '收件人手机号', prop: 'mobile' }, props: { placeholder: '请输入收件人手机号' } },
    { wrap: { label: '收件人地址', prop: 'address' }, props: { placeholder: '请输入收件人地址' } },
    { wrap: { label: '备注', prop: 'remark' }, props: { placeholder: '请输入备注' } },
  ],
});
