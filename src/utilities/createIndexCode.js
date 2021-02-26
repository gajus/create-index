import _ from 'lodash';

const safeVariableName = (fileName) => {
  const indexOfDot = fileName.indexOf('.');

  if (indexOfDot === -1) {
    return fileName;
  } else {
    return fileName.slice(0, indexOfDot);
  }
};

const buildExportBlock = (files, moduleType) => {
  let importBlock;
  
  if(moduleType === 'CJS'){
    importBlock = _.map(files, (fileName) => {
      return 'const ' + safeVariableName(fileName) + ' = require(\'./' + fileName + '\');';
    });

    importBlock.push('');
    importBlock.push('module.exports = {');
    importBlock.push(..._.map(files, (fileName) => {
      return '  ' + safeVariableName(fileName) + ',';
    }));
    importBlock.push('}');
  }else{
    importBlock = _.map(files, (fileName) => {
      return 'export { default as ' + safeVariableName(fileName) + ' } from \'./' + fileName + '\';';
    });
  }

  importBlock = importBlock.join('\n');

  return importBlock;
};

export default (filePaths, options = {}) => {
  let code;
  let configCode;
  let moduleType;

  code = '';
  configCode = '';
  moduleType = options.moduleType;

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

    code += buildExportBlock(sortedFilePaths, moduleType) + '\n\n';
  }

  return code;
};
