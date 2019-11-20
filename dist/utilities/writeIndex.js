'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _createIndexCode = require('./createIndexCode');

var _createIndexCode2 = _interopRequireDefault(_createIndexCode);

var _validateTargetDirectory = require('./validateTargetDirectory');

var _validateTargetDirectory2 = _interopRequireDefault(_validateTargetDirectory);

var _readDirectory = require('./readDirectory');

var _readDirectory2 = _interopRequireDefault(_readDirectory);

var _readIndexConfig = require('./readIndexConfig');

var _readIndexConfig2 = _interopRequireDefault(_readIndexConfig);

var _sortByDepth = require('./sortByDepth');

var _sortByDepth2 = _interopRequireDefault(_sortByDepth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (directoryPaths) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  const sortedDirectoryPaths = (0, _sortByDepth2.default)(directoryPaths).filter(directoryPath => {
    return (0, _validateTargetDirectory2.default)(directoryPath, { silent: options.ignoreUnsafe });
  });

  _lodash2.default.forEach(sortedDirectoryPaths, directoryPath => {
    const config = (0, _readIndexConfig2.default)(directoryPath);
    const optionsWithConfig = Object.assign({}, options, { config });
    const siblings = (0, _readDirectory2.default)(directoryPath, optionsWithConfig);
    const indexCode = (0, _createIndexCode2.default)(siblings, optionsWithConfig);
    const indexFilePath = _path2.default.resolve(directoryPath, 'index.js');

    _fs2.default.writeFileSync(indexFilePath, indexCode);
  });
};
//# sourceMappingURL=writeIndex.js.map