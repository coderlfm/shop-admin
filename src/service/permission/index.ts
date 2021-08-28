import Request from '../request';
import { IDataType } from '../type';

export enum PermissionApi {
  list = 'permission',
  interface = 'interface',
}

// 获取所有接口列表
export const getInterfaceListApi: () => Promise<IDataType> = () => Request.get({ url: PermissionApi.interface });
