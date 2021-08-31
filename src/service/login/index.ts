import Request from '../request';
import { IDataType } from '../type';
import { ILoginData } from './type';

enum Login {
  login = 'login',
  permission = 'login/permission',
  resetPassword = 'login/resetPassword',
}

// 登录
export const loginApi: (data: ILoginData) => Promise<IDataType> = (data) => Request.post({ url: Login.login, data });

// 获取权限列表
export const getPermissionApi: () => Promise<IDataType> = () => Request.get({ url: Login.permission });

// 重置账户密码
export const resetAccountPasswordApi: (data: { newPassword: string; oldPassword: string }) => Promise<IDataType> = (
  data,
) => Request.patch({ url: Login.resetPassword, data });
