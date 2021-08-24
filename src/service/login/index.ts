import Request from '../request';
import { IDataType } from '../type';
import { ILoginData } from './type';

enum Login {
  login = 'login',
  permission = 'login/permission',
}

// 登录
export const loginApi: (data: ILoginData) => Promise<IDataType> = (data) => Request.post({ url: Login.login, data });

// 获取权限列表
export const getPermissionApi: () => Promise<IDataType> = () => Request.get({ url: Login.permission });
