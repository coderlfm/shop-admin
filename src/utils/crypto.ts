import cryptoSha1 from 'crypto-js/sha1';

/**
 * sha1加密
 */
export const sha1 = (context: string) => cryptoSha1(context).toString();
