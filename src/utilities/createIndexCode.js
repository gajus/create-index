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
const implicitDefaultExport = (fileName) => {
  return defaultFactory(fileName, safeVariableName(fileName));
};

// tough bit = { default as file }
const explicitDefaultExport = (fileName) => {
  return defaultFactory(fileName, '{ default as ' + safeVariableName(fileName) + ' }');
};

// tough bit = * as file
const wildcardExport = (folderName) => {
  return defaultFactory(folderName, '* as ' + folderName);
};

const buildExportBlock = (files, options) => {
  const transform = (file) => {
    const isFolder = file.split('.').length === 1;
    const defaultExport = options.implicitDefault ?
      implicitDefaultExport :
      explicitDefaultExport;

    if (isFolder && options.wildcardFolders) {
      return wildcardExport(file);
    }

    return defaultExport(file);
  };

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
