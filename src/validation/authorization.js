import Joi from "@hapi/joi";

const validation = (body) => {
	const schema = Joi.object({
		email: Joi.string().required().email(),
		password: Joi.string().required().min(6).max(1024)
	});
	return schema.validate(body);
};

module.exports = validation;
