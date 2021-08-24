import Request from '../request';
import { IDataType } from '../type';
import { ILoginData } from './type';

enum Login {
  login = 'login',
}

// export const loginApi: () => Promise<IDataType> = (data) => Request.post({ url: Login.login, data });

export const loginApi: (data: ILoginData) => Promise<IDataType> = (data) => Request.post({ url: Login.login, data });
