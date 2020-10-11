import Post from "../models/Post";
import { Admin, User } from "../models/User";
import { postValidate } from "../validation";
import mongoose, { Mongoose } from "mongoose";

const posts = async (req, res) => {
	Post.find({}, (err, post) => {
		if (err) res.status(404).res.send(err);
		res.json(post);
	});
};

const requestsPosts = async (req, res) => {
	const admin = await Admin.findOne({ email: "admin@mail.com" });
	try {
		res.json(admin.requests_posts);
	} catch (error) {
		res.status(402).send(error);
	}
};

const post = async (req, res) => {
	Post.findById(req.params.postId, (err, post) => {
		if (err) res.status(404).send(err);
		res.json(post);
	});
};

const addPost = async (req, res) => {
	const { error } = postValidate(req.body);
	const { author_email, ...rest } = req.body;
	if (error) return res.status(402).send(error.details[0].message);
	const author = await User.findOne({ email: req.body.author_email }).select("-password");
	const newPost = {
		...rest,
		author,
		_id: mongoose.Types.ObjectId(),
		created_at: Date.now
	};
	const admin = await Admin.findOne({ email: "admin@mail.com" });
	try {
		await Admin.updateOne(
			{ email: "admin@mail.com" },
			{ $set: { requests_posts: [ newPost, ...admin.requests_posts ] } },
			(err, result) => {
				if (error) {
					res.send(err);
				} else {
					res.send(result);
				}
			}
		);
	} catch (error) {
		res.status(402).send(error);
	}
};

const approvePost = async (req, res) => {
	const admin = await Admin.findOne({ email: "admin@mail.com" });
	const newPostData = admin.requests_posts.filter((e) => e._id.toString() === req.params.postId);
	const newPost = new Post(...newPostData);
	const requestsPosts = admin.requests_posts.filter((e) => e._id.toString() !== req.params.postId);
	try {
		await Admin.updateOne(
			{ email: "admin@mail.com" },
			{ $set: { requests_posts: requestsPosts } },
			(error, result) => {
				if (error) {
					res.send(error);
				} else if (!newPostData.length) {
					res.send(result);
				}
			}
		);
		if (newPostData.length) {
			await newPost.save((err, post) => {
				if (err) res.send(err);
				res.json(post);
			});
		}
	} catch (error) {
		res.status(402).send(error);
	}
};

const rejectPost = async (req, res) => {
	const admin = await Admin.findOne({ email: "admin@mail.com" });
	const requestsPosts = admin.requests_posts.filter((e) => e._id.toString() !== req.params.postId);
	try {
		await Admin.updateOne(
			{ email: "admin@mail.com" },
			{ $set: { requests_posts: requestsPosts } },
			(error, result) => {
				if (error) {
					res.send(error);
				} else {
					res.send(result);
				}
			}
		);
	} catch (error) {
		res.status(402).send(error);
	}
};

module.exports.posts = posts;
module.exports.requestsPosts = requestsPosts;
module.exports.post = post;
module.exports.addPost = addPost;
module.exports.approvePost = approvePost;
module.exports.rejectPost = rejectPost;
