import Post from "../models/Post";
import User from "../models/User";
import { postValidate } from "../validation";

const posts = async (req, res) => {
	Post.find({}, (err, post) => {
		if (err) res.send(err);
		res.json(post);
	});
};

const post = async (req, res) => {
	Post.findById(req.params.postId, (err, post) => {
		if (err) res.send(err);
		res.json(post);
	});
};

const addPost = async (req, res) => {
	const { error } = postValidate(req.body);
	const { author_email, ...rest } = req.body;
	if (error) return res.status(400).send(error.details[0].message);
	const author = await User.findOne({ email: req.body.author_email }).select("-password");
	const newPost = new Post({
		...rest,
		author
	});
	try {
		newPost.save();
		res.json(newPost);
	} catch (error) {
		res.status(400).send(error);
	}
};

module.exports.posts = posts;
module.exports.post = post;
module.exports.addPost = addPost;
