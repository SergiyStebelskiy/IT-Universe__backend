import Chat from "../models/Chat";
import { User } from "../models/User";
import { chatValidate } from "../validation";
import mongoose from "mongoose";

const createChat = async (req, res) => {
  const { error } = chatValidate(req.body);
  if (error) {
    res.send(error);
  }
  const users = await User.find({ _id: { $in: req.body.users } });
  const existChat = await Chat.findOne({ users: users });
  if (existChat && Object.keys(existChat).length) {
    res.send(existChat);
  } else {
    const newChat = new Chat({ users, messages: [] });
    await newChat.save((err, chat) => {
      if (err) res.send(err);
      res.json(chat);
    });
  }
};

const getChat = (req, res) => {
  Chat.findById(req.params.chatId, (err, chat) => {
    if (err) {
      res.status(404).send(err);
    }
    res.send(chat);
  });
};

const getUserChats = async (req, res) => {
  const chats = await Chat.find({
    users: { $elemMatch: { _id: mongoose.Types.ObjectId(req.params.userId) } },
  });
  res.send(chats);
};

const addMessage = async (req, res) => {
  const author = await User.findById(req.body.author);
  const message = { author, text: req.body.text };
  Chat.updateOne(
    { _id: mongoose.Types.ObjectId(req.params.chatId) },
    { $push: { messages: message } },
    (err, chat) => {
      if (err) {
        res.status(400).send(err);
      }
      res.send(message);
    }
  );
};

module.exports.createChat = createChat;
module.exports.getChat = getChat;
module.exports.getUserChats = getUserChats;
module.exports.addMessage = addMessage;
