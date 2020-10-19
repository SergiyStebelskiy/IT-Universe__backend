import mongoose from "mongoose";

const ChatSchema = {
  users: {
    type: Array,
    required: true,
  },
  messages: [
    {
      author: {
        type: Object,
        required: true,
      },
      text: {
        type: String,
        required: true,
        max: 128,
      },
    },
  ],
};

module.exports = mongoose.model("Chat", ChatSchema);
