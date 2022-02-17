/* eslint-disable no-throw-literal */
import { completeToDoSchema, createToDoSchema, encodeUrlSchema } from '../authSchema/urlShortenerSchema';
import { theResponse } from '../utils/interface';
import { ResourceNotFoundError } from '../utils/errors';
import { getQueryRunner } from '../database/helpers/db';
// import { Todo } from '../database/models/ToDo';
import logger from '../utils/logger';
import { completeToDoDTO, createToDoDTO } from '../dto/urlShortenerDTO';
import { Url } from '../database/models/url';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const otpGenerator = require('otp-generator');

export const encodeUrl = async (url: string): Promise<theResponse> => {
  const validation = encodeUrlSchema.validate({ url });
  if (validation.error) return ResourceNotFoundError(validation.error);

  const queryRunner = await getQueryRunner();
  try {
    const short_code = otpGenerator.generate(5, {
      upperCase: true,
      specialChars: false,
      digits: true,
    });

    await queryRunner.manager.save(Url, { short_code, url });
    return {
      success: true,
      message: `Url Encoded successfully`,
      data: `http://127.0.0.1:3004/api/static/${short_code}`,
    };
  } catch (e: any) {
    throw e || `Getting ToDo's failed, kindly try again`;
  } finally {
    await queryRunner.release();
  }
};

export const decodeUrl = async (url: string): Promise<theResponse> => {
  const validation = encodeUrlSchema.validate({ url });
  if (validation.error) return ResourceNotFoundError(validation.error);

  const queryRunner = await getQueryRunner();
  try {
    console.log({ url, check: url.includes('/api/static/') });
    if (!url.includes('/api/static/'))
      throw {
        success: false,
        message: 'This Url can not be decoded, kindly try again with the right Url',
      };
    const urlArray = url.split('/');
    const short_code = urlArray[urlArray.length - 1];

    const encodedUrl = await queryRunner.manager.findOne(Url, { short_code });
    if (!encodedUrl)
      throw {
        success: false,
        message: 'Url not found, kindly try again',
      };
    return {
      success: true,
      message: `Url decoded successfully`,
      data: encodedUrl.url,
    };
  } catch (e: any) {
    throw e || `Getting ToDo's failed, kindly try again`;
  } finally {
    await queryRunner.release();
  }
};
