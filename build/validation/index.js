"use strict";

var _registration = _interopRequireDefault(require("./registration"));

var _authorization = _interopRequireDefault(require("./authorization"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports.registrationValidate = _registration.default;
module.exports.authorizationValidate = _authorization.default;