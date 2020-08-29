import User from "../models/User";

const profile = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.user._id }).select("-password");
		res.send(user);
	} catch (error) {
		res.status(400).send(error);
	}
};

module.exports.profile = profile;
