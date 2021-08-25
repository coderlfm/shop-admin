import Request from '@/service/request';
import { IDataType } from '../type';

/**
 * 获取列表
 */
export function getListApi(url: string, searchData: any): Promise<IDataType<any>> {
  // let url = `${HomeApi.products}?`;

  // type keyType = keyof ISearchData;

  url += '?';

  let key: string;

  for (key in searchData) {
    const value = searchData[key];
    if (!value) continue;
    url += `${key}=${value}&`;
  }
  url = url.slice(0, -1);

  return Request.get<IDataType>({ url });
}
