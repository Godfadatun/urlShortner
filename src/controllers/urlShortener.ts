/* eslint-disable no-throw-literal */
import { encodeUrlSchema } from '../authSchema/urlShortenerSchema';
import { theResponse } from '../utils/interface';
import { ResourceNotFoundError } from '../utils/errors';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const NodeCache = require('node-cache');

const myCache = new NodeCache();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const otpGenerator = require('otp-generator');

const encodeUrl = async (url: string): Promise<theResponse> => {
  const validation = encodeUrlSchema.validate({ url });
  if (validation.error) return ResourceNotFoundError(validation.error);

  try {
    const short_code = otpGenerator.generate(5, {
      upperCase: true,
      specialChars: false,
      digits: true,
    });

    myCache.set(short_code, url);
    return {
      success: true,
      message: `Url Encoded successfully`,
      data: `http://127.0.0.1:3004/api/static/${short_code}`,
    };
  } catch (e: any) {
    throw e || `Getting ToDo's failed, kindly try again`;
  }
};

const decodeUrl = async (url: string): Promise<theResponse> => {
  const validation = encodeUrlSchema.validate({ url });
  if (validation.error) return ResourceNotFoundError(validation.error);

  try {
    if (!url.includes('/api/static/'))
      throw {
        success: false,
        message: 'This Url can not be decoded, kindly try again with the right Url',
      };
    const urlArray = url.split('/');
    const short_code = urlArray[urlArray.length - 1];

    const encodedUrl = myCache.get(short_code);
    if (!encodedUrl)
      throw {
        success: false,
        message: 'Url not found, kindly try again',
      };
    return {
      success: true,
      message: `Url decoded successfully`,
      data: encodedUrl,
    };
  } catch (e: any) {
    throw e || `Getting ToDo's failed, kindly try again`;
  }
};

export default { decodeUrl, encodeUrl };
