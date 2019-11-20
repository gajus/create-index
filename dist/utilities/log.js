'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  for (var _len = arguments.length, append = Array(_len), _key = 0; _key < _len; _key++) {
    append[_key] = arguments[_key];
  }

  // eslint-disable-next-line
  console.log(_chalk2.default.dim('[' + (0, _moment2.default)().format('HH:mm:ss') + ']'), ...append);
};
//# sourceMappingURL=log.js.map