import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import createIndexCode from './createIndexCode';
import validateTargetDirectory from './validateTargetDirectory';
import readDirectory from './readDirectory';
import sortByDepth from './sortByDepth';

export default (directoryPaths, options = {}) => {
  const sortedDirectoryPaths = sortByDepth(directoryPaths)
    .filter((directoryPath) => {
      return validateTargetDirectory(directoryPath, {silent: options.ignoreUnsafe});
    });

  _.forEach(sortedDirectoryPaths, (directoryPath) => {
    const siblings = readDirectory(directoryPath);
    const indexCode = createIndexCode(siblings);
    const indexFilePath = path.resolve(directoryPath, 'index.js');

    fs.writeFileSync(indexFilePath, indexCode);
  });
};
