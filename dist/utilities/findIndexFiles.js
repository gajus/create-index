'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _validateTargetDirectory = require('./validateTargetDirectory');

var _validateTargetDirectory2 = _interopRequireDefault(_validateTargetDirectory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (directoryPath) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  let fileName, targetDirectories;

  fileName = options.fileName || 'index.js';
  fileName = './**/' + fileName;

  targetDirectories = _glob2.default.sync(_path2.default.join(directoryPath, fileName));

  targetDirectories = _lodash2.default.filter(targetDirectories, targetDirectoryPath => {
    return (0, _validateTargetDirectory2.default)(_path2.default.dirname(targetDirectoryPath), {
      silent: options.silent
    });
  });

  targetDirectories = _lodash2.default.map(targetDirectories, _path2.default.dirname);

  return targetDirectories;
};
//# sourceMappingURL=findIndexFiles.js.map