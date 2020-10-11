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
		max: 500
	},
	content: {
		type: String,
		required: true,
		min: 1000,
		max: 40000
	},
	author: {
		type: Object,
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
	],
	created_at: {
		type: Date,
		default: Date.now
	}
};
module.exports = mongoose.model("Post", PostSchema);
