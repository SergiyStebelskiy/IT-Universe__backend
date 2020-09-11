import mongoose from "mongoose";

const PostSchema = {
	title: {
		type: String,
		required: true,
		min: 6,
		max: 300
	},
	description: {
		type: String,
		required: true,
		min: 6,
		max: 300
	},
	content: {
		type: String,
		required: true,
		min: 1000,
		max: 10000
	},
	author_id: {
		type: String,
		required: true
	},
	links: [
		{
			title: {
				type: String,
				required: true
			},
			path: {
				type: String,
				required: true
			}
		}
	]
};
module.exports = mongoose.model("Post", PostSchema);
