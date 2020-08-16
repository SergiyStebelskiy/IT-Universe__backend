"use strict";

var _express = _interopRequireDefault(require("express"));

var _User = _interopRequireDefault(require("../models/User"));

var _validation = require("../validation");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _verifyToken = require("./verifyToken");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post("/registration", async (req, res) => {
  const {
    error
  } = (0, _validation.registrationValidate)(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const existEmail = await _User.default.findOne({
    email: req.body.email
  });
  if (existEmail) return res.status(400).send("This email already exist");
  const user = new _User.default({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.post("/login", async (req, res) => {
  const {
    error
  } = (0, _validation.authorizationValidate)(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await _User.default.findOne({
    email: req.body.email,
    password: req.body.password
  });
  if (!user) return res.status(400).send("Wrond email or password");

  const token = _jsonwebtoken.default.sign({
    _id: user._id
  }, process.env.TOKEN);

  res.header("Authorization", token).send(token);
});
router.get("/", _verifyToken.verifyToken, async (req, res) => {
  try {
    const user = await _User.default.findOne({
      _id: req.user._id
    }).select("-password");
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;