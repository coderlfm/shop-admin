import Request from '../request';
import { IDataType } from '../type';

export enum RoleApi {
  list = 'role',
}

// export const getInterfaceListApi: () => Promise<IDataType> = () => Request.get({ url: RoleApi.interface });

// 获取所有角色列表接口
export const getRoleListAPI: (data: { page: number; pageSize: number }) => Promise<IDataType> = ({ page, pageSize }) =>
  Request.get({ url: `${RoleApi.list}?page=${page}&pageSize=${pageSize}` });
