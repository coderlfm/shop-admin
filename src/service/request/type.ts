import type { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInterceptorManager } from 'axios';

export interface RequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (error: any) => any;
}

export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T>;
  showLoading?: boolean;
}

// export interface AxiosInstance {

//   interceptors: {
//     request: AxiosInterceptorManager<AxiosRequestConfig>;
//     response: AxiosInterceptorManager<AxiosResponse | AxiosError>;
//   };

// }
