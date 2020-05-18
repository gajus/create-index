import path from 'path';
import _ from 'lodash';
import glob from 'glob';
import validateTargetDirectory from './validateTargetDirectory';

export default (directoryPath, options = {}) => {
  let fileName;
  let targetDirectories;

  fileName = options.fileName || 'index.js';
  fileName = './**/' + fileName;

  targetDirectories = glob.sync(path.join(directoryPath, fileName));

  targetDirectories = _.filter(targetDirectories, (targetDirectoryPath) => {
    return validateTargetDirectory(path.dirname(targetDirectoryPath), {
      outputFile: options.fileName,
      silent: options.silent,
    });
  });

  targetDirectories = _.map(targetDirectories, path.dirname);

  return targetDirectories;
};
