import path from 'path';
import _ from 'lodash';
import glob from 'glob';
import validateTargetDirectory from './validateTargetDirectory';

export default (directoryPath) => {
  let targetDirectories;

  targetDirectories = glob.sync(path.join(directoryPath, './**/index.js'));

  targetDirectories = _.filter(targetDirectories, (targetDirectoryPath) => {
    try {
      validateTargetDirectory(path.dirname(targetDirectoryPath));

      return true;

      // eslint-disable-next-line no-empty
    } catch (error) {

    }

    return false;
  });

  targetDirectories = _.map(targetDirectories, path.dirname);

  return targetDirectories;
};
