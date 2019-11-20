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

var _hasIndex = require('./hasIndex');

var _hasIndex2 = _interopRequireDefault(_hasIndex);

var _validateTargetDirectory = require('./validateTargetDirectory');

var _validateTargetDirectory2 = _interopRequireDefault(_validateTargetDirectory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const hasNoExtension = fileName => {
  const matches = fileName.match(/\./g);

  return !matches;
};

const hasMultipleExtensions = fileName => {
  const matches = fileName.match(/\./g);

  return matches && matches.length > 1;
};

const isSafeName = fileName => {
  return (/^[a-z_][a-z0-9._]*$/i.test(fileName)
  );
};

const stripExtension = fileName => {
  const pos = fileName.lastIndexOf('.');

  if (pos === -1) {
    return fileName;
  }

  return fileName.substr(0, pos);
};

const removeDuplicates = (files, preferredExtension) => {
  return _lodash2.default.filter(files, fileName => {
    const withoutExtension = stripExtension(fileName);
    const mainAlternative = withoutExtension + '.' + preferredExtension;

    if (mainAlternative === fileName) {
      return true;
    }

    return !_lodash2.default.includes(files, mainAlternative);
  });
};

const removeIgnoredFiles = function (files) {
  let ignorePatterns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (ignorePatterns.length === 0) {
    return files;
  }

  const patterns = ignorePatterns.map(pattern => {
    if (_lodash2.default.startsWith(pattern, '/') && _lodash2.default.endsWith(pattern, '/')) {
      const patternWithoutSlashes = pattern.slice(1, -1);

      return new RegExp(patternWithoutSlashes);
    }

    return new RegExp(pattern);
  });

  return _lodash2.default.filter(files, fileName => {
    let pattern;

    for (pattern of patterns) {
      if (fileName.match(pattern) !== null) {
        return false;
      }
    }

    return true;
  });
};

exports.default = function (directoryPath) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!(0, _validateTargetDirectory2.default)(directoryPath, { silent: options.silent })) {
    return false;
  }

  var _options$extensions = options.extensions;
  const extensions = _options$extensions === undefined ? ['js'] : _options$extensions;
  var _options$config = options.config;
  const config = _options$config === undefined ? {} : _options$config;
  var _options$ignoreDirect = options.ignoreDirectories;
  const ignoreDirectories = _options$ignoreDirect === undefined ? false : _options$ignoreDirect;


  let children;

  children = _fs2.default.readdirSync(directoryPath);

  children = _lodash2.default.filter(children, fileName => {
    const absolutePath = _path2.default.resolve(directoryPath, fileName);
    const isDirectory = _fs2.default.statSync(absolutePath).isDirectory();

    if (!isSafeName(fileName)) {
      return false;
    }

    if (hasNoExtension(fileName) && !isDirectory) {
      return false;
    }

    if (hasMultipleExtensions(fileName)) {
      return false;
    }

    if (_lodash2.default.startsWith(fileName, 'index.js')) {
      return false;
    }

    if (!isDirectory && !extensions.some(ext => {
      return _lodash2.default.endsWith(fileName, '.' + ext);
    })) {
      return false;
    }

    if (isDirectory && (!(0, _hasIndex2.default)(absolutePath) || ignoreDirectories)) {
      return false;
    }

    return true;
  });

  children = removeDuplicates(children, extensions[0]);
  children = removeIgnoredFiles(children, config.ignore);

  return children.sort();
};
//# sourceMappingURL=readDirectory.js.map