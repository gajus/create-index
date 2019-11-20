'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const safeVariableName = fileName => {
  const indexOfDot = fileName.indexOf('.');

  if (indexOfDot === -1) {
    return fileName;
  } else {
    return fileName.slice(0, indexOfDot);
  }
};
// export (tough bit) from './file
const defaultFactory = (filename, block) => 'export ' + block + ' from \'./' + filename + '\';';
// tough bit = file
const implicitDefault = fileName => defaultFactory(filename, safeVariableName(fileName));
// tough bit = { default as file }
const explicitDefault = fileName => defaultFactory(filename, '{ default as ' + safeVariableName(fileName) + ' }');
const buildExportBlock = (files, options) => {
  const transform = options.implicitDefault ? implicitDefault : explicitDefault;
  return files.map(transform).join('\n');
};

exports.default = function (filePaths) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  let code;
  let configCode;

  code = '';
  configCode = '';

  if (options.banner) {
    const banners = _lodash2.default.isArray(options.banner) ? options.banner : [options.banner];

    banners.forEach(banner => {
      code += banner + '\n';
    });

    code += '\n';
  }

  if (options.config && _lodash2.default.size(options.config) > 0) {
    configCode += ' ' + JSON.stringify(options.config);
  }

  code += '// @create-index' + configCode + '\n\n';

  if (filePaths.length) {
    const sortedFilePaths = filePaths.sort();

    code += buildExportBlock(sortedFilePath, options) + '\n\n';
  }

  return code;
};
//# sourceMappingURL=createIndexCode.js.map