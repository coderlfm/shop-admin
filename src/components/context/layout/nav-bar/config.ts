export const formDefaultConfig = ({ validatePass2 }: any) => ({
  formProps: {
    'label-width': 100,
    rules: {
      oldPassword: [{ required: true, message: '该项为必填', trigger: 'blur' }],
      newPassword: [{ required: true, message: '该项为必填', trigger: 'blur' }],
      newPassword2: [{ required: true, trigger: 'change', validator: validatePass2 }],
    },
  },
  formList: [
    { wrap: { label: '原密码', prop: 'oldPassword' }, props: { placeholder: '请输入原密码' } },
    { wrap: { label: '新密码', prop: 'newPassword' }, props: { placeholder: '请输入新密码', 'show-password': true } },
    {
      wrap: { label: '确认密码', prop: 'newPassword2' },
      props: { placeholder: '请再次输入新密码', 'show-password': true },
    },
  ],
});
