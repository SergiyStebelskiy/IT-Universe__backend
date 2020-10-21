import express from "express";
import { verifyToken } from "./verifyToken";
import { registration } from "../controllers/registration";
import { authorization } from "../controllers/authorization";
import { profile, searchUsers } from "../controllers/profile";
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

const router = express.Router();

router.post("/registration", registration);

router.post("/login", authorization);

router.get("/self", verifyToken, profile);
router.get("/users/:userId", profile);
router.get("/users", searchUsers);

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

// router.put("/update/posts", async ({ req, res }) => {
// 	await Admin.updateOne(
// 		{ email: "admin@mail.com" },
// 		{ $set: { requests_posts: [], type: "ADMIN" } },
// 		(err, writeResult) => {
// 			if (err) {
// 				console.log("err", err);
// 			} else {
// 				res.send(writeResult);
// 			}
// 		}
// 	);
// });

module.exports = router;
