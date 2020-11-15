import mongoose from "mongoose";

const userSchema = {
  type: {
    type: String,
    required: true,
    default: "USER",
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    min: 3,
    max: 64,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 128,
  },
  avatarIndex: {
    type: Number,
    default: () => Math.floor(1 + Math.random() * 100),
  },
  online: {
    type: Boolean,
    default: false,
  },
};

const adminSchema = {
  type: {
    type: String,
    required: true,
    default: "ADMIN",
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    min: 3,
    max: 64,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 128,
  },
  avatarIndex: {
    type: Number,
    default: () => Math.floor(1 + Math.random() * 100),
  },
  requests_posts: {
    type: Array,
    default: [],
  },
  online: {
    type: Boolean,
    default: false,
  },
};

module.exports.User = mongoose.model("User", userSchema, "users");
module.exports.Admin = mongoose.model("Admin", adminSchema, "users");
