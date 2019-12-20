import Joi from 'joi';

export const userScheme = Joi.object().keys({
  nickname: Joi.string().required(),
  residence: Joi.string().required(),
  hometown: Joi.string().required(),
  thumbnail: Joi.string().allow(null),
  email: Joi.string()
});
