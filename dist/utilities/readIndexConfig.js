'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _hasIndex = require('./hasIndex');

var _hasIndex2 = _interopRequireDefault(_hasIndex);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = directoryPath => {
  if (!(0, _hasIndex2.default)(directoryPath)) {
    return {};
  }

  const indexPath = _path2.default.resolve(directoryPath, 'index.js');
  const indexContents = _fs2.default.readFileSync(indexPath, 'utf-8');
  const found = indexContents.match(_constants.CREATE_INDEX_PATTERN);
  const configLine = typeof found[1] === 'string' ? found[1].trim() : '';

  if (configLine.length === 0) {
    return {};
  }

  let config;

  try {
    config = JSON.parse(configLine);
  } catch (error) {
    throw new Error('"' + indexPath + '" contains invalid configuration object.\n' + 'Configuration object must be a valid JSON.');
  }

  return config;
};
//# sourceMappingURL=readIndexConfig.js.map