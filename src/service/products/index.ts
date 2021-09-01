import Request from '../request';
import { IDataType } from '../type';

export enum ProductsApi {
  product = 'product',
  handle = 'product/handle',
  contentImg = 'product/contentImg',
}

// 删除商品
export const removeProductByIdAPI: (productId: number) => Promise<IDataType> = (productId) =>
  Request.delete({ url: `${ProductsApi.product}/${productId}` });

// 给商品添加详情图
export const addProductImgByIdAPI: (productId: number, data: { url: string }) => Promise<IDataType> = (
  productId,
  data,
) => Request.post({ url: `${ProductsApi.contentImg}/${productId}`, data });

// 删除商品详情图
export const removeProductImgByIdAPI: (imgId: number) => Promise<IDataType> = (imgId) =>
  Request.delete({ url: `${ProductsApi.contentImg}/${imgId}` });
