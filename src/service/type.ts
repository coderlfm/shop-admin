export * from './login/type';

export interface IDataType<T = any> {
  code: number;
  data: T;
  msg: string;
}
