export enum UploadApi {
  banner = '/upload/banner',
  product = '/upload/product',
}

function getToken (){
  return `Bearer ${localStorage.getItem('token')}`
}

// 图片上传 header
export const uploadHeader = {
  Authorization: getToken(),
};
