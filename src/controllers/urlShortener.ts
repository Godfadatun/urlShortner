import { completeToDoSchema, createToDoSchema, getToDoSchema } from '../authSchema/urlShortenerSchema';
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
  const validation = getToDoSchema.validate({ completed: url });
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
      data: `http://127.0.0.1:3002/static/${short_code}`,
    };
  } catch (e) {
    logger.error(e);
    return {
      success: false,
      message: `Getting ToDo's failed, kindly try again`,
    };
  } finally {
    await queryRunner.release();
  }
};

export const decodeUrl = async (url: string): Promise<theResponse> => {
  const validation = getToDoSchema.validate({ completed: url });
  if (validation.error) return ResourceNotFoundError(validation.error);

  const queryRunner = await getQueryRunner();
  try {
    const urlArray = url.split('/');

    const urlIdentifier = urlArray[urlArray.length - 2];
    if (urlIdentifier !== 'static') throw new Error('This Url can not be decoded, kindly try again with the right Url');
    const short_code = urlArray[urlArray.length - 1];

    const encodedUrl = await queryRunner.manager.findOne(Url, { short_code });
    if (!encodedUrl) throw new Error('Url not found, kindly try again');
    return {
      success: true,
      message: `Url decoded successfully`,
      data: encodedUrl.url,
    };
  } catch (e: any) {
    logger.error(e);
    return {
      success: false,
      message: e || `Getting ToDo's failed, kindly try again`,
    };
  } finally {
    await queryRunner.release();
  }
};

export const staticUrl = async (url: string): Promise<theResponse> => {
  const validation = getToDoSchema.validate({ completed: url });
  if (validation.error) return ResourceNotFoundError(validation.error);

  const queryRunner = await getQueryRunner();
  try {
    const urlArray = url.split('/');
    const short_code = urlArray[urlArray.length - 1];

    const encodedUrl = await queryRunner.manager.findOne(Url, { short_code });
    if (!encodedUrl) throw new Error('Url not found, kindly try again');
    return {
      success: true,
      message: `Url decoded successfully`,
      data: encodedUrl.url,
    };
  } catch (e: any) {
    logger.error(e);
    return {
      success: false,
      message: e || `Getting ToDo's failed, kindly try again`,
    };
  } finally {
    await queryRunner.release();
  }
};
