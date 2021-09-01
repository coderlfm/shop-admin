export enum UploadApi {
  banner = '/upload/banner',
  product = '/upload/product',
}

// 图片上传 header
export const uploadHeader = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
};
