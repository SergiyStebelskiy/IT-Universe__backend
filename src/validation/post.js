import Joi from "@hapi/joi";

const post = (body) => {
	const schema = Joi.object({
		title: Joi.string().required().min(6).max(300),
		description: Joi.string().required().min(6).max(300),
		content: Joi.string().required().min(1000).max(10000),
		author_email: Joi.string().required(),
		links: Joi.array().items(
			Joi.object({
				title: Joi.string().required(),
				path: Joi.string().required()
			})
		)
	});
	return schema.validate(body);
};

module.exports = post;
