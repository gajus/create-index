import _ from 'lodash';
import parseFiles from './parseFiles';

const safeVariableName = (fileName) => {
  const indexOfDot = fileName.indexOf('.');

  if (indexOfDot === -1) {
    return fileName;
  } else {
    return fileName.slice(0, indexOfDot);
  }
};

const buildExportBlock = (files, directory) => {
  let importBlock;

  const fileDetails = parseFiles(files, directory);

  importBlock = _.map(fileDetails, (file) => {
    const moduleName = _.camelCase(safeVariableName(file.fileName));

    let statement;

    if (file.containsDefaultExport) {
      statement = 'import _' + moduleName + ' from \'./' + file.fileName + '\';\n';
    } else {
      statement = 'import * as _' + moduleName + ' from \'./' + file.fileName + '\';\n';
    }
    statement += 'export const ' + moduleName + ' = _' + moduleName + ';\n';

    return statement;
  });

  importBlock.push('export default {');
  importBlock.push.apply(importBlock, _.map(files, (fileName, idx) => {
    const moduleName = _.camelCase(safeVariableName(fileName));

    return '  ' + moduleName + (idx + 1 < files.length ? ',' : '');
  }), '');
  importBlock.push('};');

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

    code += buildExportBlock(sortedFilePaths, options.directoryPath) + '\n\n';
  }

  return code;
};
