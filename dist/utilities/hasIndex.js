'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = directoryPath => {
  const indexPath = _path2.default.resolve(directoryPath, 'index.js');

  try {
    _fs2.default.statSync(indexPath);

    return true;
  } catch (error) {
    return false;
  }
};
//# sourceMappingURL=hasIndex.js.map