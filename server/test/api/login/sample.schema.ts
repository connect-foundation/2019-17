import Joi from "joi";

export const testsScheme = Joi.object()
  .keys({
    text: Joi.string().required()
    // text: Joi.string().required(),
  })
  .unknown();
// .unknown(); : 다른 키들이 있으면 fail
