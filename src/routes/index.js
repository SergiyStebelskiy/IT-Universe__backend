import express from "express";
import { verifyToken } from "./verifyToken";
import { registration } from "../controllers/registration";
import { authorization } from "../controllers/authorization";
import { profile } from "../controllers/profile";
import { posts, post, addPost } from "../controllers/posts";

const router = express.Router();

router.post("/registration", registration);

router.post("/login", authorization);

router.get("/self", verifyToken, profile);

router.get("/posts", posts);
router.get(`/posts/:postId`, post);
router.post("/posts", addPost);

module.exports = router;
