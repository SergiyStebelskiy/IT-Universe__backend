import { User } from "../models/User";
import { registrationValidate } from "../validation";

const registration = async (req, res) => {
	const { error } = registrationValidate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	const existEmail = await User.findOne({ email: req.body.email });
	if (existEmail) return res.status(400).send("This email already exist");
	const user = new User({
		email: req.body.email,
		name: req.body.name,
		password: req.body.password,
		type: "USER"
	});
	try {
		await user.save();
		res.send("Success registration");
	} catch (error) {
		res.status(400).send(error);
	}
};

module.exports.registration = registration;
