import _ from 'lodash';

const safeVariableName = (fileName) => {
  const indexOfDot = fileName.indexOf('.');

  if (indexOfDot === -1) {
    return fileName;
  } else {
    return fileName.slice(0, indexOfDot);
  }
};

// export (tough bit) from './file
const defaultFactory = (filename, block) => {
  return 'export ' + block + ' from \'./' + filename + '\';';
};

// tough bit = file
const implicitDefault = (fileName) => {
  return defaultFactory(fileName, safeVariableName(fileName));
};

// tough bit = { default as file }
const explicitDefault = (fileName) => {
  return defaultFactory(fileName, '{ default as ' + safeVariableName(fileName) + ' }');
};
const buildExportBlock = (files, options) => {
  const transform = options.implicitDefault ?
    implicitDefault :
    explicitDefault;

  return files.map(transform).join('\n');
};

export default (filePaths, options = {}) => {
  let code;
  let configCode;

  code = '';
  configCode = '';

  if (options.banner) {
    const banners = _.isArray(options.banner) ? options.banner : [options.banner];

    banners.forEach((banner) => {
      code += banner + '\n';
    });

    code += '\n';
  }

  if (options.config && _.size(options.config) > 0) {
    configCode += ' ' + JSON.stringify(options.config);
  }

  code += '// @create-index' + configCode + '\n\n';

  if (filePaths.length) {
    const sortedFilePaths = filePaths.sort();

    code += buildExportBlock(sortedFilePaths, options) + '\n\n';
  }

  return code;
};
