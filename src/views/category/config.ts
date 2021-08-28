export const columns = [
  { label: '分类id', key: 'id' },
  { label: '分类名称', key: 'title' },
  { label: '排序', key: 'sort' },
  { label: '创建时间', key: 'createdAt', slotName: 'createdAt' },
  { label: '更新时间', key: 'updatedAt', slotName: 'updatedAt' },
  { label: '操作', key: '', slotName: 'handle' },
];

export const form = () => ({
  search: [{ wrap: { label: '分类名称', prop: 'cateName' }, props: { placeholder: '请输入分类名称' } }],
});

export const model = () => ({
  formProps: {
    'label-width': 100,
    rules: { title: [{ required: true, message: '该项为必填', trigger: 'blur' }] },
  },
  formList: [
    { wrap: { label: '分类名称', prop: 'title' }, props: { placeholder: '请输入分类名称' } },
    { wrap: { label: '分类排序', prop: 'sort' }, props: { placeholder: '请输入分类排序' } },
  ],
});
