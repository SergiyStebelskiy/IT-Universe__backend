import express from "express";
import User from "../models/User";
import { registrationValidate, authorizationValidate } from "../validation";
import jwt from "jsonwebtoken";
import { verifyToken } from "./verifyToken";

const router = express.Router();

router.post("/registration", async (req, res) => {
	const { error } = registrationValidate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	const existEmail = await User.findOne({ email: req.body.email });
	if (existEmail) return res.status(400).send("This email already exist");
	const user = new User({
		email: req.body.email,
		name: req.body.name,
		password: req.body.password
	});
	try {
		await user.save();
		res.send("Success registration");
	} catch (error) {
		res.status(400).send(error);
	}
});

router.post("/login", async (req, res) => {
	const { error } = authorizationValidate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	const user = await User.findOne({ email: req.body.email, password: req.body.password }).select("-password");
	if (!user) return res.status(400).send("Wrond email or password");
	const token = jwt.sign({ _id: user._id }, process.env.TOKEN);
	res.header("Authorization", token).send({ access_token: token, ...user.toObject() });
});

router.get("/self", verifyToken, async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.user._id }).select("-password");
		res.send(user);
	} catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;
