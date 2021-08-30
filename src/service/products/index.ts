import Request from '../request';
import { IDataType } from '../type';

export enum ProductsApi {
  product = 'product',
  handle = 'product/handle',
}

// 删除商品
export const removeProductByIdAPI: (productId: number) => Promise<IDataType> = (productId) =>
  Request.delete({ url: `${ProductsApi.product}/${productId}` });
