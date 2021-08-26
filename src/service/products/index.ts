import Request from '../request';
import { IDataType } from '../type';

enum ProductsApi {
  product = 'product',
}

// 删除商品
export const removeProductByIdAPI: (productId: number) => Promise<IDataType> = (productId) =>
  Request.delete({ url: `${ProductsApi.product}/${productId}` });
