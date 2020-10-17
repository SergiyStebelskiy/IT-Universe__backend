import mongoose from "mongoose";
import { User } from "../models/User";
import Post from "../models/Post";

const profile = async (req, res) => {
  const userId = req.user?._id || req.params.userId;
  try {
    const posts = await Post.find({
      "author._id": mongoose.Types.ObjectId(userId),
    });
    const user = await User.findOne({ _id: userId }).select("-password");
    res.send({
      ...user._doc,
      posts,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

const searchUsers = async (req, res) => {
  const query = req.query.email;
  User.find({ email: { $regex: query } }, (err, users) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(users);
    }
  }).select("-password");
};

module.exports.profile = profile;
module.exports.searchUsers = searchUsers;
