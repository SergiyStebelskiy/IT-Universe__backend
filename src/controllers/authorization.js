import User from "../models/User";
import { authorizationValidate } from "../validation";
import jwt from "jsonwebtoken";

const authorization = async (req, res) => {
	const { error } = authorizationValidate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	const user = await User.findOne({ email: req.body.email, password: req.body.password }).select("-password");
	if (!user) return res.status(400).send("Wrond email or password");
	const token = jwt.sign({ _id: user._id }, process.env.TOKEN);
	res.header("Authorization", token).send({ access_token: token, ...user.toObject() });
};

module.exports.authorization = authorization;
