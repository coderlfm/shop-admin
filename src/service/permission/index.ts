import Request from '../request';
import { IDataType } from '../type';

export enum PermissionApi {
  list = 'permission',
  interface = 'interface',
}

// 获取所有接口列表
export const getInterfaceListApi: () => Promise<IDataType> = () => Request.get({ url: PermissionApi.interface });

// 获取所有权限列表接口
export const getPermissionListAPI: (data: { page: number; pageSize: number }) => Promise<IDataType> = ({
  page,
  pageSize,
}) => Request.get({ url: `${PermissionApi.list}?page=${page}&pageSize=${pageSize}` });
