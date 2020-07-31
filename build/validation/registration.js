"use strict";

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const validation = body => {
  const schema = _joi.default.object({
    name: _joi.default.string().required().min(3).max(128),
    email: _joi.default.string().required().email(),
    password: _joi.default.string().required().min(6).max(1024)
  });

  return schema.validate(body);
};

module.exports = validation;