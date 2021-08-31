import cryptoSha1 from 'crypto-js/sha1';
import { SALT } from '@/constant';

/**
 * sha1加密
 */
export const sha1 = (context: string) => cryptoSha1(context).toString();

// 加密密码
export const cryptoPassword = (password: string) => sha1(SALT + password);
