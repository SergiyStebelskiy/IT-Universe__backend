"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userSchema = {
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    min: 3,
    max: 64
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 128
  }
};
module.exports = _mongoose.default.model("User", userSchema);