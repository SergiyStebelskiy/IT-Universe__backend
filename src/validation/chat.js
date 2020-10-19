import Joi from "@hapi/joi";

const chat = (body) => {
  const schema = Joi.object({
    users: Joi.array().items(Joi.string()).required().min(2),
    // messages: Joi.array()
    //   .items(
    //     Joi.object({
    //       author: Joi.string(),
    //       text: Joi.string().max(128).required(),
    //     })
    //   )
    //   .required(),
  });
  return schema.validate(body);
};

module.exports = chat;
