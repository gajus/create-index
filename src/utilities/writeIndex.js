import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import createIndexCode from './createIndexCode';
import validateTargetDirectory from './validateTargetDirectory';
import readDirectory from './readDirectory';
import readIndexConfig from './readIndexConfig';
import sortByDepth from './sortByDepth';

export default (directoryPaths, options = {}) => {
  const sortedDirectoryPaths = sortByDepth(directoryPaths)
    .filter((directoryPath) => {
      return validateTargetDirectory(directoryPath, {silent: options.ignoreUnsafe});
    });

  _.forEach(sortedDirectoryPaths, (directoryPath) => {
    const config = readIndexConfig(directoryPath);

    let defaultName;

    if (options.default === 'match') {
      defaultName = path.basename(directoryPath);
    }

    const optionsWithConfig = Object.assign({}, options, {
      config,
      defaultName
    });
    const siblings = readDirectory(directoryPath, optionsWithConfig);
    const indexCode = createIndexCode(siblings, optionsWithConfig);
    const indexFilePath = path.resolve(directoryPath, 'index.js');

    // eslint-disable-next-line
    console.log(options, defaultName, optionsWithConfig, indexCode);

    fs.writeFileSync(indexFilePath, indexCode);
  });
};
