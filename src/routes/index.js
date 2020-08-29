import express from "express";
import { verifyToken } from "./verifyToken";
import { registration } from "../controllers/registration";
import { authorization } from "../controllers/authorization";
import { profile } from "../controllers/profile";

const router = express.Router();

router.post("/registration", registration);

router.post("/login", authorization);

router.get("/self", verifyToken, profile);

module.exports = router;
