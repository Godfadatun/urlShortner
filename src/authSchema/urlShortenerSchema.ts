/* eslint-disable max-classes-per-file */
import joi from 'joi';

export const createToDoSchema = joi.object().keys({
  text: joi.string().required(),
  description: joi.string().max(500).required(),
});

export const encodeUrlSchema = joi.object().keys({
  url: joi.string().required(),
});

export const completeToDoSchema = joi.object().keys({
  id: joi.number().required(),
});
