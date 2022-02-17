/* eslint-disable max-classes-per-file */
import joi from 'joi';

export const encodeUrlSchema = joi.object().keys({
  url: joi.string().required(),
});
