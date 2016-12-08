import _ from 'lodash';

const safeVariableName = (fileName) => {
  const indexOfDot = fileName.indexOf('.');

  if (indexOfDot === -1) {
    return fileName;
  } else {
    return fileName.slice(0, indexOfDot);
  }
};

const buildExportBlock = (files) => {
  let importBlock;

  importBlock = _.map(files, (fileName) => {
    return 'export ' + _.camelCase(safeVariableName(fileName)) + ' from \'./' + fileName + '\';';
  });

  importBlock = importBlock.join('\n');

  return importBlock;
};

export default (filePaths, options = {}) => {
  let code;

  code = '';

  if (options.banner) {
    const banners = _.isArray(options.banner) ? options.banner : [options.banner];

    banners.forEach((banner) => {
      code += banner + '\n';
    });

    code += '\n';
  }

  code += '// @create-index\n\n';

  if (filePaths.length) {
    const sortedFilePaths = filePaths.sort();

    code += buildExportBlock(sortedFilePaths) + '\n\n';
  }

  return code;
};
