import Request from '../request';
import { IDataType } from '../type';

export enum CategoriesApi {
  list = 'category',
}

// 获取分类列表
export const getCateogriesListAPI: (data: { page: number; pageSize: number }) => Promise<IDataType> = ({
  page,
  pageSize,
}) => Request.get({ url: `${CategoriesApi.list}?page=${page}&pageSize=${pageSize}` });
