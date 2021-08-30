import Request from '../request';
import { IDataType } from '../type';

export enum AccountApi {
  list = 'account',
  resetPassword = 'account/resetPassword',
  handle = 'account/handle',
}

// 获取所有角色列表
// export const getInterfaceListApi: () => Promise<IDataType> = () => Request.get({ url: AccountApi.interface });

// 重置密码
export const resetPasswordApi: (accountId: number, data: { password: string }) => Promise<IDataType> = (
  accountId,
  data,
) => Request.patch({ url: `${AccountApi.resetPassword}/${accountId}`, data });
