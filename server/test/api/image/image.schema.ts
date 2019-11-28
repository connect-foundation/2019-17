import Joi from "joi";

export const imageScheme = Joi.object().keys({
  filename: Joi.string().required(),
  mimetype: Joi.string().required(),
  encoding: Joi.string().required()
});
