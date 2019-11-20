'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (targetDirectory) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  const silent = options.silent;
  let stats;

  try {
    stats = _fs2.default.statSync(targetDirectory);
  } catch (error) {
    if (silent) {
      return false;
    } else {
      throw new Error('Directory "' + targetDirectory + '" does not exist.');
    }
  }

  if (!stats.isDirectory()) {
    if (silent) {
      return false;
    } else {
      throw new Error('"' + targetDirectory + '" is not a directory.');
    }
  }

  const indexFilePath = _path2.default.resolve(targetDirectory, './index.js');

  try {
    _fs2.default.statSync(indexFilePath);
  } catch (error) {
    return true;
  }

  const indexFile = _fs2.default.readFileSync(indexFilePath, 'utf8');

  if (!indexFile.match(_constants.CREATE_INDEX_PATTERN)) {
    if (silent) {
      return false;
    } else {
      throw new Error('"' + indexFilePath + '" unsafe index.');
    }
  }

  return true;
};
//# sourceMappingURL=validateTargetDirectory.js.map