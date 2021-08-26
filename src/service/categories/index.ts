import Request from '../request';
import { IDataType } from '../type';

enum CategoriesApi {
  list = '',
}

// 获取分类列表
export const getCateogriesList: (data: { page: number; pageSize: number }) => Promise<IDataType> = ({
  page,
  pageSize,
}) => Request.get({ url: `category?page=${page}&pageSize=${pageSize}` });
