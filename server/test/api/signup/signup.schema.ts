import Joi from "joi";

export const testsScheme = Joi.object().keys({
  token: Joi.string().required(),
  expireDate: Joi.string().required()
});
