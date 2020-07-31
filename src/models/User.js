import mongoose from "mongoose";

const userSchema = {
	email: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true,
		min: 3,
		max: 64
	},
	password: {
		type: String,
		required: true,
		min: 6,
		max: 128
	}
};

module.exports = mongoose.model("User", userSchema);
