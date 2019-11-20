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

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

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

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

var _findIndexFiles = require('./findIndexFiles');

var _findIndexFiles2 = _interopRequireDefault(_findIndexFiles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (directoryPaths) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  let sortedDirectoryPaths;

  sortedDirectoryPaths = (0, _sortByDepth2.default)(directoryPaths);

  (0, _log2.default)('Target directories', sortedDirectoryPaths);
  if (options.updateIndex) {
    (0, _log2.default)('Update index:', options.updateIndex ? _chalk2.default.green('true') : _chalk2.default.red('false'));
  } else {
    (0, _log2.default)('Recursive:', options.recursive ? _chalk2.default.green('true') : _chalk2.default.red('false'));
    (0, _log2.default)('Ignore unsafe:', options.ignoreUnsafe ? _chalk2.default.green('true') : _chalk2.default.red('false'));
    (0, _log2.default)('Extensions:', _chalk2.default.green(options.extensions));
  }

  if (options.updateIndex || options.recursive) {
    sortedDirectoryPaths = _lodash2.default.map(sortedDirectoryPaths, dir => {
      return (0, _findIndexFiles2.default)(dir, {
        fileName: options.updateIndex ? 'index.js' : '*',
        silent: options.updateIndex || options.ignoreUnsafe
      });
    });
    sortedDirectoryPaths = _lodash2.default.flatten(sortedDirectoryPaths);
    sortedDirectoryPaths = _lodash2.default.uniq(sortedDirectoryPaths);
    sortedDirectoryPaths = (0, _sortByDepth2.default)(sortedDirectoryPaths);

    (0, _log2.default)('Updating index files in:', sortedDirectoryPaths.reverse().join(', '));
  }

  sortedDirectoryPaths = sortedDirectoryPaths.filter(directoryPath => {
    return (0, _validateTargetDirectory2.default)(directoryPath, { silent: options.ignoreUnsafe });
  });

  _lodash2.default.forEach(sortedDirectoryPaths, directoryPath => {
    let existingIndexCode;

    const config = (0, _readIndexConfig2.default)(directoryPath);

    const siblings = (0, _readDirectory2.default)(directoryPath, {
      config,
      extensions: options.extensions,
      ignoreDirectories: options.ignoreDirectories,
      silent: options.ignoreUnsafe
    });

    const indexCode = (0, _createIndexCode2.default)(siblings, {
      banner: options.banner,
      config
    });

    const indexFilePath = _path2.default.resolve(directoryPath, 'index.js');

    try {
      existingIndexCode = _fs2.default.readFileSync(indexFilePath, 'utf8');

      /* eslint-disable no-empty */
    } catch (error) {}

    /* eslint-enable no-empty */

    _fs2.default.writeFileSync(indexFilePath, indexCode);

    if (existingIndexCode && existingIndexCode === indexCode) {
      (0, _log2.default)(indexFilePath, _chalk2.default.yellow('[index has not changed]'));
    } else if (existingIndexCode && existingIndexCode !== indexCode) {
      (0, _log2.default)(indexFilePath, _chalk2.default.green('[updated index]'));
    } else {
      (0, _log2.default)(indexFilePath, _chalk2.default.green('[created index]'));
    }
  });

  (0, _log2.default)('Done');
};
//# sourceMappingURL=writeIndexCli.js.map