import Joi from "@hapi/joi";

const validation = (body) => {
	const schema = Joi.object({
		name: Joi.string().required().min(3).max(128),
		email: Joi.string().required().email(),
		password: Joi.string().required().min(6).max(1024)
	});
	return schema.validate(body);
};

module.exports = validation;
