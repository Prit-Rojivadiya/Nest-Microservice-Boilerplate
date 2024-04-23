import { BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';

export const validateSchema = (schema: Joi.Schema, object: any) => {
  const { error, value } = schema.validate(object);
  if (error) {
    throw new BadRequestException(error.message);
  }
  return value;
};
