import mongoose from "mongoose";
import User from "../models/User";
import Post from "../models/Post";

const profile = async (req, res) => {
	try {
		const posts = await Post.find({ "author._id": mongoose.Types.ObjectId(req.user._id) });
		const user = await User.findOne({ _id: req.user._id }).select("-password");
		res.send({
			...user._doc,
			posts
		});
		console.log(posts);
	} catch (error) {
		res.status(400).send(error);
	}
};

module.exports.profile = profile;
