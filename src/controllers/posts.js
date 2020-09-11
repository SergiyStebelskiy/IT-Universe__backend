import Post from "../models/Post";
import {postValidate} from "../validation"

const posts = async (req, res) => {
	Post.find({}, (err, post) => {
		if (err) res.send(err);
		res.json(post);
	});
};

const post = async (req, res) => {
	Post.findById(req.params.postId, (err, post) => {
    if (err)
      res.send(err);
    res.json(post);
  });
};

const addPost = async (req, res) => {
	const { error } = postValidate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	const newPost = new Post(req.body);
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
