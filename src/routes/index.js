import express from "express";
import { verifyToken } from "./verifyToken";
import { registration } from "../controllers/registration";
import { authorization } from "../controllers/authorization";
import { profile, searchUsers, onlineUsers } from "../controllers/profile";
import Chat from "../models/Chat";
import {
  posts,
  requestsPosts,
  post,
  addPost,
  approvePost,
  rejectPost,
} from "../controllers/posts";
import {
  createChat,
  getChat,
  getUserChats,
  addMessage,
} from "../controllers/chat";
import e from "express";

const router = express.Router();

router.post("/registration", registration);

router.post("/login", authorization);

router.get("/self", verifyToken, profile);
router.get("/users/:userId", profile);
router.get("/users", searchUsers);
router.get("/online-users", onlineUsers);

router.get("/posts", posts);
router.get("/requests-posts", verifyToken, requestsPosts);
router.get(`/posts/:postId`, post);
router.post("/posts", verifyToken, addPost);
router.post(`/posts/:postId/approve`, verifyToken, approvePost);
router.delete(`/posts/:postId/reject`, verifyToken, rejectPost);

router.post("/chats", verifyToken, createChat);
router.get("/chats/:chatId", verifyToken, getChat);
router.get("/users/:userId/chats", verifyToken, getUserChats);
router.post("/chats/:chatId", verifyToken, addMessage);

// router.put("/update/chats", async ({ req, res }) => {
//   // await Chat.updateMany(
//   //   {},
//   //   { $set: { last_activity_date: new Date() } },
//   //   (err, writeResult) => {
//   //     if (err) {
//   //       console.log("err", err);
//   //     } else {
//   //       res.send(writeResult);
//   //     }
//   //   }
//   // );
//   const chats = await Chat.find({});
//   const formatUsers = (users) => {
//     return users.map((e) => ({ ...e, last_activity_date: new Date() }));
//   };
//   chats.map(async (chat) => {
//     await Chat.updateOne(
//       { _id: chat._id },
//       { $set: { users: formatUsers(chat.users) } },
//       (err, result) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(result);
//         }
//       }
//     );
//   });
// });

module.exports = router;
